import React from 'react';
import renderer from 'react-test-renderer';

import Button from './button';

describe('Button', function () {
  it('should exist; and should be a function', function () {
    expect(typeof Button).toBe('function');
  });
});
