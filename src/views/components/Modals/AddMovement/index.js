import React from "react";

import { Button } from "reactstrap";
import { Form, Modal } from "react-bootstrap";
import FormAdd from "views/components/Form/Acount/FormAdd";

const ModalAddMovement = (props) => {

    const {
        stateSignal,
        ChangeSignal,
        VerifySignal,
        handleChange,
        stateAcount,
        stateCatego,
        stateEvent,
        showNewModMovi,
        handleSubmitMovi,
        ModNewMoviSate,
        stateform
      } = props;
  return (
    <Modal show={showNewModMovi} id="ModalAdd" onHide={ModNewMoviSate}>
      <Modal.Header closeButton>
        <Modal.Title>Add Movement</Modal.Title>
      </Modal.Header>
      <Form role="form" onSubmit={handleSubmitMovi}>
        <Modal.Body>
          <FormAdd
            stateSignal={stateSignal}
            ChangeSignal={ChangeSignal}
            VerifySignal={VerifySignal}
            handleChange={handleChange}
            stateAcount={stateAcount}
            stateCatego={stateCatego}
            stateEvent={stateEvent}
            stateform={stateform}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button color="danger" onClick={ModNewMoviSate}>
            Close
          </Button>
          <Button type="submit" color="success" id="btn_new_move_dash">
            Add
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalAddMovement;
