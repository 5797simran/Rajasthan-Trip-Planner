import React, { useEffect, useRef } from 'react';
import type { City } from '../types';

// @ts-ignore - Leaflet and plugins are loaded from CDN
const L = window.L;

interface MapProps {
  cities: City[];
  highlightedCity: string | null;
  waypoints: { lat: number; lng: number }[];
  activeDayData: {
    coords: { lat: number; lng: number };
    color: string;
    city: string;
  } | null;
}

const colorMap: { [key: string]: string } = {
    white: '#374151',
    emerald: '#34d399',
    slate: '#64748b',
    rose: '#fb7185',
    red: '#f87171',
    amber: '#fbbf24',
    sky: '#38bdf8',
};

const Map: React.FC<MapProps> = ({ cities, highlightedCity, waypoints, activeDayData }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const overlayRef = useRef<HTMLDivElement>(null);
  const routeControlRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;
    
    mapRef.current = L.map(mapContainerRef.current, {
        scrollWheelZoom: false,
        zoomControl: false,
    });
    
    L.control.zoom({ position: 'topright' }).addTo(mapRef.current);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapRef.current);

    cities.forEach(city => {
      const icon = L.divIcon({
          html: `<svg viewBox="0 0 24 24" class="w-8 h-8 drop-shadow-lg transition-transform duration-200" style="color: ${colorMap[city.color] || '#374151'}"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg>`,
          className: '',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
      });

      const marker = L.marker([city.coords.lat, city.coords.lng], { icon }).addTo(mapRef.current);
      markersRef.current[city.name] = marker;
    });

    const bounds = L.latLngBounds(cities.map(c => [c.coords.lat, c.coords.lng]));
    if (bounds.isValid()) {
      mapRef.current.fitBounds(bounds.pad(0.5));
    }

    return () => {
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }
    }

  }, [cities]);
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Clean up previous route
    if (routeControlRef.current) {
      mapRef.current.removeControl(routeControlRef.current);
      routeControlRef.current = null;
    }

    if (waypoints && waypoints.length > 1 && L.Routing) {
      const routingControl = L.Routing.control({
        waypoints: waypoints.map(wp => L.latLng(wp.lat, wp.lng)),
        routeWhileDragging: false,
        show: false,
        createMarker: () => null,
        lineOptions: {
          styles: [
            { color: 'white', opacity: 0.8, weight: 8 },
            { color: colorMap[activeDayData?.color || 'sky'] || colorMap.sky, opacity: 1, weight: 5, dashArray: '10, 10' },
          ],
        },
      }).addTo(mapRef.current);
      routeControlRef.current = routingControl;
    }
  }, [waypoints, activeDayData?.color])

  useEffect(() => {
    if (activeDayData?.coords && mapRef.current) {
        const currentZoom = mapRef.current.getZoom();
        mapRef.current.flyTo([activeDayData.coords.lat, activeDayData.coords.lng], Math.max(currentZoom, 10), {
            animate: true,
            duration: 1.5
        });
    }
  }, [activeDayData?.coords]);


  useEffect(() => {
    Object.entries(markersRef.current).forEach(([name, marker]) => {
      const isActive = name === activeDayData?.city;
      const isHighlighted = name === highlightedCity;
      
      let scale = 1;
      let zIndex = 0;

      if(isActive) {
        scale = 1.6;
        zIndex = 2000;
      } else if (isHighlighted) {
        scale = 1.3;
        zIndex = 1000;
      }

      marker.setZIndexOffset(zIndex);
      if (marker._icon) {
        marker._icon.style.transform = `scale(${scale})`;
      }
    });
  }, [highlightedCity, activeDayData?.city]);

  useEffect(() => {
    if (overlayRef.current) {
        const color = activeDayData?.color ? colorMap[activeDayData.color] : 'transparent';
        overlayRef.current.style.backgroundColor = color;
    }
  }, [activeDayData?.color])

  return (
    <div className="relative w-full aspect-square rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div ref={mapContainerRef} className="h-full w-full" />
        <div ref={overlayRef} className="absolute top-0 left-0 h-full w-full transition-colors duration-1000 pointer-events-none" style={{ backgroundColor: 'transparent', opacity: 0.15 }} />
    </div>
  );
};

export default Map;