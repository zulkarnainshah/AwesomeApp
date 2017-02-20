import { SHOW_USER_PIECES, GET_USER_IDS } from '../Actions/Types';

const INITIAL_STATE = {
    piecesImages: [],
    basicUserInfo: []
    };

export default (state = INITIAL_STATE, action) => {
  console.log(action);
 switch (action.type) {
     case SHOW_USER_PIECES:

      return { ...state, piecesImages: action.payload };
      case GET_USER_IDS:

      return { ...state, basicUserInfo: action.payload }; 

     default:
             return state;
           }
};
