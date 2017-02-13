import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED,
       PASSWORD_CHANGED,
       LOGIN_USER_SUCCESS,
        LOGIN_USER_FAIL } from './Types';

export const emailChanged = (text) => {
  return {
          type: EMAIL_CHANGED,
           payload: text
        };
};
 export const passwordChanged = (text) => {
   return {
     type: PASSWORD_CHANGED,
     payload: text
   };
   };
export const loginUser = ({ email, password }) => {
   return (dispatch) => {
    AsyncStorage.getItem('username').then((keyValue) => {
      if (keyValue === email) {
        console.log(keyValue);
        checkPass(email, password, dispatch);
      }
},
  (error) => {
  console.log(error); //Display error
});
  };
  };

  const loginUserSuccess = (dispatch, status) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: status
  });
  Actions.homeScreen();
};
const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const checkPass = (uid, password, dispatch) => {
  AsyncStorage.getItem('password').then((keyValue2) => {
   if (password === keyValue2) {
                  loginUserSuccess(dispatch, uid);
                       }
     else {
       loginUserFail(dispatch);
     }
  },
  (error) => {
  console.log(error); //Display error
  });
};
