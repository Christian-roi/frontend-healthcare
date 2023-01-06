import { combineReducers } from 'redux';
import auth from "./auth";
import message from "./message";
import archive from './archive';
import category from './category';

export default combineReducers({
  auth,
  message,
  archive,
  category,
});