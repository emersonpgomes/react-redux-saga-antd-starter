import { fork } from 'redux-saga/effects';
import { map, unary } from 'lodash/fp';
import notification from './notification';

export default function* () {
  const _sagas = [
    notification,
  ];

  yield map(unary(fork), _sagas);
}
