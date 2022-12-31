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
} from "reactstrap";
import { Form, Modal } from "react-bootstrap";
// core components
import Header from "views/components/Headers/Default";
import API from "../../variables/API";
import "../../assets/styles/components/Catego.scss";

import Modaldelete from "../../components/Modals/Delete";
import Alert from "../components/Alert";
import Modaledit from "../../components/Modals/EditEvent";
import ContextMenuCustom from "../../components/ContextMenu";

const Catego = () => {
  /* Declaracion de variables */
  const [contextMenu, setContextMenu] = useState(null);
  const [state, setState] = useState([]);
  const [refreshData, setrefreshData] = useState(false);
  // envio de informacion
  const [stateform, setform] = useState({
    namevent: "",
    endingdate: "",
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
  const [stateCatego, setStateCatego] = useState(false);
  const [stateAlert, setSateAlert] = useState({ visible: false, code: 200 });

  // Funcion para cambiar de estado de los modals
  const ModNewEventSate = () => setshowNewMod(!showNewMod);
  const ModListMove = () => setShowListMove(!showListMove);
  const ModDelCateSate = () => setshowDelMod(!showDelMod);
  const ModEdiEventSate = () => setshowEdiMod(!showEdiMod);
  const ChangeStateCatego = () => setStateCatego(!stateCatego);

  useEffect(() => {
    let idc = localStorage.getItem("IdUser");
    API.post("acount", {
      id: 12,
      idc: idc,
    }).then((response) => {
      //console.log(response.data);
      setState(response.data);
    });
  }, [refreshData]);

  /* ...state para que no se modifique */
  const handleChange = (event) => {
    setform({ ...stateform, [event.target.name]: event.target.value });
  };
  const handleChangeEdit = (event) => {
    setformEdit({ ...stateformEdit, [event.target.name]: event.target.value });
  };

  // Accion al abrir los modals
  const OpenModalNew = (e) => {
    e.preventDefault();
    ModNewEventSate();
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
    if (stateform.namevent === "" || stateform.endingdate === "") {
      setSateAlert({ visible: true, code: 1 });
      setTimeout(() => {
        setSateAlert({ visible: false, code: 0 });
      }, 2000);
    } else {
      let idc = localStorage.getItem("IdUser");
      API.post("add_data", {
        id: 6,
        idu: idc,
        name: stateform.namevent,
        date: stateform.endingdate,
      }).then((response) => {
        //alert(response.data);
        ModNewEventSate();
        ChangeStateCatego();
        setrefreshData(!refreshData);
        setSateAlert({ visible: true, code: response.data });
        setTimeout(() => {
          setSateAlert({ visible: false, code: 0 });
        }, 2000);
      });
    }
  };

  const handleContextMenu = (event, data) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            onClickEdit: (e) =>
              OpenModalEdit(e, data.id, data.nombre, data.fecha_fin),
          }
        : null
    );
  };
  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          {state
            ? state.map((data, index) => (
                <Card
                  className="shadow col-md-12 col-lg-5 mr-2 ml-2 mb-3 arrow c-categorie px-0"
                  key={index}
                  onContextMenu={(e) => handleContextMenu(e, data)}
                >
                  <CardBody
                    className="py-3 rounded px-0"
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
                    onClick={(e) => handleContextMenu(e, data)}
                    className="position-absolute right-4 top-4"
                  >
                    <i className="fa fa-ellipsis-v"></i>
                  </div>
                </Card>
              ))
            : ""}
          <ContextMenuCustom
            contextMenu={contextMenu}
            handleClose={handleClose}
          />
          <Card
            className="shadow col-md-12 col-lg-5 mr-2 ml-2 mb-3 arrow c-categorie px-0"
            onClick={(e) => OpenModalNew(e)}
          >
            <CardBody className="rounded px-0">
              <div className="col">
                <h3 className="card-title col-md-9 col-lg-9 col-xl-9 text-muted m-0">
                  <i className="fas fa-plus mr-2"></i>New Event
                </h3>
              </div>
            </CardBody>
          </Card>
        </Row>
        <div>
          <Alert visible={stateAlert.visible} code={stateAlert.code} />
          <Modal show={showNewMod} id="ModalAdd" onHide={ModNewEventSate}>
            <Modal.Header closeButton>
              <Modal.Title>Creator of event</Modal.Title>
            </Modal.Header>
            <Form role="form" onSubmit={handleSubmit}>
              <Modal.Body>
                <FormGroup>
                  <Label>Name</Label>
                  <Form.Control
                    type="text"
                    name="namevent"
                    required
                    onChange={handleChange}
                  ></Form.Control>
                </FormGroup>
                <FormGroup>
                  <Label>Ending date</Label>
                  <Form.Control
                    type="date"
                    name="endingdate"
                    onChange={handleChange}
                  ></Form.Control>
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button color="danger" onClick={ModNewEventSate}>
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
