import { combineReducers } from 'redux';
import { innerReducer as asyncState } from 'redux-async-initial-state';
import { handleAction, combineActions } from 'redux-actions';
import { flip, get, always } from 'lodash/fp';

import actions from '~/store/actions';

export default combineReducers({
  asyncState,

  progress: handleAction(combineActions(
    actions.progress.incremented,
    actions.progress.decremented,
  ), {
    next: flip(get('payload')),
    throw: always(null),
  }, 60),

});
