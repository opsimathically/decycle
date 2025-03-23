# decycle

Removes circular references from an object in a one-way direction.  Similar projects often track references so that an
object can be retrocycled, which in-turn adds compute overhead.  This project aims to simply not provide that functionality so
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
import { decycle } from '@opsimathically/decycle';

(async function () {


  
})();
```
