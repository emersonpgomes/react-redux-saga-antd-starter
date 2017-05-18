import { assign } from 'lodash/fp';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { innerReducer as asyncState } from 'redux-async-initial-state';
import actions from '~/store/actions';

export default combineReducers({
  asyncState,

  notification: handleActions({
    [actions.notifyError]: (state, { payload }) => assign(payload)({ type: 'error' }),
    [actions.notifyInfo]: (state, { payload }) => assign(payload)({ type: 'info' }),
    [actions.notifySuccess]: (state, { payload }) => assign(payload)({ type: 'success' }),
  }, {}),
});
