import { combineReducers } from 'redux';
import CreateUserReducer from './CreateUserReducer';
import AuthenticationReducer from './AuthenticationReducer';
import PiecesReducer from './PiecesReducer';
import ShowPieceReducer from './ShowPieceReducer';
import RemoveSinglePieceReducer from './RemoveSinglePieceReducer';

export default combineReducers({
  create: CreateUserReducer,
  auth: AuthenticationReducer,
  pieces: PiecesReducer,
  singlePiece: ShowPieceReducer,
  deletePiece: RemoveSinglePieceReducer
});
