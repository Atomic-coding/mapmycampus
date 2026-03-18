import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Search, Scan, MapPin, Navigation } from 'lucide-react';
import { rooms, qrWaypoints } from '../data/mockData';
import { Room } from '../types';

interface IndoorNavigationMapProps {
  selectedFloor: number;
  selectedRoom: Room | null;
  onRoomSelect: (room: Room | null) => void;
  searchQuery: string;
  onOpenScanner: () => void;
}

export default function IndoorNavigationMap({
  selectedFloor,
  selectedRoom,
  onRoomSelect,
  searchQuery,
  onOpenScanner
}: IndoorNavigationMapProps) {
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  const floorRooms = rooms.filter(r => r.floor === selectedFloor);
  const filteredRooms = searchQuery
    ? floorRooms.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.department.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : floorRooms;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'hsl(var(--success))';
      case 'occupied':
        return 'hsl(var(--destructive))';
      case 'maintenance':
        return 'hsl(var(--warning))';
      default:
        return 'hsl(var(--muted))';
    }
  };

  return (
    <Card className="shadow-elevated bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Navigation className="w-6 h-6 text-primary" />
            Indoor Navigation - Floor {selectedFloor}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenScanner}
            className="hover:bg-primary/10"
          >
            <Scan className="w-4 h-4 mr-2" />
            Scan QR
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            className="pl-10"
          />
        </div>

        {/* Current Location Indicator */}
        {currentLocation && (
          <div className="bg-primary/10 rounded-lg p-3 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">Current Location</p>
              <p className="text-xs text-muted-foreground">{currentLocation}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentLocation(null)}
            >
              Clear
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* SVG Map */}
        <div className="relative h-96 bg-background rounded-lg border-2 border-border overflow-hidden">
          <svg
            viewBox="0 0 800 600"
            className="w-full h-full"
            style={{ background: 'hsl(var(--card))' }}
          >
            {/* Grid Pattern */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                  strokeDasharray="2,2"
                />
              </pattern>
            </defs>
            <rect width="800" height="600" fill="url(#grid)" />

            {/* QR Waypoints */}
            {qrWaypoints.map(waypoint => (
              <g key={waypoint.id}>
                <circle
                  cx={waypoint.coordinates[0]}
                  cy={waypoint.coordinates[1]}
                  r="8"
                  fill="hsl(var(--warning))"
                  opacity="0.8"
                  className="cursor-pointer hover:opacity-100"
                  onClick={() => setCurrentLocation(waypoint.description)}
                />
                <text
                  x={waypoint.coordinates[0]}
                  y={waypoint.coordinates[1] - 15}
                  fontSize="10"
                  fill="hsl(var(--foreground))"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  QR
                </text>
              </g>
            ))}

            {/* Rooms */}
            {floorRooms.map(room => (
              <g
                key={room.id}
                className="cursor-pointer"
                onClick={() => onRoomSelect(room)}
              >
                <rect
                  x={room.x}
                  y={room.y}
                  width={room.width}
                  height={room.height}
                  fill={getStatusColor(room.status)}
                  opacity={selectedRoom?.id === room.id ? 0.9 : 0.3}
                  stroke={selectedRoom?.id === room.id ? 'hsl(var(--primary))' : getStatusColor(room.status)}
                  strokeWidth={selectedRoom?.id === room.id ? 3 : 1}
                  rx="4"
                  className="transition-all"
                />
                <text
                  x={room.x + room.width / 2}
                  y={room.y + room.height / 2 - 5}
                  fontSize="12"
                  fontWeight="600"
                  fill="hsl(var(--foreground))"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  {room.id}
                </text>
                <text
                  x={room.x + room.width / 2}
                  y={room.y + room.height / 2 + 8}
                  fontSize="9"
                  fill="hsl(var(--muted-foreground))"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  {room.type}
                </text>
              </g>
            ))}

            {/* Navigation Path */}
            {currentLocation && selectedRoom && (
              <line
                x1="100"
                y1="100"
                x2={selectedRoom.x + selectedRoom.width / 2}
                y2={selectedRoom.y + selectedRoom.height / 2}
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeDasharray="8,4"
                className="animate-pulse"
                markerEnd="url(#arrowhead)"
              />
            )}

            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="5"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="hsl(var(--primary))" />
              </marker>
            </defs>
          </svg>

          {/* Legend */}
          <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span className="text-xs font-medium">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <span className="text-xs font-medium">Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span className="text-xs font-medium">QR Point</span>
            </div>
          </div>
        </div>

        {/* Room List */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Available Rooms</h3>
          <ScrollArea className="h-48 rounded-lg border">
            <div className="p-4 space-y-2">
              {filteredRooms.map(room => (
                <div
                  key={room.id}
                  onClick={() => onRoomSelect(room)}
                  className={`p-3 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedRoom?.id === room.id
                      ? 'bg-primary/10 border-2 border-primary'
                      : 'bg-muted/50 border border-transparent hover:bg-muted'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm truncate">{room.name}</h4>
                        <Badge variant="outline" className="text-xs flex-shrink-0">{room.id}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{room.department}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <Badge
                        className={`text-xs ${
                          room.status === 'available'
                            ? 'bg-success'
                            : room.status === 'occupied'
                            ? 'bg-destructive'
                            : 'bg-warning'
                        }`}
                      >
                        {room.status}
                      </Badge>
                      {currentLocation && (
                        <span className="text-xs text-muted-foreground">~2 min</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
