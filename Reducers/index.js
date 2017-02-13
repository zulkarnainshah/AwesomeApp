import { combineReducers } from 'redux';
import CreateUserReducer from './CreateUserReducer';
import AuthenticationReducer from './AuthenticationReducer';

export default combineReducers({
  create: CreateUserReducer,
  auth: AuthenticationReducer
});
