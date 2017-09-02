import registry from '../../lib/componentRegistry';

// TODO: need docblock
function actionHandler(response, state) {
  const clientErrors = {
    400: 'Validation errors.',
    401: 'Not authorized.',
    403: 'Not authorized.',
    404: 'Resource not found.',
    405: 'Action not allowed.',
  };

  switch (parseInt(response.status / 100, 10)) {
    // 2xx statuses
    case 2:
      state.notification = {
        message: response.body || 'Success.',
        type: 'success',
      };
      break;
    // 4xx statuses
    case 4:
      state.notification = {
        message: response.body || clientErrors[response.status] || 'Error.',
        type: 'failure',
      };
      // TODO: implement server validation errors mapping to fields
      break;
    // anything else
    default:
      state.notification = {
        message: response.body || 'Unexpected server response.',
        type: 'failure',
      };
      break;
  }

  return state;
}

registry('Lux.Form.ActionHandler', actionHandler);
