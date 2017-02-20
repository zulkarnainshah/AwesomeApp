import { SHOW_SINGLE_PIECE } from '../Actions/Types';

const INITIAL_STATE = {
    piece: null,

    };

export default (state = INITIAL_STATE, action) => {
  console.log(action);
 switch (action.type) {
     case SHOW_SINGLE_PIECE:

      return { ...state, piece: action.payload };


     default:
             return state;
           }
};
