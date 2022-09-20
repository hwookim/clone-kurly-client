import React, { useEffect, useRef, useState } from 'react';

import './KakaoMap.scss';

/* global kakao */
export default function KakaoMap() {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const options = {
      center: new kakao.maps.LatLng(37.5063252948439, 127.0536146558608),
      level: 2,
    };
    setMap(new kakao.maps.Map(mapRef.current, options));
  }, [mapRef]);

  return <div className="kakao-map" ref={mapRef} />;
}
