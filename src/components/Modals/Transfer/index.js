import React from "react";
import { Modal} from "react-bootstrap";
import FormAccount from "components/Form/Acount/FormTransfer";

const ModalTranfer = (props) => {

    const {
        showNewTransMod,
        handleSubmit_trans,
        stateSignal,
        VerifySignal,
        stateCatego,
        handleChangeTrans,
        ModNewTransSate,
        stateformtrans
      } = props;

  return (
    <Modal show={showNewTransMod} id="ModalTrans" onHide={ModNewTransSate}>
      <Modal.Header closeButton>
        <Modal.Title>Add Transfer</Modal.Title>
      </Modal.Header>
      <FormAccount
        handleSubmit_trans={handleSubmit_trans}
        stateSignal={stateSignal}
        VerifySignal={VerifySignal}
        stateCatego={stateCatego}
        handleChangeTrans={handleChangeTrans}
        ModNewTransSate={ModNewTransSate}
        stateformtrans={stateformtrans}
      />
    </Modal>
  );
};

export default ModalTranfer;
