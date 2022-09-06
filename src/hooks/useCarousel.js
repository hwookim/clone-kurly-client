import { useCallback, useEffect, useRef, useState } from 'react';

const TRANSITION = 'all 0.5s ease-in-out';

export default function useCarousel({ length, infinite = false }) {
  const [current, setCurrent] = useState(infinite ? 1 : 0);
  const [infiniteCurrent, setInfiniteCurrent] = useState(0);
  const [transition, setTransition] = useState('');
  const ref = useRef(null);

  const replaceSlide = useCallback((index) => {
    const timer = setTimeout(() => {
      setTransition('');
      setCurrent(index);
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!ref?.current) return;

    ref.current.style.transition = transition;
    ref.current.style.transform = `translateX(-${current}00%)`;
  }, [current, transition]);

  const moveCarousel = (direction) => {
    setTransition(TRANSITION);
    const value = current + direction;
    if (!infinite) {
      setCurrent(value);
      return;
    }

    setCurrent(value);
    if (value === 0) {
      setInfiniteCurrent(length - 3);
      replaceSlide(length - 2);
      return;
    }
    if (value > length - 2) {
      setInfiniteCurrent(0);
      replaceSlide(1);
      return;
    }
    setInfiniteCurrent(value - 1);
  };

  return {
    current: infinite ? infiniteCurrent : current,
    moveCarousel,
    ref,
    setCurrent,
  };
}
