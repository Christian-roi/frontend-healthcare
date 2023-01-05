import { combineReducers } from 'redux';
import archive from './archive';
import category from './category';
import message from './message';

export default combineReducers({
    archive,
    category,
    message,
});