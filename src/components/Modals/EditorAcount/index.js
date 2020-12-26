import React from "react";
import FormEditor from "components/Form/Acount/FormEditor";

import {
  Button,
  ModalFooter,
} from "reactstrap";
import { Form, Modal} from "react-bootstrap";

const ModalEditAcount = (props) => {
  const {
    showEdiMod,
    ModEdiCateSate,
    handleSubmitEdit,
    stateformEdit,
    handleChangeEdit,
  } = props;
  return (
    <Modal show={showEdiMod} id="ModalEdit" onHide={ModEdiCateSate}>
      <Modal.Header closeButton>
        <Modal.Title>Editor of acount</Modal.Title>
      </Modal.Header>
      <Form role="form" onSubmit={handleSubmitEdit}>
        <Modal.Body>
          <FormEditor
            stateformEdit={stateformEdit}
            handleChangeEdit={handleChangeEdit}
          />
        </Modal.Body>
        <ModalFooter>
          <Button color="danger" onClick={ModEdiCateSate}>
            Close
          </Button>
          <Button type="submit" color="success">
            Save Changes
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ModalEditAcount;
