import { headerConstants } from '../constants';

function setActiveMenu(activeMenu) {
  return dispatch => {
    dispatch(request(activeMenu));

    if (activeMenu.length > 0) {
      dispatch(success(activeMenu));
    } else {
      dispatch(failure('Set active menu error'));
    }
  };

  function request(activeMenu) { return { type: headerConstants.HEADER_SET_ACTIVE_ITEM_REQUEST, activeMenu }; }
  function success(activeMenu) { return { type: headerConstants.HEADER_SET_ACTIVE_ITEM_SUCCESS, activeMenu }; }
  function failure(error) { return { type: headerConstants.HEADER_SET_ACTIVE_ITEM_FAILURE, error }; }
}

export {
  setActiveMenu
};
