import { REMOVE_SINGLE_PIECE } from '../Actions/Types';

const INITIAL_STATE = {
  confirmDeletion: ''

};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case REMOVE_SINGLE_PIECE:
      return { ...state, confirmDeletion: action.payload };
    default:
      return state;
  }
};
