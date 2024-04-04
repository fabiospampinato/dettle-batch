
/* MAIN */

type Callback = () => void;

type DebounceOptions = { leading?: boolean, trailing?: boolean, maxWait?: number };

type Debounced = Callback & { cancel: Callback, dispose: Callback, flush: Callback };

type DebouncedRaw = Callback & { cancel: Callback, flush: Callback };

type ThrottleOptions = { leading?: boolean, trailing?: boolean };

type Throttled = Callback & { cancel: Callback, dispose: Callback, flush: Callback };

/* EXPORT */

export type {Callback, DebounceOptions, Debounced, DebouncedRaw, ThrottleOptions, Throttled};
