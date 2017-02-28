/**
 * @module react/rest/item/formModel
 * @memberof react/rest/item
 */

// FIXME: refactor this module into lib/

import { hasOne } from '../../../lib/has';
import { isArray } from '../../../lib/is';

function required() {
  throw new Error('No arguments passed to `formModel`.');
}

function formActionsReduce(acc, action) {
  if (hasOne('class', 'resource', action)) {
    acc[action.class[1]] = action;
  }

  return acc;
}

function formModel(props = required()) {
  if (!props.actions || !isArray(props.actions)) {
    // eslint-disable-next-line max-len
    throw new Error('No `actions` provided; an action is required for display.');
  }

  const actions = props.actions
    .reduce(formActionsReduce, {});

  if (!actions.view) {
    throw new Error('View action not provided; which would include fields[].');
  }

  const schema = actions.view.fields;

  // TODO: ensure that component errors are being handled appropriately;
  // resulting in an error page and not a blank page with JS console errors
  if (!schema) {
    throw new Error('No schema found.');
  }

  // make "field+config mapping" (below) simpler, and easier
  const fieldConfigs = (props.entities || [])
    .reduce((acc, ent) => {
      /* istanbul ignore else */
      if (hasOne('class', 'fieldConfig', ent)) {
        Object.keys(ent.properties)
          .forEach((field) => {
            acc[field] = {
              actions: ent.actions,
              entities: ent.entities,
              ...ent.properties[field],
            };
          });
      }

      return acc;
    }, {});

  return {
    ...actions,
    properties: /\/new\/?$/.test(props.path) ? {} : { ...props.properties },
    schema: schema
      // field+config mapping
      .map(field => ({ ...field, config: fieldConfigs[field.name] })),
    title: props.title,
  };
}

export default formModel;
