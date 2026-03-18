import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Navigation, MapPin } from 'lucide-react';
import { rooms } from '../data/mockData';

export default function QRNavigationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [room, setRoom] = useState<any>(null);

  useEffect(() => {
    const navigate_param = searchParams.get('navigate');
    const room_param = searchParams.get('room');
    
    if (navigate_param) {
      setRoomId(navigate_param);
      const foundRoom = rooms.find(r => r.id === navigate_param);
      setRoom(foundRoom);
    }
  }, [searchParams]);

  const handleStartNavigation = () => {
    if (roomId && room) {
      navigate(`/?room=${roomId}&floor=${room.floor}`);
    }
  };

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-lg shadow-elevated">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl font-bold">Invalid QR Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              The QR code you scanned is not valid or has expired.
            </p>
            <Button 
              onClick={() => navigate('/')} 
              className="w-full h-12 bg-primary hover:bg-primary-dark"
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-lg shadow-elevated fade-in">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full campus-gradient flex items-center justify-center mb-4">
            <Navigation className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">QR Navigation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Room Info Card */}
          <div className="bg-primary/5 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-muted-foreground">Room ID</span>
                  <Badge variant="outline" className="text-xs">{room.id}</Badge>
                </div>
                <h3 className="text-lg font-bold text-primary">{room.name}</h3>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Department:</span>
                <p className="font-medium">{room.department}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Floor:</span>
                <p className="font-medium">Floor {room.floor}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <Badge 
                  variant={room.status === 'available' ? 'default' : 'secondary'}
                  className={`capitalize ${
                    room.status === 'available' ? 'bg-success' : 
                    room.status === 'occupied' ? 'bg-destructive' : 
                    'bg-warning'
                  }`}
                >
                  {room.status}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Capacity:</span>
                <p className="font-medium">{room.capacity} people</p>
              </div>
            </div>
          </div>

          {/* Start Navigation Button */}
          <Button 
            onClick={handleStartNavigation} 
            className="w-full h-12 campus-gradient text-white hover:opacity-90"
          >
            <Navigation className="w-4 h-4 mr-2" />
            Start Navigation
          </Button>

          {/* Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-2">What's next?</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• View the room location on the interactive map</li>
              <li>• Get turn-by-turn directions</li>
              <li>• Check room availability and amenities</li>
            </ul>
          </div>

          <Button 
            variant="outline" 
            onClick={() => navigate('/')} 
            className="w-full"
          >
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
