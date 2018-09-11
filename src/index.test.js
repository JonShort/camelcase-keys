import test from 'ava';
import keysToCamelcase from './index';

test('basic usage', t => {
  const originalObject = { 'foo-bar': true };
  const updatedObject = keysToCamelcase(originalObject);

  t.true(!!updatedObject.fooBar);
});

test('exclude option - basic', t => {
  const originalObject = { '--': true };
  const updatedObject = keysToCamelcase(originalObject, { exclude: ['--'] });

  t.true(!!updatedObject['--']);
});

test('exclude option - regex', t => {
  const originalObject = { 'foo-bar': true, 'bar-foo': true };
  const updatedObject = keysToCamelcase(originalObject, { exclude: [/^f/] });
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
  const updatedObject = keysToCamelcase(originalObject, { deep: true });
  const expectedObject = {
    fooBar: true,
    obj: {
      oneTwo: false,
      arr: [{ threeFour: true }],
    },
  };

  t.deepEqual(updatedObject, expectedObject);
});

test('accepts an array of objects', t => {
  const originalArray = [
    { foo_bar: true },
    { bar_foo: false },
    { 'bar-foo': 'false' },
  ];
  const updatedArray = keysToCamelcase(originalArray);
  const expectedArray = [
    { fooBar: true },
    { barFoo: false },
    { barFoo: 'false' },
  ];

  t.deepEqual(updatedArray, expectedArray);
});
