import { SHOW_USER_PIECES } from '../Actions/Types';

const INITIAL_STATE = {
    piecesImages: [],

    };

export default (state = INITIAL_STATE, action) => {
  console.log(action);
 switch (action.type) {
     case SHOW_USER_PIECES:

      return { ...state, piecesImages: action.payload };
      
     default:
             return state;
           }
};
