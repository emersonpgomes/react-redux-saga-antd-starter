import { createAction } from 'redux-actions';
import { v4 } from 'uuid';

const handleNotifyCreator = msg => (message = {}) => {
  if (typeof message !== 'string') {
    message.message = message.message || msg;
  } else {
    message = { message };
  }

  return { ...message, uid: v4() };
};

export const notifyInfo = createAction(
  'notify-info',
  handleNotifyCreator('Operação realizada com sucesso!'),
);

export const notifySuccess = createAction(
  'notify-success',
  handleNotifyCreator('Operação realizada com sucesso!'),
);

export const notifyError = createAction(
  'notify-error',
  handleNotifyCreator(`
    Ocorreu um erro ao tentar realizar a ação solicitada!
    Por favor, tente novamente.
  `),
);
