import { combineReducers } from 'redux';
import basketReducer from './basket/reducer';


export default combineReducers({
  basket: basketReducer,
  
});
