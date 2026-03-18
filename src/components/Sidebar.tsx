import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ChevronLeft, Home, Building, User, Settings, QrCode } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedFloor: number;
  onFloorChange: (floor: number) => void;
}

export function Sidebar({ isOpen, onToggle, selectedFloor, onFloorChange }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      <div className={`fixed left-0 top-0 h-full bg-white shadow-xl z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-72`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#004080] rounded-lg flex items-center justify-center">
              <span className="text-white">🏛️</span>
            </div>
            <span className="text-[#004080]">MapMyCampus</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onToggle}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          <div className="space-y-2 px-4">
            <Button variant="ghost" className="w-full justify-start text-[#004080] hover:bg-blue-50">
              <Home className="w-5 h-5 mr-3" />
              Home
            </Button>
            
            {/* Floor Selector */}
            <div className="py-4">
              <p className="px-3 py-2 text-sm text-gray-500">Floor Selection</p>
              <div className="space-y-1">
                {[1, 2].map((floor) => (
                  <Button
                    key={floor}
                    variant={selectedFloor === floor ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      selectedFloor === floor 
                        ? 'bg-[#004080] text-white hover:bg-[#003366]' 
                        : 'text-[#004080] hover:bg-blue-50'
                    }`}
                    onClick={() => onFloorChange(floor)}
                  >
                    <Building className="w-5 h-5 mr-3" />
                    Floor {floor}
                  </Button>
                ))}
              </div>
            </div>

            <Button variant="ghost" className="w-full justify-start text-[#004080] hover:bg-blue-50">
              <QrCode className="w-5 h-5 mr-3" />
              QR Scanner
            </Button>
            
            <Button variant="ghost" className="w-full justify-start text-[#004080] hover:bg-blue-50">
              <User className="w-5 h-5 mr-3" />
              My Profile
            </Button>
            
            <Button variant="ghost" className="w-full justify-start text-[#004080] hover:bg-blue-50">
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Button>
          </div>
        </nav>

        {/* User Profile */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
              <AvatarFallback className="bg-[#004080] text-white">JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-[#004080]">John Doe</p>
              <p className="text-sm text-gray-500">Student</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}