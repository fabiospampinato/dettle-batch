
/* IMPORT */

import createDebounce from './create_debounce';
import type {Callback, ThrottleOptions, Throttled} from './types';

/* MAIN */

const createThrottle = () => {

  /* VARIABLES */

  const debounce = createDebounce ();

  /* THROTTLE */

  return ( fn: Callback, wait: number = 1, options?: ThrottleOptions ): Throttled => {

    return debounce ( fn, wait, {
      maxWait: wait,
      leading: options?.leading ?? true,
      trailing: options?.trailing ?? true
    });

  };

};

/* EXPORT */

export default createThrottle;
