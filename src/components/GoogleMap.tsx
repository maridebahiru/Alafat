
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
        script.async = true;
        script.defer = true;
        
        window.initMap = initializeMap;
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

      // Center on Ethiopia (approximate coordinates)
      const center = { lat: 9.145, lng: 40.489673 };

      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        zoom: 6,
        center: center,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [{ color: '#f5f5f5' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#c9c9c9' }]
          }
        ]
      });

      // Add markers for Addis Ababa and Dire Dawa
      new window.google.maps.Marker({
        position: { lat: 9.0192, lng: 38.7525 }, // Addis Ababa
        map: mapInstanceRef.current,
        title: 'Addis Ababa',
        icon: {
          url: '/img/aab69517-55fa-435c-bf9a-110721c35cf2.png',
          scaledSize: new window.google.maps.Size(30, 30)
        }
      });

      new window.google.maps.Marker({
        position: { lat: 9.5951, lng: 41.8456 }, // Dire Dawa
        map: mapInstanceRef.current,
        title: 'Dire Dawa',
        icon: {
          url: '/img/aab69517-55fa-435c-bf9a-110721c35cf2.png',
          scaledSize: new window.google.maps.Size(30, 30)
        }
      });
    };

    loadGoogleMaps();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden shadow-md">
      <div ref={mapRef} className="w-full h-full">
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <p className="text-gray-600">Please add your Google Maps API key to display the map</p>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
