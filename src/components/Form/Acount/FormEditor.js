import React from "react";

import {
    Input,
    FormGroup,
    Label
  } from "reactstrap";
import { Form} from "react-bootstrap";

const FormEditor = (props) => {

    const {
        stateformEdit,
        handleChangeEdit
    } = props;
  return (
    <>
      <FormGroup>
        <Label>Name</Label>
        <Form.Control
          type="text"
          name="edit_account"
          defaultValue={stateformEdit.edit_account}
          required
          onChange={handleChangeEdit}
        ></Form.Control>
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <Form.Control
          as="textarea"
          name="edit_descrip"
          rows="3"
          defaultValue={stateformEdit.edit_descrip}
          onChange={handleChangeEdit}
        ></Form.Control>
      </FormGroup>
      <FormGroup>
        <Label>Badge</Label>
        <Form.Control
          as="select"
          name="edit_badge"
          required
          onChange={handleChangeEdit}
          defaultValue={stateformEdit.edit_badge}
        >
          <option value="0" disabled>
            Select one option
          </option>
          <option value="COP">COP</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
          <option value="GBD">GBD</option>
          <option value="CAD">CAD</option>
          <option value="AUD">AUD</option>
          <option value="MXN">MXN</option>
          <option value="ILS">ILS</option>
        </Form.Control>
      </FormGroup>
      <FormGroup>
        <Label>Starting amount</Label>
        <Input
          name="edit_monto"
          pattern="[0-9]{0,5}"
          defaultValue={stateformEdit.edit_monto}
          type="number"
          onChange={handleChangeEdit}
        />
      </FormGroup>
      <FormGroup>
        <Form.Check
          type="checkbox"
          label="Saving account"
          value="1"
          defaultChecked={stateformEdit.edit_include}
          onChange={handleChangeEdit}
          name="edit_save_account"
          id="edit_save_account"
        />
      </FormGroup>
      <FormGroup>
        <Form.Check
          type="checkbox"
          label="Show"
          value="1"
          defaultChecked={stateformEdit.edit_show}
          onChange={handleChangeEdit}
          name="edit_show_account"
          id="edit_show_account"
        />
      </FormGroup>
    </>
  );
};

export default FormEditor;
