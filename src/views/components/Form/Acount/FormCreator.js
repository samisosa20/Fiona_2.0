import React from "react";

import {
    Input,
    FormGroup,
    Label,
  } from "reactstrap";
  import { Form} from "react-bootstrap";

const FormCreator = props => {

    const { handleChange } = props;
  return (
    <>
      <FormGroup>
        <Label>Name</Label>
        <Form.Control
          type="text"
          name="catego"
          required
          onChange={handleChange}
        ></Form.Control>
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <Form.Control
          as="textarea"
          name="descrip"
          rows="3"
          onChange={handleChange}
        ></Form.Control>
      </FormGroup>
      <FormGroup>
        <Label>Badge</Label>
        <Form.Control as="select" name="badge" required onChange={handleChange}>
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
          name="monto"
          pattern="[0-9]{0,5}"
          type="number"
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Form.Check
          type="checkbox"
          label="Saving account"
          value="1"
          onChange={handleChange}
          name="save_account"
        />
      </FormGroup>
    </>
  );
};

export default FormCreator;
