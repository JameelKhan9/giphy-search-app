// debounce.ts
export function debounce(func: (...args: any[]) => void, delay: number) {
  let timer: NodeJS.Timeout;

  const debouncedFn = function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };

  debouncedFn.cancel = () => {
    clearTimeout(timer);
  };

  return debouncedFn;
}
