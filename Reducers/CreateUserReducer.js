import { CREATE_USER, USER_SIGNUP_FAILED } from '../Actions/Types';

const INITIAL_STATE = {

 username: '',
 password: '',
 firstname: '',
 lastname: '',
 middlename: ''


};

export default (state = INITIAL_STATE, action) => {
   console.log(action);

  switch (action.type) {
         case CREATE_USER:
        return { ...state, [action.payload.prop]: action.payload.value };

        case USER_SIGNUP_FAILED:
        return {

          ...state,
          error: 'User signup failed',
          password: '',
          username: '',
          firstname: '',
          lastname: '',
          middlename: ''
         };
    default:
             return state;
  }
};
