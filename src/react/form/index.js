import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../lib/componentRegistry';

import { siren } from '../siren.propType';

import './field';
import './buttons';
import './notification';


function FormComponent(props, context) {
  const Buttons = registry('Lux.Form.Buttons');
  const Field = registry('Lux.Form.Field');
  const Notification = registry('Lux.Form.Notification');

  return (
    <form className="limit-width">
      <Notification {...context.state.notification} />

      {props.schema.map((field, indx) => <Field key={indx} {...field} />)}

      <Buttons {...props} />
    </form>
  );
}
FormComponent.contextTypes = {
  state: React.PropTypes.object,
};
FormComponent.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  delete: siren.action,
  // eslint-disable-next-line max-len
  // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
  properties: React.PropTypes.object.isRequired,
  schema: React.PropTypes.arrayOf(siren.field),
  // eslint-disable-next-line react/no-unused-prop-types
  submit: siren.action,
  // eslint-disable-next-line react/no-unused-prop-types
  // view: siren.action,
};

registry('Lux.Form', FormComponent, false);
