import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../lib/componentRegistry';

const checkMark =
  `<svg class="icon icon--big" viewBox="0 0 100 100">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#check"></use>
  </svg>`;

const closeMark =
  `<svg class="icon icon--big" viewBox="0 0 100 100">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#times"></use>
  </svg>`;

function NotifyComponent(props) {
  const { message, type } = {
    message: false,
    type: false,
    ...props,
  };

  return (!message || !type)
    ? null
    : (
      <div className="notification">
        <div
          className={`notification__icon notification__icon--${type}`}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: checkMark }}
        />

        <div className="notification__text">
          <span>{message}</span>
        </div>

        <div
          className="notification__icon notification__icon--dismiss"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: closeMark }}
          data-js-dismiss
        />
      </div>
    );
}
NotifyComponent.propTypes = {
  message: React.PropTypes.node,
  type: React.PropTypes.string,
};

registry('Lux.Form.Notification', NotifyComponent, false);
