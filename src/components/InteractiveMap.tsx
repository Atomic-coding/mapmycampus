import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ZoomIn, ZoomOut, RotateCcw, Navigation } from 'lucide-react';
import { rooms } from '../data/mockData';
import { Room } from '../types';

interface InteractiveMapProps {
  selectedFloor: number;
  selectedRoom: Room | null;
  onRoomSelect: (room: Room | null) => void;
  searchQuery: string;
}

export default function InteractiveMap({
  selectedFloor,
  selectedRoom,
  onRoomSelect,
  searchQuery
}: InteractiveMapProps) {
  const [zoom, setZoom] = useState(100);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  const floorRooms = rooms.filter(r => r.floor === selectedFloor);
  const availableCount = floorRooms.filter(r => r.status === 'available').length;
  const occupiedCount = floorRooms.filter(r => r.status === 'occupied').length;
  const maintenanceCount = floorRooms.filter(r => r.status === 'maintenance').length;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50));
  const handleReset = () => setZoom(100);

  const getRoomFill = (room: Room) => {
    if (selectedRoom?.id === room.id) return 'hsl(var(--primary))';
    if (hoveredRoom === room.id) return 'hsl(var(--secondary))';
    
    switch (room.status) {
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

  const getRoomStroke = (room: Room) => {
    if (selectedRoom?.id === room.id) return 'hsl(var(--primary))';
    return getRoomFill(room);
  };

  const getStrokeWidth = (room: Room) => {
    return selectedRoom?.id === room.id ? 3 : 1;
  };

  return (
    <Card className="shadow-elevated bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Navigation className="w-6 h-6 text-primary" />
            Floor {selectedFloor} - Interactive Map
          </CardTitle>
          
          {/* Zoom Controls */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomIn}
              className="h-9 w-9 p-0"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomOut}
              className="h-9 w-9 p-0"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleReset}
              className="h-9 w-9 p-0"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Status Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-muted-foreground">Available ({availableCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <span className="text-muted-foreground">Occupied ({occupiedCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span className="text-muted-foreground">Maintenance ({maintenanceCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">Selected</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="relative h-96 bg-background rounded-lg border-2 border-border overflow-hidden">
          {/* SVG Map */}
          <div 
            className="w-full h-full overflow-auto"
            style={{ cursor: 'grab' }}
          >
            <svg
              viewBox="0 0 700 400"
              className="w-full h-full"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'center center',
                transition: 'transform 0.2s ease'
              }}
            >
              {/* Background */}
              <rect
                width="700"
                height="400"
                fill="hsl(var(--card))"
                stroke="hsl(var(--border))"
                strokeWidth="2"
              />

              {/* Corridors */}
              <rect x="0" y="60" width="700" height="40" fill="hsl(var(--muted))" opacity="0.5" />
              <rect x="0" y="250" width="700" height="40" fill="hsl(var(--muted))" opacity="0.5" />
              <rect x="0" y="300" width="700" height="40" fill="hsl(var(--muted))" opacity="0.5" />

              {/* Main Entrance */}
              <rect
                x="320"
                y="0"
                width="60"
                height="20"
                fill="hsl(var(--primary))"
                rx="4"
              />
              <text
                x="350"
                y="15"
                fontSize="10"
                fill="white"
                textAnchor="middle"
                fontWeight="600"
              >
                ENTRANCE
              </text>

              {/* Rooms */}
              {floorRooms.map((room) => (
                <g
                  key={room.id}
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredRoom(room.id)}
                  onMouseLeave={() => setHoveredRoom(null)}
                  onClick={() => onRoomSelect(room)}
                >
                  <rect
                    x={room.x}
                    y={room.y}
                    width={room.width}
                    height={room.height}
                    fill={getRoomFill(room)}
                    stroke={getRoomStroke(room)}
                    strokeWidth={getStrokeWidth(room)}
                    opacity={room.status === 'maintenance' ? 0.7 : 0.9}
                    rx="4"
                    className={selectedRoom?.id === room.id || hoveredRoom === room.id ? 'animate-pulse' : ''}
                  />
                  
                  {/* Room Label */}
                  <text
                    x={room.x + room.width / 2}
                    y={room.y + room.height / 2 - 8}
                    fontSize="14"
                    fontWeight="700"
                    fill="white"
                    textAnchor="middle"
                    className="pointer-events-none"
                  >
                    {room.id}
                  </text>
                  <text
                    x={room.x + room.width / 2}
                    y={room.y + room.height / 2 + 8}
                    fontSize="10"
                    fill="white"
                    textAnchor="middle"
                    className="pointer-events-none capitalize"
                    opacity="0.9"
                  >
                    {room.type}
                  </text>
                </g>
              ))}

              {/* Navigation Line to Selected Room */}
              {selectedRoom && (
                <line
                  x1="350"
                  y1="20"
                  x2={selectedRoom.x + selectedRoom.width / 2}
                  y2={selectedRoom.y + selectedRoom.height / 2}
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  strokeDasharray="8,4"
                  opacity="0.7"
                  className="animate-pulse"
                />
              )}
            </svg>
          </div>

          {/* Overlay Badges */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-card/90 backdrop-blur-sm text-foreground border">
              {zoom}%
            </Badge>
          </div>
          
          <div className="absolute top-4 right-4">
            <Badge className="bg-card/90 backdrop-blur-sm text-foreground border">
              {floorRooms.length} rooms
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
