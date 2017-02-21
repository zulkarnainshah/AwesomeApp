import { EMAIL_CHANGED, PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_LOADING } from '../Actions/Types';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false
    };

export default (state = INITIAL_STATE, action) => {
  console.log(action);
 switch (action.type) {
     case EMAIL_CHANGED:

      return { ...state, email: action.payload }; //return brand new object for  redux to update
     case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
      case LOGIN_USER_LOADING:
      return { ...state, loading: true, error: '' };
      case LOGIN_USER_SUCCESS:
       return { ...state, user: action.payload, error: '', loading: false };
      case LOGIN_USER_FAIL:
      return {

        ...state, error: 'Authentication failed', password: '', loading: false

       };
     default:
             return state;
           }
};
