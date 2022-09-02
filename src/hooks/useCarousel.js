import { useCallback, useEffect, useRef, useState } from 'react';

export default function useCarousel({ length, loop = false, start = 0 }) {
  const [current, setCurrent] = useState(start);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref?.current) return;

    ref.current.style.transition = 'all 0.5s ease-in-out';
    ref.current.style.transform = `translateX(-${current}00%)`;
  }, [current]);

  const moveCarousel = useCallback(
    (direction) => {
      const value = current + direction;
      if (value < 0) {
        if (loop) {
          setCurrent(length - 1);
        }
        return;
      }
      if (value >= length) {
        if (loop) {
          setCurrent(0);
        }
        return;
      }
      setCurrent(value);
    },
    [current, length, loop]
  );

  return { current, moveCarousel, ref, setCurrent };
}
