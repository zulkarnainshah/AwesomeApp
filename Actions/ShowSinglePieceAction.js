import { SHOW_SINGLE_PIECE } from './Types';

export const viewSinglePiece = (idToken, UserId, pieceId) => {
    return (dispatch) => {
        const API_ENDPOINT = 'https://server-dev1.mywardrobe.space/api/v1/users/'+UserId+'/pieces/'+pieceId;
        fetch(API_ENDPOINT,{
            method: 'GET',

            headers:{
                'Authorization': 'Bearer '+idToken
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const singlePiece = responseJson;
                retrieveSinglePiece(dispatch, singlePiece)
            });
    }
}

export const retrieveSinglePiece = (dispatch, pieceData) => {
    dispatch({
        type: SHOW_SINGLE_PIECE,
        payload: pieceData
    });

}
