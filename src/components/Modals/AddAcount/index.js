import React from "react";

import { Button } from "reactstrap";
import { Form, Modal } from "react-bootstrap";
import FormCreator from "components/Form/Acount/FormCreator";

const ModalAcountAdd = (props) => {
  const { showNewMod, ModNewCateSate, handleSubmit, handleChange } = props;
  return (
    <Modal show={showNewMod} id="ModalAdd" onHide={ModNewCateSate}>
      <Modal.Header closeButton>
        <Modal.Title>Creator of category</Modal.Title>
      </Modal.Header>
      <Form role="form" onSubmit={handleSubmit}>
        <Modal.Body>
          <FormCreator handleChange={handleChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button color="danger" onClick={ModNewCateSate}>
            Close
          </Button>
          <Button type="submit" color="success">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalAcountAdd;
