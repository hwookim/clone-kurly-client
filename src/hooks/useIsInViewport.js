import { useEffect, useMemo, useState } from 'react';

export default function useIsInViewport(ref) {
  const [isInViewPort, setIsInViewPort] = useState(false);

  const observer = useMemo(() => new IntersectionObserver(([entry]) => setIsInViewPort(entry.isIntersecting)), []);

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isInViewPort;
}
