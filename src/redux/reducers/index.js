import { combineReducers } from 'redux';
import { authentication } from './auth';
import { article } from './api/article';
import { keyWord } from './api/keyWord';
import { comment } from './api/comment';
import { header } from './header';
import { modal } from './modal';

const rootReducer = combineReducers({
  authentication,
  article,
  header,
  modal,
  keyWord,
  comment
});

export default rootReducer;
