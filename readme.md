# Dettle Batch

A batched debouncing and throttling solution, for performance.

This allows you to construct debounce and throttle functions based on [`dettle`](https://github.com/fabiospampinato/dettle) where multiple callbacks using the same options are scheduled together, so a single timeout is used to schedule all of them, rather than one for each.

## Install

```sh
npm install --save dettle-batch
```

## Usage

```ts
import {createDebounce, createThrottle} from 'dettle-batch';

// Let's debounce multiple handlers for the same DOM event together, for performance

const debounce = createDebounce ();

document.addEventListener ( 'focusin', debounce ( onFocusChange1, 50 ) );
document.addEventListener ( 'focusout', debounce ( onFocusChange1, 50 ) );
document.addEventListener ( 'focusin', debounce ( onFocusChange2, 50 ) );
document.addEventListener ( 'focusout', debounce ( onFocusChange2, 50 ) );

// Let's throttle multiple handlers for the DOM event together, for performance

const throttle = createThrottle ();

document.addEventListener ( 'focusin', throttle ( onFocusChange1, 50 ) );
document.addEventListener ( 'focusout', throttle ( onFocusChange1, 50 ) );
document.addEventListener ( 'focusin', throttle ( onFocusChange2, 50 ) );
document.addEventListener ( 'focusout', throttle ( onFocusChange2, 50 ) );
```

## License

MIT © Fabio Spampinato
