import test from 'node:test';
import assert from 'node:assert';
import { decycle, decycleStrip } from '@src/decycle';

(async function () {
  test('Decycle object reference tests.', async function () {
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

    const decycled_obj = decycle(obj_with_circular_references);
    if (decycled_obj.test1 !== '[decycled]')
      assert.fail('Test 1 did not decycle correctly.');
    if (decycled_obj.test2 !== '[decycled]')
      assert.fail('Test 2 (nested array) did not decycle correctly.');
    if (decycled_obj.test3 !== '[decycled]')
      assert.fail('Test 3 (array reference) did not decycle correctly.');

    console.log('Decycled Object With Preserved Circular Notation:');
    console.log(decycled_obj);
  });

  test('Decycle object, stripping circular references', async function () {
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

    console.log('Decycled Object With Removed Circular Notation:');
    const decycled_obj = decycleStrip(obj_with_circular_references);
    console.log(decycled_obj);
  });
})();
