import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Globe, ExternalLink, Building2, MapPin, Layers, Navigation, Maximize2, Search } from 'lucide-react';
import { campusLocations } from '../data/mockData';

type MapType = 'standard' | 'satellite';

export default function CampusMap() {
  const [mapType, setMapType] = useState<MapType>('standard');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // PCCOER coordinates - Update these to the correct location
  const [centerLat, setCenterLat] = useState(18.6502585647921);
  const [centerLon, setCenterLon] = useState(73.74521620405763);
  const zoom = 16;
  
  // Leaflet map tile URLs
  const standardTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const satelliteTileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

  useEffect(() => {
    // Load Leaflet CSS and JS dynamically
    const loadLeaflet = async () => {
      // Add Leaflet CSS
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      // Load Leaflet JS
      if (!(window as any).L) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.async = true;
        script.onload = () => initMap();
        document.body.appendChild(script);
      } else {
        initMap();
      }
    };

    loadLeaflet();
  }, []);

  useEffect(() => {
    if (mapLoaded && (window as any).L && (window as any).campusMap) {
      updateMapTiles();
    }
  }, [mapType]);

  const initMap = () => {
    const L = (window as any).L;
    if (!L || (window as any).campusMap) return;

    try {
      // Initialize map
      const map = L.map('campus-map-container', {
        center: [centerLat, centerLon],
        zoom: zoom,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      // Add tile layer
      const tileLayer = L.tileLayer(standardTileUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Store map and layer references
      (window as any).campusMap = map;
      (window as any).campusTileLayer = tileLayer;

      // Add main campus marker
      const mainMarker = L.marker([centerLat, centerLon], {
        icon: L.divIcon({
          className: 'custom-marker',
          html: `<div style="background: #004080; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        })
      }).addTo(map);

      mainMarker.bindPopup(`
        <div style="font-family: system-ui; padding: 4px;">
          <strong style="font-size: 14px; color: #004080;">PCCOER Ravet</strong><br/>
          <span style="font-size: 12px; color: #666;">Pimpri Chinchwad College of Engineering & Research</span>
        </div>
      `);

      // Add campus location markers
      campusLocations.forEach(location => {
        const markerColor = getMarkerColor(location.type);
        const marker = L.marker(location.coordinates, {
          icon: L.divIcon({
            className: 'custom-marker',
            html: `<div style="background: ${markerColor}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          })
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: system-ui; padding: 4px;">
            <strong style="font-size: 13px; color: #004080;">${location.name}</strong><br/>
            <span style="font-size: 11px; color: #666; text-transform: capitalize;">${location.type}</span>
            ${location.description ? `<br/><span style="font-size: 11px; color: #888;">${location.description}</span>` : ''}
          </div>
        `);

        marker.on('click', () => {
          setSelectedLocation(location.id);
        });
      });

      // Allow clicking on map to get coordinates
      map.on('click', (e: any) => {
        console.log('Clicked coordinates:', e.latlng.lat, e.latlng.lng);
      });

      setMapLoaded(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      // Use Nominatim geocoding service (free, no API key needed)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`,
        {
          headers: {
            'User-Agent': 'MapMyCampus/1.0'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newLat = parseFloat(lat);
        const newLon = parseFloat(lon);
        
        setCenterLat(newLat);
        setCenterLon(newLon);
        
        const map = (window as any).campusMap;
        const L = (window as any).L;
        
        if (map && L) {
          map.setView([newLat, newLon], 16, { animate: true });
          
          // Add a temporary marker
          if ((window as any).searchMarker) {
            map.removeLayer((window as any).searchMarker);
          }
          
          const searchMarker = L.marker([newLat, newLon], {
            icon: L.divIcon({
              className: 'custom-marker',
              html: `<div style="background: #F59E0B; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4);"></div>`,
              iconSize: [28, 28],
              iconAnchor: [14, 14],
            })
          }).addTo(map);
          
          searchMarker.bindPopup(`
            <div style="font-family: system-ui; padding: 8px;">
              <strong style="font-size: 14px; color: #004080;">📍 Found Location</strong><br/>
              <span style="font-size: 12px; color: #666; margin-top: 4px; display: block;">${data[0].display_name}</span><br/>
              <span style="font-size: 11px; color: #888; font-family: monospace; margin-top: 4px; display: block;">
                ${newLat.toFixed(6)}°N, ${newLon.toFixed(6)}°E
              </span>
            </div>
          `).openPopup();
          
          (window as any).searchMarker = searchMarker;
          
          // Show success message
          console.log('Location found:', data[0].display_name);
        }
      } else {
        // No results found
        alert('No location found. Please try a different search term.');
      }
    } catch (error) {
      console.error('Error searching location:', error);
      alert('Search failed. Please try again or check your internet connection.');
    } finally {
      setIsSearching(false);
    }
  };

  const updateMapTiles = () => {
    const L = (window as any).L;
    const map = (window as any).campusMap;
    const oldLayer = (window as any).campusTileLayer;

    if (!L || !map || !oldLayer) return;

    // Remove old tile layer
    map.removeLayer(oldLayer);

    // Add new tile layer based on map type
    const tileUrl = mapType === 'satellite' ? satelliteTileUrl : standardTileUrl;
    const attribution = mapType === 'satellite' 
      ? '&copy; <a href="https://www.esri.com/">Esri</a>'
      : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    const newLayer = L.tileLayer(tileUrl, {
      attribution,
      maxZoom: 19,
    }).addTo(map);

    (window as any).campusTileLayer = newLayer;
  };

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'building':
        return '#004080'; // primary
      case 'facility':
        return '#4A90E2'; // secondary
      case 'landmark':
        return '#10B981'; // success
      default:
        return '#6B7280';
    }
  };

  const handleOpenInMaps = () => {
    window.open(`https://www.google.com/maps?q=${centerLat},${centerLon}`, '_blank');
  };

  const handleLocationClick = (location: any) => {
    setSelectedLocation(location.id);
    const map = (window as any).campusMap;
    const L = (window as any).L;
    if (map && L) {
      map.setView(location.coordinates, 18, { animate: true });
    }
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'building':
        return <Building2 className="w-4 h-4" />;
      case 'facility':
        return <Layers className="w-4 h-4" />;
      case 'landmark':
        return <MapPin className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'building':
        return 'bg-primary/10 text-primary';
      case 'facility':
        return 'bg-secondary/10 text-secondary';
      case 'landmark':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="shadow-elevated bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" />
            Campus Map - PCCOER Ravet
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={mapType === 'standard' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapType('standard')}
              className={mapType === 'standard' ? 'bg-primary hover:bg-primary-dark' : ''}
            >
              Standard
            </Button>
            <Button
              variant={mapType === 'satellite' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapType('satellite')}
              className={mapType === 'satellite' ? 'bg-primary hover:bg-primary-dark' : ''}
            >
              Satellite
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex gap-2 flex-1 min-w-[300px]">
            <Input
              type="text"
              placeholder="Search for your campus location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  searchLocation();
                }
              }}
              className="flex-1"
            />
            <Button
              variant="default"
              size="sm"
              onClick={searchLocation}
              disabled={isSearching || !searchQuery.trim()}
              className="bg-primary hover:bg-primary-dark"
            >
              {isSearching ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenInMaps}
            className="hover:bg-primary/10"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in Google Maps
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const map = (window as any).campusMap;
              if (map) {
                map.setView([centerLat, centerLon], zoom, { animate: true });
                setSelectedLocation(null);
              }
            }}
            className="hover:bg-primary/10"
          >
            <Maximize2 className="w-4 h-4 mr-2" />
            Reset View
          </Button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="font-medium">Buildings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="font-medium">Facilities</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="font-medium">Landmarks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span className="font-medium">You are here</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Map Container */}
        <div className="relative h-[500px] bg-background rounded-lg border-2 border-border overflow-hidden">
          <div id="campus-map-container" className="w-full h-full"></div>

          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm">
              <div className="text-center space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-sm text-muted-foreground">Loading interactive map...</p>
              </div>
            </div>
          )}

          {/* Location List Overlay */}
          <div className="absolute top-4 left-4 max-w-xs z-[1000] hidden md:block">
            <ScrollArea className="max-h-80 bg-card/95 backdrop-blur-md rounded-xl shadow-elevated border border-border">
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold mb-3 text-foreground">Campus Locations</h3>
                {campusLocations.map(location => (
                  <button
                    key={location.id}
                    onClick={() => handleLocationClick(location)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedLocation === location.id
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'hover:bg-muted/80 bg-card/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-1.5 rounded-lg ${getLocationColor(location.type)}`}>
                        {getLocationIcon(location.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{location.name}</p>
                        <p className={`text-xs mt-0.5 capitalize ${
                          selectedLocation === location.id 
                            ? 'opacity-90' 
                            : 'text-muted-foreground'
                        }`}>
                          {location.type}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Mobile Location Dropdown */}
          <div className="absolute top-4 left-4 right-4 z-[1000] md:hidden">
            <details className="bg-card/95 backdrop-blur-md rounded-xl shadow-elevated border border-border">
              <summary className="p-3 cursor-pointer font-semibold text-sm list-none flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Campus Locations ({campusLocations.length})
                </span>
                <span className="text-muted-foreground text-xs">▼</span>
              </summary>
              <div className="p-3 pt-0 space-y-2 max-h-64 overflow-y-auto">
                {campusLocations.map(location => (
                  <button
                    key={location.id}
                    onClick={() => handleLocationClick(location)}
                    className={`w-full text-left p-2 rounded-lg transition-all text-xs ${
                      selectedLocation === location.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted/80 bg-card/50'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`p-1 rounded ${getLocationColor(location.type)}`}>
                        {getLocationIcon(location.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{location.name}</p>
                        <p className="text-xs opacity-80 capitalize">{location.type}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </details>
          </div>

          {/* Location Count Badge */}
          <div className="absolute top-4 right-4 z-[1000]">
            <Badge className="bg-card/95 backdrop-blur-sm text-foreground border">
              {campusLocations.length} Locations
            </Badge>
          </div>

          {/* Map Type Badge */}
          <div className="absolute bottom-4 right-4 z-[1000]">
            <Badge className="bg-card/95 backdrop-blur-sm text-foreground border capitalize">
              {mapType}
            </Badge>
          </div>
        </div>

        {/* Location Details */}
        {selectedLocation && (
          <div className="bg-primary/5 rounded-lg p-4 fade-in">
            {(() => {
              const location = campusLocations.find(l => l.id === selectedLocation);
              if (!location) return null;
              
              return (
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${getLocationColor(location.type)}`}>
                        {getLocationIcon(location.type)}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{location.name}</h4>
                        <Badge variant="outline" className="capitalize text-xs mt-1">
                          {location.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {location.description && (
                    <p className="text-sm text-muted-foreground">{location.description}</p>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`https://www.google.com/maps?q=${location.coordinates[0]},${location.coordinates[1]}`, '_blank')}
                    >
                      <Navigation className="w-3 h-3 mr-1" />
                      Get Directions
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedLocation(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Campus Info */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-2">About PCCOER Campus</h4>
          <p className="text-sm text-muted-foreground">
            Pimpri Chinchwad College of Engineering & Research is located in Ravet, Pune. 
            The campus features modern facilities, well-equipped laboratories, and a student-friendly environment.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Location:</span>
              <p className="font-medium">Ravet, Pune 412101</p>
            </div>
            <div>
              <span className="text-muted-foreground">Coordinates:</span>
              <p className="font-medium font-mono text-xs">{centerLat}°N, {centerLon}°E</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}