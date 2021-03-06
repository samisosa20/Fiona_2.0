import React, { useState, useEffect } from "react";

// reactstrap components
import { Button, Row, FormGroup, Label } from "reactstrap";

import { Form, Modal, InputGroup } from "react-bootstrap";

const FormAccount = (props) => {
  const {
    handleSubmit_trans,
    stateSignal,
    VerifySignal,
    stateCatego,
    handleChangeTrans,
    ModNewTransSate,
  } = props;
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const now = new Date();
    let year, month, date, hours, minutes, seconds;

    year = now.getFullYear();
    month =
      now.getMonth().toString().length === 1
        ? "0" + (now.getMonth() + 1).toString()
        : now.getMonth() + 1;
    date =
      now.getDate().toString().length === 1
        ? "0" + now.getDate().toString()
        : now.getDate();
    hours =
      now.getHours().toString().length === 1
        ? "0" + now.getHours().toString()
        : now.getHours();
    minutes =
      now.getMinutes().toString().length === 1
        ? "0" + now.getMinutes().toString()
        : now.getMinutes();
    seconds =
      now.getSeconds().toString().length === 1
        ? "0" + now.getSeconds().toString()
        : now.getSeconds();

    setDateTime(`${year}-${month}-${date}T${hours}:${minutes}:${seconds}`);
  }, []);
  return (
    <Form role="form" onSubmit={handleSubmit_trans}>
      <Modal.Body>
        <FormGroup>
          <Row>
            <div className="col-md-8">
              <Label>Value</Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <Button
                    value={stateSignal.Signal}
                    type="button"
                    className="btn btn-outline-success"
                  >
                    +
                  </Button>
                </InputGroup.Prepend>
                <Form.Control
                  pattern="[0-9]{0,5}"
                  type="number"
                  name="monto"
                  id="monto"
                  step={0.01}
                  aria-describedby="SignalAppend"
                  required
                  onChange={(e) => VerifySignal(e, "")}
                ></Form.Control>
              </InputGroup>
            </div>
            <div className="col-md-3">
              <Form.Control
                as="select"
                className="mt-4"
                name="badge"
                onChange={handleChangeTrans}
              >
                <option>COP</option>
                <option>USD</option>
              </Form.Control>
            </div>
          </Row>
        </FormGroup>
        <FormGroup>
          <Label>Out Account</Label>
          <Form.Control
            as="select"
            id="account_ini"
            name="account_ini"
            onChange={handleChangeTrans}
          >
            <option></option>
            {stateCatego.id !== -1000
              ? stateCatego.map((data, index) => {
                  return (
                    <option key={index} value={data.id}>
                      {data.nombre}
                    </option>
                  );
                })
              : ""}
          </Form.Control>
        </FormGroup>
        <FormGroup>
          <Label>In Account</Label>
          <Form.Control
            as="select"
            name="account_fin"
            onChange={handleChangeTrans}
          >
            <option></option>
            {stateCatego.id !== -1000
              ? stateCatego.map((data, index) => {
                  return (
                    <option key={index} value={data.id}>
                      {data.nombre}
                    </option>
                  );
                })
              : ""}
          </Form.Control>
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <Form.Control
            as="textarea"
            name="descrip"
            rows="3"
            onChange={handleChangeTrans}
          ></Form.Control>
        </FormGroup>
        <FormGroup>
          <Label>Date</Label>
          <Form.Control
            type="datetime-local"
            defaultValue={dateTime}
            name="datetime"
            onChange={handleChangeTrans}
          ></Form.Control>
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button color="danger" onClick={ModNewTransSate}>
          Close
        </Button>
        <Button type="submit" color="success" id="btn_new_trans_dash">
          Add
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default FormAccount;
