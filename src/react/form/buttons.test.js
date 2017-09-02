import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../../lib/componentRegistry';

import './buttons';

const Button = registry('Lux.Form.Button');

describe('Button', function () {
  it('should exist; and should be a function', function () {
    expect(typeof Button).toBe('function');
  });
});
