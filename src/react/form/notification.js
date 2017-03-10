import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../lib/componentRegistry';

const icons = {
  alert: svgize('bell'),
  dismiss: svgize('times'),
  fail: svgize('exclamation'),
  failure: svgize('exclamation'),
  success: svgize('check'),
};

function svgize(name) {

  return `<svg class="icon icon--big" viewBox="0 0 100 100">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#${name}"></use>
  </svg>`;
}

function Icon(props) {
  const attrs = {
    className: `notification__icon notification__icon--${props.name}`,
    dangerouslySetInnerHTML: { __html: icons[props.name] },
  };

  if (props.onClick) {
    attrs.className = `${attrs.className} clickable`;
    attrs.onClick = props.onClick;
  }

  if (props.name === 'dismiss') {
    attrs['data-js-notification'] = 'dismiss';
  }

  return (
    <div {...attrs} />
  );
}
Icon.propTypes = {
  onClick: React.PropTypes.func,
  name: React.PropTypes.string,
};

function NotifyComponent(props, context) {
  const { message, type } = props;

  function dismiss() {
    const newState = { ...context.state };

    delete newState.notification;

    context.setState(newState);
  }

  return (
    <div className="notification">
      <Icon name={type} />

      <div className="notification__text">
        <span>{message}</span>
      </div>

      <Icon name="dismiss" onClick={dismiss} />
    </div>
  );
}
NotifyComponent.contextTypes = {
  state: React.PropTypes.object,
  setState: React.PropTypes.func,
};
NotifyComponent.propTypes = {
  message: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf([
    'alert',
    'failure',
    'success',
  ]).isRequired,
};

registry('Lux.Form.Notification', NotifyComponent, false);
