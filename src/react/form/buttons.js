import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../lib/componentRegistry';

import '../button';

import './actionHandler';

function ButtonsComponent(props, context) {
  const Button = registry('Lux.Button');

  const buttons = ['submit', 'delete']
    .reduce((acc, name, indx) => {
      if (props[name]) {
        const attrs = {
          ...props[name],
          className: `btn-${name}`,
          onClick: (event) => {
            event.preventDefault();
            clickHandler(props[name], context);
          },
          key: name,
          priority: ['primary', 'secondary', 'tertiary'][indx] || 'tertiary',
        };

        acc.push(<Button {...attrs}>{props[name].title}</Button>);
      }

      return acc;
    }, []);

  return (
    <div className="form-buttons">
      {buttons}
    </div>
  );
}
ButtonsComponent.contextTypes = {
  request: React.PropTypes.func,
  setState: React.PropTypes.func,
  state: React.PropTypes.object,
};
ButtonsComponent.propTypes = {};

function clickHandler(props, context) {
  const currentState = context.state;

  const options = {
    body: currentState.data.properties,
    headers: {
      'Content-Type': props.type,
    },
    method: props.method,
  };

  const formActionHandler = registry('Lux.Form.ActionHandler');

  context.request(props.href, options)
    .then(response => formActionHandler(response, currentState))
    .then(newState => context.setState(newState));
}

registry('Lux.Form.Buttons', ButtonsComponent, false);
