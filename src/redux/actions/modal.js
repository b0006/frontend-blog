import { modalConstants } from '../constants';

function showModal(modalProps, modalType) {
  return dispatch => {
    dispatch({
      type: modalConstants.SHOW_MODAL,
      modalProps,
      modalType
    });
  };
}

function hideModal() {
  return dispatch => {
    dispatch({
      type: modalConstants.HIDE_MODAL
    });
  };
}

export {
  showModal,
  hideModal
};
