import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../../lib/componentRegistry';

import './notification';

const NotificationComponent = registry('Lux.Form.Notification');

describe('NotificationComponent', function () {
  it('should exist; and should be a function', function () {
    expect(typeof NotificationComponent).toBe('function');
  });
});
