import React, { useState } from "react";
import CurrencyInput from 'react-currency-input-field';

import { Button, Row, Input, FormGroup, Label } from "reactstrap";
import { Form, InputGroup } from "react-bootstrap";

const FormAdd = (props) => {
  const {
    stateSignal,
    ChangeSignal,
    VerifySignal,
    handleChange,
    stateAcount,
    stateCatego,
    stateEvent,
    stateform,
  } = props;

  const [showOption, setShowOption] = useState(false);
  const showAdvanceOption = () => {
    setShowOption(!showOption);
  };

  return (
    <>
      <FormGroup>
        <Row className="align-items-end">
          <div className="col-md-8">
            <Label>Value</Label>
            <InputGroup>
              <InputGroup.Prepend>
                <Button
                  value={stateSignal.Signal}
                  type="button"
                  id="signo_move"
                  className="btn btn-outline-success"
                  onClick={ChangeSignal}
                >
                  {stateSignal.Signal}
                </Button>
              </InputGroup.Prepend>
              <CurrencyInput
                id="monto"
                name="monto"
                placeholder=" Please enter a value"
                decimalsLimit={2}
                value={stateform.monto}
                required
                decimalSeparator=","
                groupSeparator="."
                step={0.01}
                className="form-control"
                onValueChange={(value, name) => VerifySignal(value, name, "signo_move")}
              />
            </InputGroup>
          </div>
          <div className="col-md-3">
            <Form.Control
              as="select"
              name="badge"
              onChange={handleChange}
            >
              <option>COP</option>
              <option>USD</option>
            </Form.Control>
          </div>
        </Row>
      </FormGroup>
      <FormGroup>
        <Label>Acount</Label>
        <Form.Control as="select" name="acount" onChange={handleChange}>
          <option value="" hidden>Choose an account</option>
          {stateAcount.id !== -1000 && stateAcount.length > 0
            ? stateAcount.map((data, index) => {
                return (
                  <option
                    key={index}
                    className="font-weight-bold"
                    value={data.id}
                  >
                    {data.nombre}
                  </option>
                );
              })
            : ""}
        </Form.Control>
      </FormGroup>
      <FormGroup>
        <Label>Category</Label>
        <Form.Control as="select" name="catego" onChange={handleChange}>
          <option value="" hidden>Choose a category</option>
          {stateCatego.id !== -1000
            ? stateCatego.map((data, index) => {
                if (data.sub_categoria === data.categoria) {
                  return (
                    <option
                      key={index}
                      className="font-weight-bold"
                      value={data.nro_sub_catego}
                    >
                      {data.sub_categoria}
                    </option>
                  );
                } else {
                  return (
                    <option key={index} value={data.nro_sub_catego}>
                      &nbsp;&nbsp;&nbsp;{data.sub_categoria}
                    </option>
                  );
                }
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
          onChange={handleChange}
        ></Form.Control>
      </FormGroup>
      <FormGroup>
        <Label>Date</Label>
        <Input
          type="datetime-local"
          name="datetime"
          defaultValue={`${new Date().getFullYear()}-${`${
            new Date().getMonth() + 1
          }`.padStart(2, 0)}-${`${new Date().getDate()}`.padStart(
            2,
            0
          )}T${`${new Date().getHours()}`.padStart(
            2,
            0
          )}:${`${new Date().getMinutes()}`.padStart(2, 0)}`}
          onChange={handleChange}
        />
      </FormGroup>
      <p className="text-sm text-info" onClick={() => showAdvanceOption()}>
        Advanced Options
        <i
          className={`fas ${
            showOption ? "fa-chevron-up" : "fa-chevron-down"
          } ml-2`}
        ></i>
      </p>
      {showOption && (
        <FormGroup>
          <Label>Event</Label>
          <Form.Control as="select" name="event" onChange={handleChange}>
            <option value="" hidden>Choose an event</option>
            {stateEvent.length > 0
              ? stateEvent.map((data, index) => {
                  if (data.activo === "1") {
                    return (
                      <option key={index} value={data.id}>
                        {data.nombre}
                      </option>
                    );
                  }
                })
              : ""}
          </Form.Control>
        </FormGroup>
      )}
    </>
  );
};

export default FormAdd;
