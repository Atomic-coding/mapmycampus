import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { MapPin, Users, Calendar, Navigation, Phone, Mail, Wifi, Monitor, Snowflake, Clock } from 'lucide-react';
import { events } from '../data/mockData';
import { Room } from '../types';

interface InformationPanelProps {
  selectedRoom: Room | null;
}

export default function InformationPanel({ selectedRoom }: InformationPanelProps) {
  if (!selectedRoom) {
    return (
      <aside className="w-80 h-full bg-card/60 backdrop-blur-xl border-l border-border flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">Select a Room</h3>
            <p className="text-sm text-muted-foreground">
              Click on any room in the map to view its details and information.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      available: { className: 'bg-success text-white', text: 'Available' },
      occupied: { className: 'bg-destructive text-white', text: 'Occupied' },
      maintenance: { className: 'bg-warning text-white', text: 'Maintenance' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.text}</Badge>;
  };

  const roomEvents = events.filter(e => e.roomId === selectedRoom.id);

  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi')) return <Wifi className="w-4 h-4" />;
    if (amenityLower.includes('projector') || amenityLower.includes('monitor')) return <Monitor className="w-4 h-4" />;
    if (amenityLower.includes('ac') || amenityLower.includes('air')) return <Snowflake className="w-4 h-4" />;
    return <Users className="w-4 h-4" />;
  };

  return (
    <aside className="w-80 h-full bg-card/60 backdrop-blur-xl border-l border-border flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-primary mb-1">{selectedRoom.name}</h2>
        <p className="text-sm text-muted-foreground mb-3">{selectedRoom.department}</p>
        {getStatusBadge(selectedRoom.status)}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="info" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="grid grid-cols-3 mx-6 mt-4">
          <TabsTrigger value="info" className="text-xs">Info</TabsTrigger>
          <TabsTrigger value="events" className="text-xs">Events</TabsTrigger>
          <TabsTrigger value="directions" className="text-xs">Directions</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Info Tab */}
          <TabsContent value="info" className="mt-0 space-y-4">
            {/* Room Details */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Room Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Capacity</span>
                  <span className="font-medium flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {selectedRoom.capacity}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium capitalize">{selectedRoom.type}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Floor</span>
                  <span className="font-medium">Floor {selectedRoom.floor}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room ID</span>
                  <Badge variant="outline" className="font-mono text-xs">{selectedRoom.id}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {selectedRoom.description && (
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedRoom.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Amenities */}
            {selectedRoom.amenities && selectedRoom.amenities.length > 0 && (
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoom.amenities.map((amenity, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 bg-primary/10 text-primary"
                      >
                        {getAmenityIcon(amenity)}
                        <span className="text-xs">{amenity}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact */}
            {(selectedRoom.phone || selectedRoom.email) && (
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {selectedRoom.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{selectedRoom.phone}</span>
                    </div>
                  )}
                  {selectedRoom.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground text-xs">{selectedRoom.email}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="mt-0 space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {roomEvents.length > 0 ? (
                  roomEvents.map((event) => (
                    <div key={event.id} className="space-y-2 pb-3 border-b border-border last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm">{event.title}</h4>
                        <Badge variant="outline" className="text-xs flex-shrink-0">
                          <Clock className="w-3 h-3 mr-1" />
                          {event.startTime}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Instructor: {event.instructor}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {event.startTime} - {event.endTime}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No events scheduled</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Directions Tab */}
          <TabsContent value="directions" className="mt-0 space-y-4">
            <div className="space-y-3">
              {/* Navigation Steps */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Enter main building</p>
                    <p className="text-xs text-muted-foreground mt-1">Distance: 5m</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Take the corridor on your left</p>
                    <p className="text-xs text-muted-foreground mt-1">Distance: 15m</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Walk straight to the end</p>
                    <p className="text-xs text-muted-foreground mt-1">Distance: 25m</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Room {selectedRoom.id} will be on your right</p>
                    <p className="text-xs text-muted-foreground mt-1">Distance: 5m</p>
                  </div>
                </div>
              </div>

              {/* Estimated Time */}
              <Card className="bg-muted/50 border-none">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Estimated walking time</span>
                    <span className="font-bold text-primary">~2 minutes</span>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Button */}
              <Button className="w-full campus-gradient text-white hover:opacity-90 h-11">
                <Navigation className="w-4 h-4 mr-2" />
                Start Navigation
              </Button>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </aside>
  );
}
