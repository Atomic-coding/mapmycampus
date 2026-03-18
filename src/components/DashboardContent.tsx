import { Button } from './ui/button';
import { Map, Navigation, QrCode as QrCodeIcon, Globe } from 'lucide-react';
import InteractiveMap from './InteractiveMap';
import IndoorNavigationMap from './IndoorNavigationMap';
import QRCodeGenerator from './QRCodeGenerator';
import CampusMap from './CampusMap';
import { Room } from '../types';

interface DashboardContentProps {
  currentView: 'floor-plan' | 'qr-navigation' | 'generate-qr' | 'campus-map';
  onViewChange: (view: 'floor-plan' | 'qr-navigation' | 'generate-qr' | 'campus-map') => void;
  selectedFloor: number;
  selectedRoom: Room | null;
  onRoomSelect: (room: Room | null) => void;
  searchQuery: string;
  onOpenQRScanner: () => void;
}

export default function DashboardContent({
  currentView,
  onViewChange,
  selectedFloor,
  selectedRoom,
  onRoomSelect,
  searchQuery,
  onOpenQRScanner
}: DashboardContentProps) {
  return (
    <div className="p-4 lg:p-6 space-y-4">
      {/* View Toggle Buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={currentView === 'floor-plan' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewChange('floor-plan')}
          className={currentView === 'floor-plan' ? 'bg-primary hover:bg-primary-dark' : ''}
        >
          <Map className="w-4 h-4 mr-2" />
          Floor Plan
        </Button>
        <Button
          variant={currentView === 'qr-navigation' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewChange('qr-navigation')}
          className={currentView === 'qr-navigation' ? 'bg-primary hover:bg-primary-dark' : ''}
        >
          <Navigation className="w-4 h-4 mr-2" />
          QR Navigation
        </Button>
        <Button
          variant={currentView === 'generate-qr' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewChange('generate-qr')}
          className={currentView === 'generate-qr' ? 'bg-primary hover:bg-primary-dark' : ''}
        >
          <QrCodeIcon className="w-4 h-4 mr-2" />
          Generate QR
        </Button>
        <Button
          variant={currentView === 'campus-map' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewChange('campus-map')}
          className={currentView === 'campus-map' ? 'bg-primary hover:bg-primary-dark' : ''}
        >
          <Globe className="w-4 h-4 mr-2" />
          Campus Map
        </Button>
      </div>

      {/* Content Area */}
      <div className="fade-in">
        {currentView === 'floor-plan' && (
          <InteractiveMap
            selectedFloor={selectedFloor}
            selectedRoom={selectedRoom}
            onRoomSelect={onRoomSelect}
            searchQuery={searchQuery}
          />
        )}
        
        {currentView === 'qr-navigation' && (
          <IndoorNavigationMap
            selectedFloor={selectedFloor}
            selectedRoom={selectedRoom}
            onRoomSelect={onRoomSelect}
            searchQuery={searchQuery}
            onOpenScanner={onOpenQRScanner}
          />
        )}
        
        {currentView === 'generate-qr' && (
          <QRCodeGenerator selectedRoom={selectedRoom} />
        )}
        
        {currentView === 'campus-map' && (
          <CampusMap />
        )}
      </div>
    </div>
  );
}