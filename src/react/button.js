import React from 'react'; // `React` must be in scope when using JSX

import registry from '../lib/componentRegistry';

function ButtonComponent(props) {
  const attrs = {
    className: `btn btn--${props.priority} ${props.className}`,
    onClick: props.onClick,
    type: 'submit',
  };

  return (
    <button {...attrs}>{props.children}</button>
  );
}
ButtonComponent.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  priority: React.PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
  ]).isRequired,
};

registry('Lux.Button', ButtonComponent, false);
