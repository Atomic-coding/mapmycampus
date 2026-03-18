import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Camera, Upload, CheckCircle, QrCode } from 'lucide-react';
import { rooms } from '../data/mockData';

interface QRCodeScannerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScanComplete: (roomId: string) => void;
}

type ScanState = 'idle' | 'scanning' | 'success';

export default function QRCodeScannerModal({ open, onOpenChange, onScanComplete }: QRCodeScannerModalProps) {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [scannedRoomId, setScannedRoomId] = useState('');

  const simulateScan = () => {
    setScanState('scanning');
    
    // Simulate scanning delay
    setTimeout(() => {
      // Pick a random room
      const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
      setScannedRoomId(randomRoom.id);
      setScanState('success');
      
      // Auto-complete after showing success
      setTimeout(() => {
        onScanComplete(randomRoom.id);
        resetState();
      }, 1500);
    }, 1500);
  };

  const resetState = () => {
    setScanState('idle');
    setScannedRoomId('');
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetState();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">QR Code Scanner</DialogTitle>
          <DialogDescription>
            Scan a QR code to navigate to a room
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {scanState === 'idle' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={simulateScan}
                  className="h-24 flex-col gap-2 campus-gradient text-white hover:opacity-90"
                >
                  <Camera className="w-6 h-6" />
                  <span className="text-sm font-medium">Scan with Camera</span>
                </Button>
                <Button
                  onClick={simulateScan}
                  variant="outline"
                  className="h-24 flex-col gap-2 hover:bg-primary/10"
                >
                  <Upload className="w-6 h-6" />
                  <span className="text-sm font-medium">Upload Image</span>
                </Button>
              </div>

              <Alert className="bg-primary/5 border-primary/20">
                <QrCode className="h-4 w-4 text-primary" />
                <AlertDescription className="text-sm">
                  This is a demo. In production, this would use your device's camera to scan QR codes.
                </AlertDescription>
              </Alert>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold mb-2">How it works:</h4>
                <ol className="text-sm text-muted-foreground space-y-1">
                  <li>1. Point your camera at a room's QR code</li>
                  <li>2. Wait for automatic detection</li>
                  <li>3. Get instant directions to the room</li>
                </ol>
              </div>
            </>
          )}

          {scanState === 'scanning' && (
            <div className="py-12 text-center space-y-4">
              <div className="relative mx-auto w-32 h-32">
                <div className="absolute inset-0 border-4 border-primary/20 rounded-2xl"></div>
                <div className="absolute inset-0 border-4 border-primary rounded-2xl animate-pulse"></div>
                <div className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-2xl animate-spin"></div>
              </div>
              <div>
                <p className="text-lg font-semibold">Scanning...</p>
                <p className="text-sm text-muted-foreground">Point your camera at the QR code</p>
              </div>
            </div>
          )}

          {scanState === 'success' && (
            <div className="py-12 text-center space-y-4 fade-in">
              <div className="mx-auto w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <div>
                <p className="text-lg font-semibold text-success">QR Code Detected!</p>
                <p className="text-sm text-muted-foreground">Room ID: {scannedRoomId}</p>
                <p className="text-xs text-muted-foreground mt-2">Redirecting...</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
