import {useRef, useEffect} from 'react';
import {Marker, Icon, layerGroup} from 'leaflet';
import useMap from '@/hooks/use-map';
import {ListItem, City} from '@/types/offers';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '@/constants';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  points: ListItem[];
  startPoint: City;
  selectedPoint: City | undefined;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function Map({points, startPoint, selectedPoint}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, startPoint);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      points.forEach(({city, location}) => {
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined &&
            city.location === selectedPoint.location
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}
