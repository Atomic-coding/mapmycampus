import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { QrCode, Download, Copy, Navigation, Check } from 'lucide-react';
import QRCode from 'qrcode';
import { toast } from 'sonner@2.0.3';
import { Room } from '../types';

interface QRCodeGeneratorProps {
  selectedRoom: Room | null;
}

export default function QRCodeGenerator({ selectedRoom }: QRCodeGeneratorProps) {
  const navigate = useNavigate();
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [navigationUrl, setNavigationUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedRoom) {
      generateQRCode();
    }
  }, [selectedRoom]);

  const generateQRCode = async () => {
    if (!selectedRoom) return;

    const url = `${window.location.origin}/qr-navigate?navigate=${selectedRoom.id}&room=${encodeURIComponent(selectedRoom.name)}`;
    setNavigationUrl(url);

    try {
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 256,
        margin: 2,
        color: {
          dark: '#0066CC',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrDataUrl);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      toast.error('Failed to generate QR code');
    }
  };

  const handleDownload = () => {
    if (!qrCodeUrl || !selectedRoom) return;

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `QR_${selectedRoom.id}_${selectedRoom.name.replace(/\s+/g, '_')}.png`;
    link.click();
    
    toast.success('QR code downloaded successfully!');
  };

  const handleCopyUrl = async () => {
    if (!navigationUrl) return;

    try {
      await navigator.clipboard.writeText(navigationUrl);
      setCopied(true);
      toast.success('Navigation URL copied to clipboard!');
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy URL');
    }
  };

  const handleTestNavigation = () => {
    if (!selectedRoom) return;
    navigate(`/qr-navigate?navigate=${selectedRoom.id}&room=${encodeURIComponent(selectedRoom.name)}`);
  };

  if (!selectedRoom) {
    return (
      <Card className="shadow-elevated bg-card/80 backdrop-blur-sm">
        <CardContent className="py-20">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <QrCode className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Select a Room</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Choose a room from the floor plan to generate its QR code
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-elevated bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <QrCode className="w-6 h-6 text-primary" />
          QR Code Generator
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Room Info */}
        <div className="bg-primary/5 rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-primary">{selectedRoom.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedRoom.department}</p>
            </div>
            <Badge variant="outline" className="font-mono">{selectedRoom.id}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
            <div>
              <span className="text-muted-foreground">Floor:</span>
              <p className="font-medium">Floor {selectedRoom.floor}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Capacity:</span>
              <p className="font-medium">{selectedRoom.capacity} people</p>
            </div>
          </div>
        </div>

        {/* QR Code Display */}
        <div className="flex justify-center">
          <div className="bg-white p-6 rounded-xl border-2 border-primary/20 shadow-lg">
            {qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt={`QR Code for ${selectedRoom.name}`}
                className="w-48 h-48"
              />
            ) : (
              <div className="w-48 h-48 bg-muted animate-pulse rounded"></div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleDownload}
            disabled={!qrCodeUrl}
            className="w-full h-12 campus-gradient text-white hover:opacity-90"
          >
            <Download className="w-4 h-4 mr-2" />
            Download QR Code
          </Button>

          <Button
            variant="outline"
            onClick={handleCopyUrl}
            disabled={!navigationUrl}
            className="w-full h-12 hover:bg-primary/10"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Navigation URL
              </>
            )}
          </Button>

          <Button
            variant="secondary"
            onClick={handleTestNavigation}
            className="w-full h-12 bg-secondary hover:bg-secondary-dark"
          >
            <Navigation className="w-4 h-4 mr-2" />
            Test Navigation
          </Button>
        </div>

        {/* Instructions */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-3">How to use this QR code:</h4>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
              <span>Download or print the QR code</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</span>
              <span>Place it at the room entrance or on signage</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</span>
              <span>Students can scan it to get instant directions</span>
            </li>
          </ol>
        </div>

        {/* URL Display */}
        <div className="bg-muted/30 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Navigation URL:</p>
          <code className="text-xs font-mono break-all text-foreground">{navigationUrl}</code>
        </div>
      </CardContent>
    </Card>
  );
}