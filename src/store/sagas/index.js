import { fork } from 'redux-saga/effects';
import notification from './notification';

export default function* () {
  yield [
    fork(notification),
  ];
}
