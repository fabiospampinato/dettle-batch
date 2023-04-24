
/* MAIN */

type Callback = () => void;

type Debounced = Callback & { cancel: Callback, dispose: Callback, flush: Callback };

type DebouncedRaw = Callback & { cancel: Callback, flush: Callback };

type Throttled = Callback & { cancel: Callback, dispose: Callback, flush: Callback };

/* EXPORT */

export type {Callback, Debounced, DebouncedRaw, Throttled};
