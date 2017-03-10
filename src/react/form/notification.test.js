import React from 'react';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-addons-test-utils';

import registry from '../../lib/componentRegistry';

import './notification';

const behavior = ReactTestUtils.createRenderer();

const NotificationComponent = registry('Lux.Form.Notification');

describe('NotificationComponent', function () {
  it('should exist; and should be a function', function () {
    expect(typeof NotificationComponent).toBe('function');
  });

  it('should render a "Alert" notification component', function () {
    const testComponent = renderer.create(
      <NotificationComponent message="Alert" type="alert" />
    );
    const tree = testComponent.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render a "Fail" notification component', function () {
    const testComponent = renderer.create(
      <NotificationComponent message="Fail" type="failure" />
    );
    const tree = testComponent.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render a "Success" notification component', function () {
    const testComponent = renderer.create(
      <NotificationComponent message="Success" type="success" />
    );
    const tree = testComponent.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should throw if "type" is not provided', function () {
    const error = 'Warning: Failed prop type: The prop `type` is marked as ' +
      'required in `NotifyComponent`, but its value is `undefined`.\n' +
      '    in NotifyComponent';

    spyOn(console, 'error');

    renderer.create(<NotificationComponent message="something" />);

    expect(console.error).lastCalledWith(error);
  });

  it('should throw if "message" is not provided', function () {
    const error = 'Warning: Failed prop type: The prop `message` is marked as ' +
      'required in `NotifyComponent`, but its value is `undefined`.\n' +
      '    in NotifyComponent';

    spyOn(console, 'error');

    renderer.create(<NotificationComponent type="alert" />);

    expect(console.error).lastCalledWith(error);
  });

  it('should allow notifications to be closed', function () {
    const props = {
      message: 'Success',
      type: 'success'
    };

    const context = {
      setState: jest.fn(),
      state: {
        foo: 'bar',
        notification: props,
      },
    };

    const expected = { ...context.state };
    delete expected.notification;

    const component = NotificationComponent(props, context);

    component.props.children[2].props.onClick();
    expect(context.setState).lastCalledWith(expected);
  });
});
