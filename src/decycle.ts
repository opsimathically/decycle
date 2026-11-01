/* eslint-disable @typescript-eslint/no-explicit-any */

// Decycle an object, replacing circular references with [decycled]
const decycle = function (obj: any, seen: Set<any> = new Set()): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (seen.has(obj)) {
    return '[decycled]';
  }
  seen.add(obj);
  if (Array.isArray(obj)) {
    return obj.map((item) => decycle(item, seen));
  }
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = decycle(value, seen);
  }
  return result;
};

// Decycle an object, removing circular references entirely.
const decycleStrip = function (obj: any, seen: Set<any> = new Set()): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (seen.has(obj)) {
    return '[decycled]';
  }
  seen.add(obj);
  if (Array.isArray(obj)) {
    return obj.map((item) => decycleStrip(item, seen));
  }
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    const inner_result = decycleStrip(value, seen);
    if (inner_result === '[decycled]') continue;
    result[key] = inner_result;
  }
  return result;
};

export { decycle, decycleStrip };
