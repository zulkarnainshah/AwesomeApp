import { CREATE_USER } from '../Actions/Types';

const INITIAL_STATE = {

 username: '',
 password: '',
 firstname: '',
 lastname: '',
 middlename: ''


};

export default (state = INITIAL_STATE, action) => {
   console.log(action);
   console.log('are we here man');
  switch (action.type) {
         case CREATE_USER:
        return { ...state, [action.payload.prop]: action.payload.value };

    default:
             return state;
  }
};
