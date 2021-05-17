import React, { useState } from "react";

import { Button, Row, Input, FormGroup, Label } from "reactstrap";
import { Form, InputGroup } from "react-bootstrap";

const FormAdd = props => {
  const {
    stateSignal,
    ChangeSignal,
    VerifySignal,
    handleChange,
    stateAcount,
    stateCatego,
    stateEvent
  } = props;

  const [showOption, setShowOption] = useState(false);
  const showAdvanceOption = () => {
    setShowOption(!showOption);
  };
  return (
    <>
      <FormGroup>
        <Row>
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
              <Form.Control
                pattern="[0-9]{0,5}"
                type="number"
                name="monto"
                id="monto"
                step={0.01}
                aria-describedby="SignalAppend"
                required
                onChange={e => VerifySignal(e, "signo_move")}
              ></Form.Control>
            </InputGroup>
          </div>
          <div className="col-md-3">
            <Form.Control
              as="select"
              className="mt-4"
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
          <option></option>
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
          <option></option>
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
          defaultValue="2020-01-01T12:00:00"
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
            <option></option>
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
