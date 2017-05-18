import { createActions } from 'redux-actions';
import { message as messageAnt } from 'antd';

const handlePayload = type => payload => messageAnt[type](payload);

const { message } = createActions({
  MESSAGE: {
    SUCCESS: handlePayload('success'),
    ERROR: handlePayload('error'),
    INFO: handlePayload('info'),
    WARN: handlePayload('warning'),
  },
});

export default message;
