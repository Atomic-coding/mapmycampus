import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Menu, Search, Bell, QrCode, User } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import DashboardSidebar from './DashboardSidebar';
import DashboardContent from './DashboardContent';
import InformationPanel from './InformationPanel';
import QRCodeScannerModal from './QRCodeScannerModal';
import QRCodeViewerModal from './QRCodeViewerModal';
import { supabase } from '../utils/supabase/client';
import { rooms } from '../data/mockData';
import { Room } from '../types';

interface DashboardLayoutProps {
  user: any;
}

type ViewType = 'floor-plan' | 'qr-navigation' | 'generate-qr' | 'campus-map';

export default function DashboardLayout({ user }: DashboardLayoutProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [currentView, setCurrentView] = useState<ViewType>('floor-plan');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showQRViewer, setShowQRViewer] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle QR navigation from URL params
  useEffect(() => {
    const roomParam = searchParams.get('room');
    const floorParam = searchParams.get('floor');
    
    if (roomParam) {
      const room = rooms.find(r => r.id === roomParam);
      if (room) {
        setSelectedRoom(room);
        if (floorParam) {
          setSelectedFloor(parseInt(floorParam));
        } else {
          setSelectedFloor(room.floor);
        }
        setCurrentView('floor-plan');
      }
    }
  }, [searchParams]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const floorRooms = rooms.filter(r => r.floor === selectedFloor);
  const availableCount = floorRooms.filter(r => r.status === 'available').length;
  const occupiedCount = floorRooms.filter(r => r.status === 'occupied').length;

  const userInitials = (user.user_metadata?.full_name || user.email || 'U')
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="h-screen flex bg-gradient-to-br from-background to-muted/30">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar
          selectedFloor={selectedFloor}
          onFloorChange={setSelectedFloor}
          availableCount={availableCount}
          occupiedCount={occupiedCount}
          userName={user.user_metadata?.full_name || user.email || 'User'}
          userEmail={user.email || ''}
          userRole={user.user_metadata?.role || 'student'}
          onNavigate={(path) => navigate(path)}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <DashboardSidebar
            selectedFloor={selectedFloor}
            onFloorChange={(floor) => {
              setSelectedFloor(floor);
              setSidebarOpen(false);
            }}
            availableCount={availableCount}
            occupiedCount={occupiedCount}
            userName={user.user_metadata?.full_name || user.email || 'User'}
            userEmail={user.email || ''}
            userRole={user.user_metadata?.role || 'student'}
            onNavigate={(path) => {
              navigate(path);
              setSidebarOpen(false);
            }}
          />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-card/60 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 lg:px-6 shadow-elevated z-10">
          {/* Left: Mobile Menu + Logo */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl campus-gradient flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-primary leading-none">MapMyCampus</h1>
                <p className="text-xs text-muted-foreground">PCCOER Navigation</p>
              </div>
            </div>
          </div>

          {/* Center: Search */}
          <div className="hidden md:block flex-1 max-w-lg mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search rooms, departments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-background/50"
              />
            </div>
          </div>

          {/* Right: Actions + User */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowQRViewer(true)}
              className="hidden sm:flex"
            >
              <QrCode className="w-4 h-4 mr-2" />
              View QR Codes
            </Button>

            <div className="relative">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">2</span>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfile}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/')}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content + Info Panel */}
        <div className="flex-1 flex overflow-hidden">
          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            <DashboardContent
              currentView={currentView}
              onViewChange={setCurrentView}
              selectedFloor={selectedFloor}
              selectedRoom={selectedRoom}
              onRoomSelect={setSelectedRoom}
              searchQuery={searchQuery}
              onOpenQRScanner={() => setShowQRScanner(true)}
            />
          </div>

          {/* Information Panel */}
          <div className="hidden xl:block">
            <InformationPanel selectedRoom={selectedRoom} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <QRCodeScannerModal
        open={showQRScanner}
        onOpenChange={setShowQRScanner}
        onScanComplete={(roomId) => {
          const room = rooms.find(r => r.id === roomId);
          if (room) {
            setSelectedRoom(room);
            setSelectedFloor(room.floor);
            setCurrentView('floor-plan');
          }
          setShowQRScanner(false);
        }}
      />

      <QRCodeViewerModal
        open={showQRViewer}
        onOpenChange={setShowQRViewer}
        rooms={rooms}
      />
    </div>
  );
}
