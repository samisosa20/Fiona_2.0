import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  FormGroup,
  Label,
  Button,
  Input
} from "reactstrap";
import { Form, Modal, InputGroup } from "react-bootstrap";

import API from "../../variables/API";
import axios from "axios";

// core components
import { Header } from "components/Headers/Header.js";
import "../../assets/styles/components/Catego.scss";

import Modaldelete from "../../components/Modals/Delete";
import Alert from "../../components/Alert";
import Modaledit from "../../components/Modals/EditEvent";
import ContextMenuCustom from "../../components/ContextMenu";

const Catego = () => {
  /* Declaracion de variables */
  const [contextMenu, setContextMenu] = useState(null);
  const [state, setState] = useState([]);
  const [refreshData, setrefreshData] = useState(false);
  const [stateSignal, setSignal] = useState({ Signal: "+" });
  const [stateAcount, setAcount] = useState([]);
  // envio de informacion
  const [stateform, setform] = useState({
    catego: "",
    descrip: "",
    badge: "COP",
    monto: 0,
    frequency: '0',
    recurrency: '',
    startDate: null,
    endDate: null
  });
  // edicion de informacion
  const [stateformEdit, setformEdit] = useState({
    edit_namevent: "",
    prevName: "",
    edit_endingdate: "",
    id_data: 0,
  });
  // edicion de informacion
  const [listMove, setlistMove] = useState({});

  /* Declaracion de estados de los modals */
  const [showNewMod, setshowNewMod] = useState(false);
  const [showDelMod, setshowDelMod] = useState(false);
  const [showEdiMod, setshowEdiMod] = useState(false);
  const [showListMove, setShowListMove] = useState(false);
  const [stateCatego, setCatego] = useState([]);
  const [stateAlert, setSateAlert] = useState({ visible: false, code: 200 });

  // Funcion para cambiar de estado de los modals
  const ModNewPlannedSate = () => setshowNewMod(!showNewMod);
  const ModListMove = () => setShowListMove(!showListMove);
  const ModDelCateSate = () => setshowDelMod(!showDelMod);
  const ModEdiEventSate = () => setshowEdiMod(!showEdiMod);

  useEffect(() => {
    let idc = localStorage.getItem("IdUser");
    API.post("acount", {
      id: 15,
      idc: idc,
    }).then((response) => {
      //console.log(response.data);
      setState(response.data);
    });
    setform({...stateform, startDate: `${new Date().getFullYear()}-${`${
      new Date().getMonth() + 1
    }`.padStart(2, 0)}-${`${new Date().getDate()}`.padStart(
      2,
      0
    )}`})
  }, [refreshData]);

  const handleChange = (event) => {
    setform({ ...stateform, [event.target.name]: event.target.value });
  };
  const handleChangeEdit = (event) => {
    setformEdit({ ...stateformEdit, [event.target.name]: event.target.value });
  };

  const OpenModalNew = (e) => {
    e.preventDefault();
    let idc = localStorage.getItem("IdUser");
    axios
      .all([
        API.post(`acount`, {
          id: 5,
          idc: idc
        }),
        API.post(`acount`, {
          id: 2,
          idc: idc
        })
      ])
      .then(
        axios.spread((firstResponse, secondResponse) => {
          setCatego(firstResponse.data);
          setAcount(secondResponse.data);
        })
      );
    ModNewPlannedSate();
  };
  const OpenModalDelete = (e, id, catego) => {
    e.preventDefault();
    setformEdit({
      edit_categor: catego,
      edit_descrip: stateformEdit.edit_descrip,
      edit_group: stateformEdit.edit_group,
      edit_include: stateformEdit.edit_include,
      id_data: id,
    });
    ModDelCateSate();
  };
  const OpenModalEdit = (e, id, name, endDate) => {
    e.preventDefault();
    setformEdit({
      edit_namevent: name,
      prevName: name,
      edit_endingdate: endDate,
      id_data: id,
    });
    ModEdiEventSate();
  };
  const openListModal = (event) => {
    let idc = localStorage.getItem("IdUser");
    API.post("acount", {
      id: 13,
      idc: idc,
      event: event,
    }).then((response) => {
      ModListMove();
      setlistMove(response.data);
      //console.log(response.data);
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (stateform.startDate === "" || stateform.account === "" || stateform.value === "" || stateform.category === "") {
      setSateAlert({ visible: true, code: 1 });
      setTimeout(() => {
        setSateAlert({ visible: false, code: 0 });
      }, 2000);
    } else {
      API.post("add_data", {
        id: 9,
        idu: localStorage.getItem("IdUser"),
        value: stateform.value,
        badge: stateform.badge,
        account: stateform.account,
        category: stateform.category,
        startDate: stateform.startDate,
        frequency: stateform.frequency,
        recurrency: stateform.recurrency,
        endDate: stateform.endDate,
      }).then((response) => {
        //alert(response.data);
        ModNewPlannedSate();
        setrefreshData(!refreshData);
        setSateAlert({ visible: true, code: response.data });
        setTimeout(() => {
          setSateAlert({ visible: false, code: 0 });
        }, 2000);
      });
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null
    );
  };
  const handleClose = () => {
    setContextMenu(null);
  };
  const ChangeSignal = event => {
    setSignal({ Signal: event.target.value !== "+" ? "+" : "-" });
    if (event.target.value !== "+") {
      event.target.className = "btn btn-outline-success";
    } else {
      event.target.className = "btn btn-outline-danger";
    }
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
    setform({ ...stateform, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          {state
            ? state.map((data, index) => (
                <Card
                  className="shadow col-md-12 col-lg-5 mr-2 ml-2 mb-3 arrow c-categorie"
                  key={index}
                  onContextMenu={handleContextMenu}
                >
                  <CardBody
                    className="py-3 rounded"
                    onClick={() => openListModal(data.id)}
                  >
                    <div className="col-10 mt-1">
                      <h3 className="card-title col-md-9 col-lg-9 col-xl-9 text-dark m-0">
                        {data.nombre}{" "}
                        {data.activo === "0" && (
                          <span className="text-gray text-sm float-right">
                            inactive
                          </span>
                        )}
                      </h3>
                      <h4 className="card-title col-md-9 col-lg-9 col-xl-9 text-muted m-0">
                        Spent{" "}
                        <span className="text-dark float-right">
                          <NumberFormat
                            className={
                              data.valor >= 0 ? `text-success` : `text-danger`
                            }
                            value={data.valor ? data.valor : 0}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </span>
                      </h4>
                    </div>
                  </CardBody>
                  <div
                    onClick={handleContextMenu}
                    className="position-absolute right-4 top-4"
                  >
                    <i className="fa fa-ellipsis-v"></i>
                  </div>
                  <ContextMenuCustom
                    contextMenu={contextMenu}
                    handleClose={handleClose}
                    onClickEdit={(e) =>
                      OpenModalEdit(e, data.id, data.nombre, data.fecha_fin)
                    }
                  />
                </Card>
              ))
            : ""}
          <Card
            className="shadow col-md-12 col-lg-5 mr-2 ml-2 mb-3 arrow c-categorie"
            onClick={(e) => OpenModalNew(e)}
          >
            <CardBody className="rounded">
              <div className="col">
                <h3 className="card-title col-md-9 col-lg-9 col-xl-9 text-muted m-0">
                  <i className="fas fa-plus mr-2"></i>New Planned Payment
                </h3>
              </div>
            </CardBody>
          </Card>
        </Row>
        <div>
          <Alert visible={stateAlert.visible} code={stateAlert.code} />
          <Modal show={showNewMod} id="ModalAdd" onHide={ModNewPlannedSate}>
            <Modal.Header closeButton>
              <Modal.Title>Creator of planned payment</Modal.Title>
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
                  <Form.Control
                    as="select"
                    name="acount"
                    onChange={handleChange}
                  >
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
                  <Form.Control
                    as="select"
                    name="catego"
                    onChange={handleChange}
                  >
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
                  <Label>Frequency</Label>
                  <Form.Control
                    as="select"
                    name="frequency"
                    onChange={handleChange}
                  >
                    <option value="0">One time</option>
                    <option value="1">Recurrent payment</option>
                  </Form.Control>
                </FormGroup>
                <FormGroup>
                  <Label>{stateform.frequency === "0" ? 'Date' : 'Start date'}</Label>
                  <Input
                    type="date"
                    name="startDate"
                    defaultValue={stateform.startDate}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup hidden={stateform.frequency === "0"}>
                  <Label>Recurrency</Label>
                  <Form.Control
                    as="select"
                    name="recurrency"
                    onChange={handleChange}
                    defaultValue={stateform.recurrency}
                  >
                    <option value="" hidden>Set recurrence</option>
                    <option value="0.1">Daily</option>
                    <option value="0.7">Weekly</option>
                    <option value="0.15">Biweekly</option>
                    <option value="1">Monthly</option>
                    <option value="2">Bimonthly</option>
                    <option value="3">Trimestraly</option>
                    <option value="4">Quarterly</option>
                    <option value="6">Biannual</option>
                    <option value="12">Yearly</option>
                  </Form.Control>
                </FormGroup>
                <FormGroup hidden={stateform.frequency === "0"}>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button color="danger" onClick={ModNewPlannedSate}>
                  Close
                </Button>
                <Button type="submit" color="success">
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
          <Modaldelete
            action="event"
            title="Delete event"
            message={
              "Are you sure delete the event " +
              stateformEdit.edit_categor +
              "?"
            }
            refreshData={refreshData}
            setrefreshData={setrefreshData}
            state={stateformEdit}
            showDelMod={showDelMod}
            setshowDelMod={setshowDelMod}
            setSateAlert={setSateAlert}
          />
          <Modaledit
            title="Edit event"
            refreshData={refreshData}
            setrefreshData={setrefreshData}
            stateformEdit={stateformEdit}
            setformEdit={setformEdit}
            showEdiMod={showEdiMod}
            setshowEdiMod={setshowEdiMod}
            setSateAlert={setSateAlert}
            handle={handleChangeEdit}
            OpenModalDelete={OpenModalDelete}
          />
          <Modal show={showListMove} onHide={ModListMove}>
            <Modal.Header closeButton>
              <Modal.Title>movement list</Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-2">
              {listMove.length > 0 ? (
                listMove.map((v, i) => (
                  <Card className="p-3 mb-2" key={i}>
                    <h3>
                      {v.categoria}
                      <span className="float-right">{v.cuenta}</span>
                    </h3>
                    <h4>
                      <NumberFormat
                        value={v.valor}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                      <span className="float-right">{v.fecha}</span>
                    </h4>
                    <h5 className="m-0">Description:</h5>
                    <p>{v.descripcion}</p>
                  </Card>
                ))
              ) : (
                <h3 className="mb-0 text-center">Without Movement</h3>
              )}
            </Modal.Body>
          </Modal>
        </div>
      </Container>
    </>
  );
};

export default Catego;
