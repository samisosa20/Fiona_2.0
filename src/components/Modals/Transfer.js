import React, { useState, useEffect } from "react";
import axios from "axios";
// reactstrap components
import { Button, Row, FormGroup, Label } from "reactstrap";
import { Form, InputGroup, Modal } from "react-bootstrap";
import API from "../../variables/API";

function ModalTrans() {
  /* Declaracion de estados de los modals */
  const [showNewMod, setshowNewMod] = useState(false);
  const [stateform, setform] = useState({
    monto: 0,
    badge: "COP",
    catego: 0,
    descrip: "",
    datetime: "",
  });
  // Funcion para cambiar de estado de los modals
  const ModNewMoviSate = () => setshowNewMod(!showNewMod);

  // Accion al abrir los modals
  const OpenModalMovi = (e) => {
    e.preventDefault();
    API.post("acount", {
      id: 5,
      idc: idc,
    }).then((response) => setCatego(response.data));
    let now = new Date(),
      year,
      month,
      date,
      hours,
      minutes,
      seconds,
      formattedDateTime;

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

    formattedDateTime =
      year +
      "-" +
      month +
      "-" +
      date +
      "T" +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;

    //document.getElementById("datetime_movi").value = formattedDateTime;
    setform({ ...stateform, datetime: formattedDateTime });
    ModNewMoviSate();
  };
  const handleChange = (event) => {
    setform({ ...stateform, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (stateform.badge == "" || stateform.catego == 0) {
      alert(stateform.catego);
    } else {
      let valor = stateform.monto;
      if (document.getElementById("signo_move").value == "-") {
        valor = valor * -1;
      }
      let idc = sessionStorage.getItem("IdUser");
      API.post("add_data", {
        id: 3,
        idu: idc,
        accoun: acount,
        value: valor,
        divisa: stateform.badge,
        catego: stateform.catego,
        descrip: stateform.descrip,
        date: stateform.datetime,
      }).then((response) => {
        //alert (response.data);
        ModNewMoviSate();
      });
    }
  };
  return (
    <Modal show={showNewMod} id="ModalAdd" onHide={ModNewMoviSate}>
      <Modal.Header closeButton>
        <Modal.Title>Add Movement</Modal.Title>
      </Modal.Header>
      <Form role="form" onSubmit={handleSubmit}>
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
                    aria-describedby="SignalAppend"
                    required
                    onChange={(e) => VerifySignal(e, "signo_move")}
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
            <Label>Category</Label>
            <Form.Control as="select" name="catego" onChange={handleChange}>
              <option></option>
              {stateCatego.id != -1000
                ? stateCatego.map((data, index) => {
                    if (data.sub_categoria == data.categoria) {
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
            <Form.Control
              type="datetime-local"
              value={stateform.datetime}
              name="datetime"
              onChange={handleChange}
            ></Form.Control>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button color="danger" onClick={ModNewMoviSate}>
            Close
          </Button>
          <Button type="submit" color="success">
            Add
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalTrans;
