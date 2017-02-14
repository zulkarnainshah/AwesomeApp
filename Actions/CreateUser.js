import {
    Actions
} from 'react-native-router-flux';
import {
    CREATE_USER,
    USER_SIGNUP_FAILED
} from './Types';

var API_ENDPOINT = 'https://server-dev1.mywardrobe.space/api/v1/signup';
export const createUser = ({
    prop,
    value
}) => {
    return {
        type: CREATE_USER,
        payload: {
            prop,
            value
        }
    };
};

export const saveUserDetails = ({
    firstname,
    username,
    password,
    lastname
}) => {
    return (dispatch) => {
        fetch(API_ENDPOINT, {
                method: "POST",
                headers: {

                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },

                body: JSON.stringify({
                    "email": username,
                    "password": password,
                    "firstname": firstname,
                    "lastname": lastname
                })


            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const createdUserId = responseJson.id_token;
                if (createdUserId == null) {
                   createUserFailed(dispatch);
                 }
                  else {
                Actions.signIn();
               }
            })
    };
};
const createUserFailed = (dispatch) => {
    dispatch({ type: USER_SIGNUP_FAILED });
};
