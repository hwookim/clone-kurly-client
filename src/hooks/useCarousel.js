import { useCallback, useEffect, useRef, useState } from 'react';

const TRANSITION = 'all 0.5s ease-in-out';

export default function useCarousel({ infinite = false }) {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(infinite ? 1 : 0);
  const [infiniteCurrent, setInfiniteCurrent] = useState(0);
  const [transition, setTransition] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    if (!ref?.current) return;

    ref.current.style.transition = transition;
    ref.current.style.transform = `translateX(-${current}00%)`;
  }, [current, transition]);

  const setInfiniteData = useCallback((data) => {
    setData([data[data.length - 1], ...data, data[0]]);
  }, []);

  const replaceSlide = useCallback((index) => {
    const timer = setTimeout(() => {
      setTransition('');
      setCurrent(index);
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const moveCarousel = (direction) => {
    setTransition(TRANSITION);
    const value = current + direction;
    if (!infinite) {
      setCurrent(value);
      return;
    }

    setCurrent(value);
    if (value === 0) {
      setInfiniteCurrent(data.length - 3);
      replaceSlide(data.length - 2);
      return;
    }
    if (value > data.length - 2) {
      setInfiniteCurrent(0);
      replaceSlide(1);
      return;
    }
    setInfiniteCurrent(value - 1);
  };

  return {
    data,
    setData: infinite ? setInfiniteData : setData,
    current: infinite ? infiniteCurrent : current,
    moveCarousel,
    ref,
    setCurrent,
  };
}
