// jshint undef:false

"use strict";

const foo = require('./../foo');

test('adds 1 + 2 to equal 3', () => {
  expect(foo(1, 2)).toBe(3);
});