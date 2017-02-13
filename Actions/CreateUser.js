import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CREATE_USER } from './Types';

export const createUser = ({ prop, value }) => {
    return {
        type: CREATE_USER,
        payload: { prop, value }
    };
};

export const saveUserDetails = ({ firstname, username, password, middlename, lastname }) => {
    return () => {
        AsyncStorage.setItem('firstname', firstname);

        AsyncStorage.setItem('username', username);
        AsyncStorage.setItem('password', password);
        console.log('are we here');
        AsyncStorage.setItem('middlename', middlename);
        AsyncStorage.setItem('lastname', lastname);

        Actions.signIn();
    };
};
