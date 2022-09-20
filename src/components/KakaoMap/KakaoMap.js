import React, { useCallback, useEffect, useRef, useState } from 'react';

import './KakaoMap.scss';

/* global kakao */
export default function KakaoMap() {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  const generateMap = useCallback(() => {
    if (!mapRef.current) return;

    const options = {
      center: new kakao.maps.LatLng(COMPANY_POSITION.LAT, COMPANY_POSITION.LNG),
      level: 2,
    };
    setMap(new kakao.maps.Map(mapRef.current, options));
  }, [mapRef]);

  const generateMarker = useCallback(() => {
    if (!map) return;

    const markerPosition = new kakao.maps.LatLng(
      COMPANY_POSITION.LAT,
      COMPANY_POSITION.LNG
    );
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, [map]);

  useEffect(() => generateMap(), [generateMap]);

  useEffect(() => generateMarker(), [generateMarker]);

  return <div className="kakao-map" ref={mapRef} />;
}

const COMPANY_POSITION = {
  LAT: 37.5063252948439,
  LNG: 127.0536146558608,
};
