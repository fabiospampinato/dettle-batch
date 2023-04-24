
/* IMPORT */

import {debounce} from 'dettle';
import type {Callback, Debounced, DebouncedRaw} from './types';

/* MAIN */

const createDebounce = () => {

  /* VARIABLES */

  const callbacksMap: Partial<Record<string, Set<Callback>>> = {};
  const debouncedsMap: Partial<Record<string, DebouncedRaw>> = {};

  /* DEBOUNCE */

  return ( fn: Callback, wait: number = 1, options?: { leading?: boolean, trailing?: boolean, maxWait?: number } ): Debounced => {

    const id = `${wait}-${options?.maxWait}-${options?.leading}-${options?.trailing}}`;

    const callbacks = ( callbacksMap[id] ||= new Set () );

    const call = () => callbacks.forEach ( cb => cb () );
    const register = () => callbacks.add ( fn );
    const unregister = () => callbacks.delete ( fn );

    register ();

    const debounced = ( debouncedsMap[id] ||= debounce ( call, wait, options ) );

    const cancel = () => debounced.cancel ();
    const dispose = () => unregister ();
    const flush = () => debounced.flush ();

    const debouncedForCallback = Object.assign ( () => debounced (), { cancel, dispose, flush } );

    return debouncedForCallback;

  };

};

/* EXPORT */

export default createDebounce;
