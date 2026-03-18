import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { QrCode, X, Camera, Upload } from 'lucide-react';

interface QRCodeFeatureProps {
  onQRScanned?: (roomId: string) => void;
}

export function QRCodeFeature({ onQRScanned }: QRCodeFeatureProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleQRScan = () => {
    // Mock QR scan functionality
    const mockRoomId = 'R101';
    if (onQRScanned) {
      onQRScanned(mockRoomId);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating QR Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-[#4A90E2] hover:bg-[#357abd] shadow-lg hover:shadow-xl transition-all duration-200"
          size="sm"
        >
          <QrCode className="w-6 h-6 text-white" />
        </Button>
      </div>

      {/* QR Scanner Panel */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* QR Panel */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4">
            <Card className="shadow-2xl border-0">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-[#004080] flex items-center space-x-2">
                  <QrCode className="w-6 h-6" />
                  <span>QR Code Scanner</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-[#E3F2FD] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <QrCode className="w-12 h-12 text-[#4A90E2]" />
                  </div>
                  <h3 className="text-[#004080] mb-2">Scan Room QR Code</h3>
                  <p className="text-sm text-gray-600">
                    Scan the QR code outside a room to highlight it on the map and view details.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-[#4A90E2] hover:bg-[#357abd] text-white flex items-center justify-center space-x-2"
                    onClick={handleQRScan}
                  >
                    <Camera className="w-5 h-5" />
                    <span>Open Camera to Scan</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-[#4A90E2] text-[#4A90E2] hover:bg-[#E3F2FD] flex items-center justify-center space-x-2"
                  >
                    <Upload className="w-5 h-5" />
                    <span>Upload QR Code Image</span>
                  </Button>
                </div>
                
                <div className="bg-[#F8FAFC] rounded-lg p-4">
                  <h4 className="text-[#004080] mb-2">How it works:</h4>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. Find the QR code outside any room</li>
                    <li>2. Use your camera to scan the code</li>
                    <li>3. The room will be highlighted on the map</li>
                    <li>4. View room details and navigation</li>
                  </ol>
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  Future feature: Real QR scanning will be available in the next update
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
}