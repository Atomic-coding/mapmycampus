import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Menu, Search, Bell } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { InteractiveMap } from './InteractiveMap';
import { InformationPanel } from './InformationPanel';
import { QRCodeFeature } from './QRCodeFeature';

interface Room {
  id: string;
  name: string;
  department: string;
  capacity: number;
  status: 'available' | 'occupied' | 'maintenance';
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'classroom' | 'lab' | 'office' | 'admin';
}

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleQRScanned = (roomId: string) => {
    // Mock implementation - in real app would find room by QR code
    console.log('QR scanned for room:', roomId);
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        selectedFloor={selectedFloor}
        onFloorChange={setSelectedFloor}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#004080] rounded-lg flex items-center justify-center">
                  <span className="text-white">🏛️</span>
                </div>
                <div>
                  <h1 className="text-[#004080]">MapMyCampus</h1>
                  <p className="text-xs text-gray-500">Navigation Dashboard</p>
                </div>
              </div>
            </div>

            {/* Center Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search rooms, departments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-full border-2 border-gray-200 focus:border-[#4A90E2]"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                <AvatarFallback className="bg-[#004080] text-white">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex gap-6 p-6">
          {/* Map Area */}
          <div className="flex-1 min-h-0">
            <InteractiveMap
              selectedRoom={selectedRoom}
              onRoomSelect={handleRoomSelect}
              floor={selectedFloor}
            />
          </div>

          {/* Information Panel */}
          <div className="w-80 min-h-0">
            <InformationPanel selectedRoom={selectedRoom} />
          </div>
        </div>
      </div>

      {/* QR Code Feature */}
      <QRCodeFeature onQRScanned={handleQRScanned} />
    </div>
  );
}