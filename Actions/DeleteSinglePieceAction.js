import { REMOVE_SINGLE_PIECE } from './Types';

export const  removeSinglePiece =  (idToken, UserId, pieceId) => {

  return(dispatch) => {

    const API_ENDPOINT = 'https://server-dev1.mywardrobe.space/api/v1/users/'+UserId+'/pieces/'+pieceId;
    fetch(API_ENDPOINT,{
      method: 'POST',

      headers:{
        'Authorization': 'Bearer '+idToken
      }
    }).then((response) => response.json())
           .then((responseJson) => {
             const deleteConfirmation = responseJson;
             pieceRemoved(dispatch, deleteConfirmation)
           });
  }
}
 
export const pieceRemoved = (dispatch, deleteConfirmation) => {
  dispatch({
    type: REMOVE_SINGLE_PIECE,
    payload: deleteConfirmation
  });

}
