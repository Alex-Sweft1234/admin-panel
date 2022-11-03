/**
 * Возвращает функцию, которая, пока продолжает вызываться, не будет запускаться.
 */
export function debounce<A = unknown, R = void>(fn: (args: A) => R, ms: number): [(args: A) => Promise<R>, () => void] {
  let timer: NodeJS.Timeout

  const debouncedFunc = (args: A): Promise<R> =>
    new Promise((resolve) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => resolve(fn(args)), typeof timer === 'undefined' ? 0 : ms)
    })

  const teardown = () => clearTimeout(timer)
  return [debouncedFunc, teardown]
}
