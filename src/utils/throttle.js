export default function throttle(callback, ms) {
  let flag = true;
  return (...args) => {
    if (flag) {
      flag = false;
      setTimeout(() => {
        callback(...args);
        flag = true;
      }, ms);
    }
  };
}
