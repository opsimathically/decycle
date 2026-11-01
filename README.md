# decycle

Removes circular references from an object in a one-way direction. Similar projects often track references so that an
object can be retrocycled, which in-turn adds compute overhead. This project aims to simply not provide that functionality so
that the decycling speed and functionality can be prioritized.

## Install

```bash
npm install @opsimathically/decycle
```

## Building from source

This package is intended to be run via npm, but if you'd like to build from source,
clone this repo, enter directory, and run `npm install` for dev dependencies, then run
`npm run build`.

## Usage

```typescript
import { decycle, decycleStrip } from '@opsimathically/decycle';

(async function () {
  // Create circular object
  const obj_1 = { a: 1, b: 2, c: 3 };
  const obj_2 = { d: 4 };
  const arr_1 = [1, 2, 3, 4];
  const obj_with_circular_references = {
    internal_1: {
      test1: obj_1,
      internal_2: [1, 6, obj_2],
      testarr1: arr_1
    },
    test1: obj_1,
    test2: obj_2,
    test3: arr_1
  };

  // decycle preserving markers
  const decycled_obj_with_markers = decycle(obj_with_circular_references);

  // decycle stripping markers
  const decycled_obj_with_stripped_circulars = decycleStrip(
    obj_with_circular_references
  );

  /*
  Decycled Object With Markers:
  {
    internal_1: {
      test1: { a: 1, b: 2, c: 3 },
      internal_2: [ 1, 6, [Object] ],
      testarr1: [ 1, 2, 3, 4 ]
    },
    test1: '[decycled]',
    test2: '[decycled]',
    test3: '[decycled]'
  }

  Decycled Object With Stripped Circulars:
  {
    internal_1: {
      test1: { a: 1, b: 2, c: 3 },
      internal_2: [ 1, 6, [Object] ],
      testarr1: [ 1, 2, 3, 4 ]
    }
  }
  */
})();
```
