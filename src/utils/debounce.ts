// debounce.ts
export function debounce(func: (...args: unknown[]) => void, delay: number) {
  let timer: NodeJS.Timeout;

  const debouncedFn = function (...args: unknown[]) {
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
