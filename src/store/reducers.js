import { combineReducers } from 'redux';
import { innerReducer as asyncState } from 'redux-async-initial-state';

export default combineReducers({
  asyncState,
});
