
/* IMPORT */

import {describe} from 'fava';
import {setTimeout as delay} from 'node:timers/promises';
import {createDebounce, createThrottle} from '../dist/index.js';

/* HELPERS */

let timeoutCalls = 0;
let _setTimeout = globalThis.setTimeout;

globalThis.setTimeout = ( ...args ) => {
  timeoutCalls++;
  return _setTimeout ( ...args );
};

/* MAIN */

describe ( 'Dettle Batch', () => {

  describe ( 'createDebounce', it => {

    it ( 'debounces multiple function calls with the same options together', async t => {

      let calls = '';
      let debounce = createDebounce ();
      let fn1 = () => calls += '1';
      let fn2 = () => calls += '2';
      let dfn1 = debounce ( fn1, 100 );
      let dfn2 = debounce ( fn2, 100 );

      timeoutCalls = 0;

      dfn1 ();
      dfn2 ();

      t.is ( timeoutCalls, 1 );
      t.is ( calls, '' );

      await delay ( 50 );

      t.is ( calls, '' );

      dfn1 ();

      await delay ( 50 );

      t.is ( calls, '' );

      dfn1 ();

      await delay ( 50 );

      t.is ( calls, '' );

      dfn2 ();

      await delay ( 50 );

      t.is ( calls, '' );

      dfn2 ();

      await delay ( 50 );

      t.is ( calls, '' );

      dfn2 ();

      await delay ( 500 );

      t.is ( calls, '12' );

    });

    it ( 'debounces multiple function calls with different options individually', async t => {

      let calls = '';
      let debounce = createDebounce ();
      let fn1 = () => calls += '1';
      let fn2 = () => calls += '2';
      let dfn1 = debounce ( fn1, 100 );
      let dfn2 = debounce ( fn2, 200 );

      timeoutCalls = 0;

      dfn1 ();
      dfn2 ();

      t.is ( timeoutCalls, 2 );
      t.is ( calls, '' );

      await delay ( 150 );

      t.is ( calls, '1' );

      await delay ( 150 );

      t.is ( calls, '12' );

    });

  });

  describe ( 'createThrottle', it => {

    it ( 'throttles multiple function calls with the same options together', async t => {

      let calls = '';
      let throttle = createThrottle ();
      let fn1 = () => calls += '1';
      let fn2 = () => calls += '2';
      let dfn1 = throttle ( fn1, 100 );
      let dfn2 = throttle ( fn2, 100 );

      timeoutCalls = 0;

      dfn1 ();
      dfn2 ();

      t.is ( timeoutCalls, 1 );
      t.is ( calls, '12' );

      await delay ( 50 );

      t.is ( calls, '12' );

      dfn1 ();

      await delay ( 50 );

      t.is ( calls, '1212' );

      dfn1 ();

      await delay ( 50 );

      t.is ( calls, '1212' );

      dfn2 ();

      await delay ( 50 );

      t.is ( calls, '121212' );

      dfn2 ();

      await delay ( 50 );

      dfn2 ();

      await delay ( 500 );

      t.is ( calls, '12121212' );

    });

    it ( 'throttles multiple function calls with different options individually', async t => {

      let calls = '';
      let throttle = createThrottle ();
      let fn1 = () => calls += '1';
      let fn2 = () => calls += '2';
      let dfn1 = throttle ( fn1, 100 );
      let dfn2 = throttle ( fn2, 200 );

      timeoutCalls = 0;

      dfn1 ();
      dfn2 ();

      t.is ( timeoutCalls, 2 );
      t.is ( calls, '12' );

      dfn1 ();
      dfn2 ();

      await delay ( 150 );

      t.is ( calls, '121' );

      await delay ( 150 );

      t.is ( calls, '1212' );

    });

  });

});
