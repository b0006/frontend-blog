import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';

import './ModalRoot.css';

import { default as modalTypes } from './Modals';

const MODAL_TYPES = {
  'confirm': modalTypes.ModalConfirm
};

const ModalContainer = ({ modalType, modalProps }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    setModalIsOpen(true);
  }, [modalProps])

  const closeModal = () => { setModalIsOpen(false); };

  if (!modalType) {
    return null;
  }
  const SpecifiedModal = MODAL_TYPES[modalType];
  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        shouldFocusAfterRender={false}
        shouldCloseOnOverlayClick={false}
        overlayClassName="overlay"
        className="modal"
      >
        <SpecifiedModal
          closeModal={closeModal}
          {...modalProps}
        />
      </ReactModal>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { modalProps, modalType } = state.modal;
  return {
    modalProps,
    modalType
  };
};

export default connect(mapStateToProps)(ModalContainer);
