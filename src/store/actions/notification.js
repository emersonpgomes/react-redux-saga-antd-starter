import { createActions } from 'redux-actions';
import { merge } from 'lodash';
import { notification } from 'antd';
import { v4 } from 'uuid';

const handlePayload = type => (payload) => {
  if (typeof payload === 'string') {
    payload = { message: payload };
  }

  const notifyBody = merge({}, {
    placement: 'bottomRight',
    key: v4(),
  }, payload);

  return notification[type](notifyBody);
};

const { notify } = createActions({
  NOTIFY: {
    BASIC: handlePayload('open'),
    SUCCESS: handlePayload('success'),
    ERROR: handlePayload('error'),
    INFO: handlePayload('info'),
    WARN: handlePayload('warning'),
  },
});

export default notify;

// export const notify = createAction(
//   'NOTIFY-BASIC',
//   handlePayload('open'),
// );

// export const notifySuccess = createAction(
//   'NOTIFY-SUCCESS',
//   handlePayload('success'),
// );

// export const notifyInfo = createAction(
//   'NOTIFY-INFO',
//   handlePayload('info'),
// );

// export const notifyError = createAction(
//   'NOTIFY-ERROR',
//   handlePayload('error'),
// );

// export const notifyWarning = createAction(
//   'NOTIFY-WARNING',
//   handlePayload('warning'),
// );
