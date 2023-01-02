import React, { useState } from "react";
// node.js library that concatenates classes (strings)
//import classnames from "classnames";
// javascipt plugin for creating charts
import {
  ChartIncoming,
  ChartExpense,
  ChartSaving,
} from "variables/charts";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Input,
  Col,
  FormGroup,
  Label,
} from "reactstrap";
import { Form, InputGroup, Modal } from "react-bootstrap";
import API from "variables/API";
import axios from "axios";

import Header from "views/components/Headers/Default";

function Dashboard() {
  /* Declaracion de estados de los modals */
  const [showNewMod, setshowNewMod] = useState(false);
  const [showNewTransMod, setshowNewTransMod] = useState(false);
  let idc = localStorage.getItem("IdUser");
  const [stateCatego, setCatego] = useState([]);
  const [stateAcount, setAcount] = useState([]);
  const [stateSignal, setSignal] = useState({ Signal: "+" });
  // envio de informacion
  const [stateform, setform] = useState({
    monto: 0,
    badge: "COP",
    acount: "",
    catego: 0,
    descrip: "",
    datetime: "",
  });
  const [stateformtrans, setformtrans] = useState({
    monto: 0,
    badge: "COP",
    account_ini: 0,
    account_fin: 0,
    datetime: "",
    descrip: "",
  });

  // Funcion para cambiar de estado de los modals
  const ModNewMoviSate = () => setshowNewMod(!showNewMod);
  const ModNewTransSate = () => setshowNewTransMod(!showNewTransMod);
  // Accion al abrir los modals
  const OpenModalMovi = (e) => {
    e.preventDefault();
    axios
      .all([
        API.post(`acount`, {
          id: 5,
          idc: idc,
        }),
        API.post(`acount`, {
          id: 2,
          idc: idc,
        }),
      ])
      .then(
        axios.spread((firstResponse, secondResponse) => {
          setCatego(firstResponse.data);
          setAcount(secondResponse.data);
        })
      );
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
    setform({ ...stateform, datetime: formattedDateTime });
    ModNewMoviSate();
  };
  const OpenModalTrans = (e) => {
    e.preventDefault();
    API.post("acount", {
      id: 2,
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
    setformtrans({ ...stateformtrans, datetime: formattedDateTime });
    ModNewTransSate();
  };
  /* ...state para que no se modifique */
  const handleChange = (event) => {
    setform({ ...stateform, [event.target.name]: event.target.value });
  };
  const handleChangeTrans = (event) => {
    setformtrans({
      ...stateformtrans,
      [event.target.name]: event.target.value,
    });
  };
  const VerifySignal = (event, idSigno) => {
    let signo = document.getElementById(idSigno);

    if (event.target.value < 0) {
      if (idSigno !== "") {
        setSignal({ Signal: "-" });
        signo.className = "btn btn-outline-danger";
      }
      event.target.value = event.target.value * -1;
    }
    if (idSigno === "signo_move") {
      setform({ ...stateform, [event.target.name]: event.target.value });
    } else {
      setformtrans({
        ...stateformtrans,
        [event.target.name]: event.target.value,
      });
    }
  };
  const ChangeSignal = (event) => {
    setSignal({ Signal: event.target.value !== "+" ? "+" : "-" });
    if (event.target.value !== "+") {
      event.target.className = "btn btn-outline-success";
    } else {
      event.target.className = "btn btn-outline-danger";
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      stateform.badge === "" ||
      stateform.catego === 0 ||
      stateform.acount === ""
    ) {
      alert("Fill in all the fields");
    } else {
      document.getElementById("btn_new_move_dash").disabled = true;
      document.getElementById("btn_new_move_dash").innerHTML =
        "<span class='spinner-border spinner-border-sm mr-1'" +
        "role='status' aria-hidden='true'></span>Loading...";
      let valor = stateform.monto;
      if (document.getElementById("signo_move").value === "-") {
        valor = valor * -1;
      }
      let idc = localStorage.getItem("IdUser");
      API.post("add_data", {
        id: 3,
        idu: idc,
        accoun: stateform.acount,
        value: valor,
        divisa: stateform.badge,
        catego: stateform.catego,
        descrip: stateform.descrip,
        date: stateform.datetime,
      }).then((response) => {
        //alert (response.data);
        ModNewMoviSate();
        document.getElementById("btn_new_move_dash").innerHTML = "Add";
        document.getElementById("btn_new_move_dash").disabled = false;
      });
    }
  };
  const handleSubmit_trans = (event) => {
    event.preventDefault();
    if (
      stateformtrans.badge === "" ||
      stateformtrans.account_fin === 0 ||
      stateformtrans.account_ini === 0 ||
      stateformtrans.monto === 0
    ) {
      alert("Fill in all the fields");
    } else {
      document.getElementById("btn_new_trans_dash").disabled = true;
      document.getElementById("btn_new_trans_dash").innerHTML =
        "<span class='spinner-border spinner-border-sm mr-1'" +
        "role='status' aria-hidden='true'></span>Loading...";
      let idc = localStorage.getItem("IdUser");
      API.post("add_data", {
        id: 4,
        idu: idc,
        acco_frist: stateformtrans.account_ini,
        value: stateformtrans.monto,
        divisa: stateformtrans.badge,
        acco_sec: stateformtrans.account_fin,
        descri: stateformtrans.descrip,
        date: stateformtrans.datetime,
      }).then((response) => {
        //alert (response.data);
        ModNewTransSate();
        document.getElementById("btn_new_trans_dash").innerHTML = "Add";
        document.getElementById("btn_new_trans_dash").disabled = false;
      });
    }
  };
  return (
    <>
      <Header /> {/*incrusta el header*/}
      <Container className="mt--7" fluid>
        <div className="col justify-content-end row">
          <Button className="btn-info mb-3" onClick={(e) => OpenModalMovi(e)}>
            <i className="fas fa-plus mr-2"></i>
            Move
          </Button>
          <Button
            className="btn-success mb-3"
            onClick={(e) => OpenModalTrans(e)}
          >
            <i className="fas fa-exchange-alt mr-2"></i>
            Transfer
          </Button>
        </div>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Grafica de torta
                    </h6>
                    <h2 className="text-white mb-0">Ingresos</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <ChartIncoming />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Grafica de torta
                    </h6>
                    <h2 className="text-white mb-0">Egresos</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <ChartExpense />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Grafica de torta
                    </h6>
                    <h2 className="text-white mb-0">Ahorros</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <ChartSaving />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Page name</th>
                    <th scope="col">Visitors</th>
                    <th scope="col">Unique users</th>
                    <th scope="col">Bounce rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">/argon/</th>
                    <td>4,569</td>
                    <td>340</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/index.html</th>
                    <td>3,985</td>
                    <td>319</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/charts.html</th>
                    <td>3,513</td>
                    <td>294</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      36,49%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/tables.html</th>
                    <td>2,050</td>
                    <td>147</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/profile.html</th>
                    <td>1,795</td>
                    <td>190</td>
                    <td>
                      <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
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
                        step={0.01}
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
                <Label>Acount</Label>
                <Form.Control as="select" name="acount" onChange={handleChange}>
                  <option></option>
                  {stateAcount.id !== -1000
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
        <Modal show={showNewTransMod} id="ModalTrans" onHide={ModNewTransSate}>
          <Modal.Header closeButton>
            <Modal.Title>Add Transfer</Modal.Title>
          </Modal.Header>
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
                  defaultValue="2020-01-01T12:00:00"
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
        </Modal>
      </Container>
    </>
  );
}
export default Dashboard;
