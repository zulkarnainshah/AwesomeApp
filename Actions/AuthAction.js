import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED,
       PASSWORD_CHANGED,
       LOGIN_USER_SUCCESS,
        LOGIN_USER_FAIL,
        LOGIN_USER_LOADING
       } from './Types';
import UserInfo from '../Components/Models/UserInfo';

const API_ENDPOINT = 'https://server-dev1.mywardrobe.space/api/v1/signin';
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
      dispatch({ type: LOGIN_USER_LOADING });

       fetch(API_ENDPOINT, {method: "POST",
      headers: {

       'Content-Type': 'application/json',
       'Accept': 'application/json'
     },

     body: JSON.stringify({
               "email": email,
                "password": password,

           })


})
.then((response) => response.json())
.then((responseJson) => {
  console.log(responseJson);
const id = responseJson.id_token;
    if (id == null) {
      loginUserFail(dispatch);
    }
     else {
              loginUserSuccess(dispatch, id);
               saveIdOnLocalStorage(id);


               console.log(id);
              Actions.homeScreen({ type: 'reset' });
         }
  });
  };
  };

  const loginUserSuccess = (dispatch, id) => {

  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: id

  });
  Actions.startpage({ type: 'reset' });
};
const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};





const saveIdOnLocalStorage = (idToken) => {

    AsyncStorage.setItem('userId', idToken);
 };
