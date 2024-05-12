import { combineReducers } from 'redux';
import basketReducer from './basket/reducer';
import micReducer from './mic/reducer';

export default combineReducers({
  basket: basketReducer,
  mic: micReducer,
});
