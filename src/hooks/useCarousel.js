import { useCallback, useEffect, useRef, useState } from 'react';

const TRANSITION = 'all 0.5s ease-in-out';

export default function useCarousel(config = { infinite: false }) {
  const { infinite } = config;
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(infinite ? 1 : 0);
  const [infiniteCurrent, setInfiniteCurrent] = useState(0);
  const [transition, setTransition] = useState('');
  const [delay, setDelay] = useState(false);
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
    setInfiniteCurrent(index - 1);
    const timer = setTimeout(() => {
      setTransition('');
      setCurrent(index);
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const moveCarousel = (direction) => {
    if (delay) return;
    setDelay(true);

    setTransition(TRANSITION);
    const value = current + direction;
    setCurrent(value);

    setTimeout(() => {
      setDelay(false);
    }, 500);

    if (!infinite) return;

    if (value === 0) {
      replaceSlide(data.length - 2);
      return;
    }
    if (value > data.length - 2) {
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
