import { headerConstants } from '../constants';

const initialState = {
  activeMenu: 'home',
  errorMsg: null
};

const header = (state = initialState, action) => {
  switch (action.type) {
  case headerConstants.HEADER_SET_ACTIVE_ITEM_REQUEST:
    return state;
  case headerConstants.HEADER_SET_ACTIVE_ITEM_SUCCESS:
    return {
      ...state,
      activeMenu: action.activeMenu
    };
  case headerConstants.HEADER_SET_ACTIVE_ITEM_FAILURE:
    return {
      ...state,
      errorMsg: action.error
    };

  default:
    return state;
  }
};

export {
  header
};
