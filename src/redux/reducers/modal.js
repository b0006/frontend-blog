import { modalConstants } from '../constants';

const initialState = {
  modalType: null,
  modalProps: {}
};

const modal = (state = initialState, action) => {
  switch (action.type) {
  case modalConstants.SHOW_MODAL:
    return {
      ...state,
      modalProps: action.modalProps,
      modalType: action.modalType
    };

  case modalConstants.HIDE_MODAL:
    return initialState;

  default:
    return state;
  }
};

export {
  modal
};
