export default function debounce(callback, ms) {
  let debounce = null;
  return (...args) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => callback(...args), ms);
  };
}
