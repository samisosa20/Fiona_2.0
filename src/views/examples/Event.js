import React, { useState, useEffect } from "react";
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
import { Form, Modal, ProgressBar} from "react-bootstrap";
// core components
import { Header } from "components/Headers/Header.js";
import API from "../../variables/API";
import { Link } from "react-router-dom";
import '../../assets/styles/components/Catego.scss';

import Modaldelete from "../../components/Modals/Delete";
import Alert from "../../components/Alert";
import Modaledit from "../../components/Modals/Edit";


const Catego = () => {
  /* Declaracion de variables */
  const [state, setState] = useState([]);
  const [refreshData, setrefreshData] = useState(false);
  // envio de informacion
  const [stateform, setform] = useState({
    namevent: "",
    endingdate: ""
  });
  // edicion de informacion
  const [stateformEdit, setformEdit] = useState({
    edit_namevent: "",
    edit_endingdate: "",
    edit_group: 0,
    edit_include: 0,
    id_data: 0,
});

  /* Declaracion de estados de los modals */
  const [showNewMod, setshowNewMod] = useState(false);
  const [showDelMod, setshowDelMod] = useState(false);
  const [showEdiMod, setshowEdiMod] = useState(false);
  const [stateCatego, setStateCatego] = useState(false);
  const [stateAlert, setSateAlert] = useState({visible: false, code: 200})


  // Funcion para cambiar de estado de los modals
  const ModNewEventSate = () => setshowNewMod(!showNewMod);
  const ModDelCateSate = () => setshowDelMod(!showDelMod);
  const ModEdiCateSate = () => setshowEdiMod(!showEdiMod);
  const ChangeStateCatego = () => setStateCatego(!stateCatego);

  useEffect(() => {
    let url = window.location.href;
    let div = url.split("#");
    let lvl = div[1];
    let idc = sessionStorage.getItem("IdUser");
    API.post("acount", {
      id: 12,
      idc: idc
    }).then((response) => setState(response.data));
  },[refreshData]);

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
  const OpenModalEdit = (e, id, catego, descrip, group, include) => {
    e.preventDefault();
    setformEdit({
      edit_categor: catego,
      edit_descrip: descrip,
      edit_group: group,
      edit_include: include,
      id_data: id,
    });
    ModEdiCateSate();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (stateform.namevent === "" ||
      stateform.endingdate === "") {
      setSateAlert({visible: true, code: 1})
        setTimeout(() => {
          setSateAlert({visible: false, code: 0})
        }, 2000);
    } else {
      let idc = sessionStorage.getItem("IdUser");
      API.post("add_data", {
        id: 6,
        idu: idc,
        name: stateform.namevent,
        date: stateform.endingdate
      }).then((response) => {
        //alert(response.data);
        ModNewEventSate();
        ChangeStateCatego();
        setrefreshData(!refreshData);
        setSateAlert({visible: true, code: response.data})
        setTimeout(() => {
          setSateAlert({visible: false, code: 0})
        }, 2000);
      });
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
        {state
            ? state.map((data, index) => (
                <Card className="shadow col-md-12 col-lg-5 mr-2 ml-2 mb-3 arrow c-categorie" key={index}>
                  <CardBody
                    className="card-body"
                  >
                    <Row>
                      <div className="col-11 mt-1">
                        <h3 className="card-title col-md-9 col-lg-9 col-xl-9 text-dark m-0">
                          {data.nombre}
                        </h3>
                        <h4 className="card-title col-md-9 col-lg-9 col-xl-9 text-muted m-0">
                          Spent <span className="text-dark float-right">{data.valor}</span>
                        </h4>
                      </div>
                      <div className="col-1">
                        <i className="fas fa-chevron-right float-right mt-2 ml-2 fa-2x"></i>
                     </div>
                    </Row>
                  </CardBody>
                </Card>
              ))
            : ""}
          <Card
            className="shadow col-md-12 col-lg-5 mr-2 ml-2 mb-3 arrow"
            onClick={(e) => OpenModalNew(e)}
          >
            <CardBody className="card-body">
              <Row>
                <div className="col">
                  <h3 className="card-title col-md-9 col-lg-9 col-xl-9 text-muted">
                    <i className="fas fa-plus mr-2"></i>New Event
                  </h3>
                </div>
                <div className="col">
                  <i className="fas fa-chevron-right float-right mt-3 mt-xl-0 ml-2 fa-2x"></i>
                </div>
              </Row>
            </CardBody>
          </Card>
        </Row>
        <div>
          <Alert
          visible={stateAlert.visible}
          code={stateAlert.code}/>
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
            action = "catego"
            title="Delete category"
            message={"Are you sure delete the category " + stateformEdit.edit_categor + "?"}
            refreshData={refreshData}
            setrefreshData={setrefreshData}
            state={stateformEdit}
            showDelMod={showDelMod}
            setshowDelMod={setshowDelMod}
            setSateAlert={setSateAlert}
          />
          <Modaledit
            title="Edit category"
            refreshData={refreshData}
            setrefreshData={setrefreshData}
            stateformEdit={stateformEdit}
            setformEdit={setformEdit}
            showEdiMod={showEdiMod}
            setshowEdiMod={setshowEdiMod}
            setSateAlert={setSateAlert}
            handle={handleChangeEdit}
            listCategorie={state}
          />
        </div>
      </Container>
    </>
  );
}

export default Catego;
