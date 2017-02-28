import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../lib/componentRegistry';

import '../button';

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
    method: props.method,
    body: currentState.data.properties,
  };

  context.request(props.href, options)
    .then((response) => {
      switch (response.status) {
        case 200:
          currentState.notification = {
            message: response.body || 'Successful.',
            type: 'success',
          };
          break;
        case 400:
          currentState.notification = {
            message: response.body || 'Validation errors.',
            type: 'error',
          };
          // TODO: implement server validation errors mapping to fields
          break;
        case 403:
          currentState.notification = {
            message: response.body || 'Not authorized.',
            type: 'error',
          };
          break;
        default:
          currentState.notification = {
            message: response.body || 'Unexpected server response.',
            type: 'error',
          };
          break;
      }

      context.setState(currentState);
    });
}

registry('Lux.Form.Buttons', ButtonsComponent, false);
