import { SHOW_USER_PIECES, GET_USER_IDS, GET_PIECES_LOADING } from '../Actions/Types';

const INITIAL_STATE = {
    piecesImages: [],
    basicUserInfo: [],
      dataLoading: false
    };

export default (state = INITIAL_STATE, action) => {
  console.log(action);
 switch (action.type) {
     case SHOW_USER_PIECES:

      return { ...state, piecesImages: action.payload, dataLoading: false };
      case GET_USER_IDS:

      return { ...state, basicUserInfo: action.payload };
      case GET_PIECES_LOADING:

        return { ...state, dataLoading: true };

     default:
             return state;
           }
};
