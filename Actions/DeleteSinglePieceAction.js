import { REMOVE_SINGLE_PIECE } from './Types';
import { Actions } from 'react-native-router-flux';

export const removeSinglePiece = (idToken, UserId, pieceId) => {

  return (dispatch) => {

    const API_ENDPOINT = 'https://server-dev1.mywardrobe.space/api/v1/users/'+UserId+'/pieces/'+pieceId;
    fetch(API_ENDPOINT,{
      method: 'DELETE',

      headers:{
        'Authorization': 'Bearer '+idToken
      }
    }).then((response) => response.json())
           .then((responseJson) => {
             console.log(responseJson);
             const deleteConfirmation = responseJson.status;
             console.log(deleteConfirmation);

             pieceRemoved(dispatch, deleteConfirmation);
             Actions.homeScreen({ idToken, UserId });
           });
  }
}

export const pieceRemoved = (dispatch, deleteConfirmation) => {
  dispatch({
    type: REMOVE_SINGLE_PIECE,
    payload: deleteConfirmation
  });

}
