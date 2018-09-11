import test from 'ava';
import camelCaseKeys from './index';

test('basic usage', t => {
  const originalObject = { 'foo-bar': true };
  const updatedObject = camelCaseKeys(originalObject);

  t.true(!!updatedObject.fooBar);
});

test('exclude option - basic', t => {
  const originalObject = { '--': true };
  const updatedObject = camelCaseKeys(originalObject, { exclude: ['--'] });

  t.true(!!updatedObject['--']);
});

test('exclude option - regex', t => {
  const originalObject = { 'foo-bar': true, 'bar-foo': true };
  const updatedObject = camelCaseKeys(originalObject, { exclude: [/^f/] });
  const expectedObject = { 'foo-bar': true, barFoo: true };

  t.deepEqual(updatedObject, expectedObject);
});

test('deep option', t => {
  const originalObject = {
    foo_bar: true,
    obj: {
      one_two: false,
      arr: [{ three_four: true }],
    },
  };
  const updatedObject = camelCaseKeys(originalObject, { deep: true });
  const expectedObject = {
    fooBar: true,
    obj: {
      oneTwo: false,
      arr: [{ threeFour: true }],
    },
  };

  t.deepEqual(updatedObject, expectedObject);
});

test('nested arrays', t => {
  const originalObject = {
    q_w_e: [['a', 'b']],
  };
  const updatedObject = camelCaseKeys(originalObject, { deep: true });
  const expectedObject = {
    qWE: [['a', 'b']],
  };

  t.deepEqual(updatedObject, expectedObject);
});

test('accepts an array of objects', t => {
  const originalArray = [
    { foo_bar: true },
    { bar_foo: false },
    { 'bar-foo': 'false' },
  ];
  const updatedArray = camelCaseKeys(originalArray);
  const expectedArray = [
    { fooBar: true },
    { barFoo: false },
    { barFoo: 'false' },
  ];

  t.deepEqual(updatedArray, expectedArray);
});
