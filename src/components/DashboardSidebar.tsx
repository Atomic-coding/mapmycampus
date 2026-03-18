import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Building2, Home, QrCode, User, Settings } from 'lucide-react';

interface DashboardSidebarProps {
  selectedFloor: number;
  onFloorChange: (floor: number) => void;
  availableCount: number;
  occupiedCount: number;
  userName: string;
  userEmail: string;
  userRole: string;
  onNavigate: (path: string) => void;
}

export default function DashboardSidebar({
  selectedFloor,
  onFloorChange,
  availableCount,
  occupiedCount,
  userName,
  userEmail,
  userRole,
  onNavigate
}: DashboardSidebarProps) {
  const userInitials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <aside className="w-64 h-full bg-card/80 backdrop-blur-xl border-r border-border flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl campus-gradient flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary leading-none">MapMyCampus</h1>
            <p className="text-xs text-muted-foreground mt-0.5">PCCOER Navigation</p>
          </div>
        </div>
      </div>

      {/* Floor Selection */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Select Floor</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={selectedFloor === 1 ? 'default' : 'outline'}
            className={selectedFloor === 1 ? 'campus-gradient text-primary-foreground shadow-sm' : 'border-primary/20 hover:bg-primary/10'}
            onClick={() => onFloorChange(1)}
          >
            Floor 1
          </Button>
          <Button
            variant={selectedFloor === 2 ? 'default' : 'outline'}
            className={selectedFloor === 2 ? 'campus-gradient text-primary-foreground shadow-sm' : 'border-primary/20 hover:bg-primary/10'}
            onClick={() => onFloorChange(2)}
          >
            Floor 2
          </Button>
        </div>
      </div>

      <Separator />

      {/* Navigation Menu */}
      <nav className="p-4 flex-1 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start bg-primary/10 text-primary hover:bg-primary/15"
          onClick={() => onNavigate('/')}
        >
          <Home className="w-4 h-4 mr-3" />
          Dashboard
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-primary/5 relative"
        >
          <QrCode className="w-4 h-4 mr-3" />
          QR Scanner
          <Badge variant="secondary" className="ml-auto text-xs bg-secondary">New</Badge>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-primary/5"
          onClick={() => onNavigate('/profile')}
        >
          <User className="w-4 h-4 mr-3" />
          Profile
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-primary/5"
        >
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </Button>
      </nav>

      <Separator />

      {/* User Profile */}
      <div className="p-4">
        <div className="rounded-lg bg-muted/50 hover:bg-muted p-3 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{userName}</p>
              <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
            </div>
          </div>
          <div className="mt-2">
            <Badge variant="outline" className="text-xs capitalize">
              {userRole}
            </Badge>
          </div>
        </div>
      </div>

      <Separator />

      {/* Quick Stats */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-success/10 rounded-lg p-2">
            <div className="text-2xl font-bold text-success">{availableCount}</div>
            <div className="text-xs text-muted-foreground">Available</div>
          </div>
          <div className="bg-destructive/10 rounded-lg p-2">
            <div className="text-2xl font-bold text-destructive">{occupiedCount}</div>
            <div className="text-xs text-muted-foreground">Occupied</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
