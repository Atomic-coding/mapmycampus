import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Download, Navigation, FlaskConical, GraduationCap, Briefcase, Building2 } from 'lucide-react';
import QRCode from 'qrcode';
import { Room } from '../types';

interface QRCodeViewerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rooms: Room[];
}

export default function QRCodeViewerModal({ open, onOpenChange, rooms }: QRCodeViewerModalProps) {
  const navigate = useNavigate();
  const [qrCodes, setQrCodes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      generateQRCodes();
    }
  }, [open, rooms]);

  const generateQRCodes = async () => {
    const codes: Record<string, string> = {};
    
    for (const room of rooms) {
      try {
        const url = `${window.location.origin}/qr-navigate?navigate=${room.id}&room=${encodeURIComponent(room.name)}`;
        const qrDataUrl = await QRCode.toDataURL(url, {
          width: 200,
          margin: 2,
          color: {
            dark: '#0066CC',
            light: '#FFFFFF'
          }
        });
        codes[room.id] = qrDataUrl;
      } catch (error) {
        console.error(`Failed to generate QR code for ${room.id}:`, error);
      }
    }
    
    setQrCodes(codes);
  };

  const downloadQR = (roomId: string, roomName: string) => {
    const qrDataUrl = qrCodes[roomId];
    if (!qrDataUrl) return;

    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `QR_${roomId}_${roomName.replace(/\s+/g, '_')}.png`;
    link.click();
  };

  const downloadAllForFloor = (floor: number) => {
    const floorRooms = rooms.filter(r => r.floor === floor);
    floorRooms.forEach(room => {
      setTimeout(() => downloadQR(room.id, room.name), 100);
    });
  };

  const handleNavigate = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      navigate(`/?room=${roomId}&floor=${room.floor}`);
      onOpenChange(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lab':
        return <FlaskConical className="w-4 h-4" />;
      case 'classroom':
        return <GraduationCap className="w-4 h-4" />;
      case 'office':
        return <Briefcase className="w-4 h-4" />;
      case 'admin':
        return <Building2 className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lab':
        return 'text-primary bg-primary/10';
      case 'classroom':
        return 'text-secondary bg-secondary/10';
      case 'office':
        return 'text-success bg-success/10';
      case 'admin':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const renderFloorContent = (floor: number) => {
    const floorRooms = rooms.filter(r => r.floor === floor);
    const groupedRooms = floorRooms.reduce((acc, room) => {
      if (!acc[room.type]) acc[room.type] = [];
      acc[room.type].push(room);
      return acc;
    }, {} as Record<string, Room[]>);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {floorRooms.length} rooms on this floor
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => downloadAllForFloor(floor)}
            className="hover:bg-primary/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </div>

        {Object.entries(groupedRooms).map(([type, typeRooms]) => (
          <div key={type} className="space-y-3">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${getTypeColor(type)}`}>
              {getTypeIcon(type)}
              <h3 className="text-sm font-semibold capitalize">{type}s</h3>
              <Badge variant="outline" className="ml-auto text-xs">
                {typeRooms.length}
              </Badge>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
              {typeRooms.map(room => (
                <Card key={room.id} className="p-4 hover:shadow-elevated transition-shadow">
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm truncate">{room.name}</h4>
                        <Badge variant="outline" className="text-xs">{room.id}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{room.department}</p>
                    </div>

                    <div className="bg-white p-2 rounded-lg border-2 border-primary/20">
                      {qrCodes[room.id] ? (
                        <img
                          src={qrCodes[room.id]}
                          alt={`QR Code for ${room.name}`}
                          className="w-full h-auto"
                        />
                      ) : (
                        <div className="aspect-square bg-muted animate-pulse rounded"></div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadQR(room.id, room.name)}
                        className="text-xs"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleNavigate(room.id)}
                        className="text-xs bg-primary hover:bg-primary-dark"
                      >
                        <Navigation className="w-3 h-3 mr-1" />
                        Navigate
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">QR Code Viewer</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            View and download QR codes for rooms on different floors.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="floor-1" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="floor-1">Floor 1</TabsTrigger>
            <TabsTrigger value="floor-2">Floor 2</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(90vh-180px)] mt-4">
            <TabsContent value="floor-1" className="mt-0">
              {renderFloorContent(1)}
            </TabsContent>

            <TabsContent value="floor-2" className="mt-0">
              {renderFloorContent(2)}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}