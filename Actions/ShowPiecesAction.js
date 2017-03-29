import { AsyncStorage } from 'react-native';
import { SHOW_USER_PIECES, GET_USER_IDS, GET_PIECES_LOADING } from './Types';


export const retrivePieces = () => {
    return (dispatch) => {
        dispatch({ type: GET_PIECES_LOADING });
        AsyncStorage.getItem('authToken').then((value) => {
            const API_ENDPOINT = 'https://server-dev1.mywardrobe.space/api/v1/auth/userinfo';
            const authToken = value;
            fetch(API_ENDPOINT,{ method: "GET",
                headers:{
                    'Authorization': 'Bearer '+ authToken
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    const userID = responseJson.id;
                    AsyncStorage.setItem('userInfo', JSON.stringify(responseJson));
                    getPieces(authToken, userID, dispatch);
                });
        });
    }
};
export const getPieces = (authToken, userID, dispatch) => {
    const API_ENDPOINT = 'https://server-dev1.mywardrobe.space/api/v1/users/'+userID+'/pieces';
    fetch(API_ENDPOINT,{
        method: 'GET',

        headers:{
            'Authorization': 'Bearer '+authToken
        }
    }).then((response) => response.json())
        .then((responseJson) => {
            const piecesData = responseJson;
            showPieces(dispatch, piecesData);
            getUserInformation(dispatch, authToken, userID);
        });
};
export const showPieces = (dispatch, piecesData) => {
    dispatch({
        type: SHOW_USER_PIECES,
        payload: piecesData

    });

};

export const getUserInformation = (dispatch, authToken, userID) => {
    const userinfo = [authToken, userID];
    dispatch({
        type: GET_USER_IDS,
        payload: userinfo
    });

};
