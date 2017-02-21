import { AsyncStorage } from 'react-native';
import { SHOW_USER_PIECES, GET_USER_IDS, GET_PIECES_LOADING } from './Types';


export const retrivePieces = () => {
    return (dispatch) => {
        dispatch({ type: GET_PIECES_LOADING });
        AsyncStorage.getItem('userId').then((value) => {
            const API_ENDPOINT = 'https://server-dev1.mywardrobe.space/api/v1/userinfo';
            const idToken = value;
            fetch(API_ENDPOINT,{ method: "GET",
                headers:{
                    'Authorization': 'Bearer '+ idToken
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    const userid = responseJson.id;
                    getPieces(idToken, userid, dispatch);
                });
        });
    }
};
export const getPieces = (idToken, UserID, dispatch) => {
    const API_ENDPOINT = 'https://server-dev1.mywardrobe.space/api/v1/users/'+UserID+'/pieces';
    fetch(API_ENDPOINT,{
        method: 'GET',

        headers:{
            'Authorization': 'Bearer '+idToken
        }
    }).then((response) => response.json())
        .then((responseJson) => {
            const piecesData = responseJson;

            showPieces(dispatch, piecesData)
            getUserInformation(dispatch, idToken, UserID);
        });
};
export const showPieces = (dispatch, piecesData) => {
    dispatch({
        type: SHOW_USER_PIECES,
        payload: piecesData

    });

}

export const getUserInformation = (dispatch, idToken, userId) => {
    const userinfo = [idToken, userId];
    console.log(userinfo);
    dispatch({
        type: GET_USER_IDS,
        payload: userinfo
    });

}
