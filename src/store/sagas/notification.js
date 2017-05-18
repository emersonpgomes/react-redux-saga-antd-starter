import { put } from 'redux-saga/effects';

export default function* notification({ payload }) {
  try {
    const response = { message: payload };

    yield put({ type: 'FETCH_CURRENT_LEAGUE_SUCCESS', response });
  } catch (error) {
    yield put({ type: 'FETCH_CURRENT_LEAGUE_ERROR', error });
  }
}
