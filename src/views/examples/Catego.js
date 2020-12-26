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
import { Form, Modal} from "react-bootstrap";
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
  const [state, setState] = useState({ jsonCatego: [], lvl: 0 });
  const [refreshData, setrefreshData] = useState(false);
  // envio de informacion
  const [stateform, setform] = useState({
    catego: "",
    descrip: "",
    group: 0,
    include: 0,
  });
  // edicion de informacion
  const [stateformEdit, setformEdit] = useState({
    edit_categor: "",
    edit_descrip: "",
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
  const ModNewCateSate = () => setshowNewMod(!showNewMod);
  const ModDelCateSate = () => setshowDelMod(!showDelMod);
  const ModEdiCateSate = () => setshowEdiMod(!showEdiMod);
  const ChangeStateCatego = () => setStateCatego(!stateCatego);

  useEffect(() => {
    let url = window.location.href;
    let div = url.split("#");
    let lvl = div[1];
    let idc = sessionStorage.getItem("IdUser");
    API.post("acount", {
      id: 4,
      idc: idc,
      lvl: lvl,
    }).then((response) => setState({ jsonCatego: response.data, lvl: lvl }));
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
    ModNewCateSate();
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
    if (stateform.group === 0) {
    } else {
      let idc = sessionStorage.getItem("IdUser");
      API.post("add_data", {
        id: 1,
        idu: idc,
        name: stateform.catego,
        descrip: stateform.descrip,
        group: stateform.group,
        catego: stateform.include,
      }).then((response) => {
        //alert(response.data);
        ModNewCateSate();
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
          {state.lvl !== undefined ? (
            <Card className="shadow col-md-5 mr-2 ml-2 mb-3">
              <Link to={"/admin/catego"} onClick={() => setrefreshData(!refreshData)}>
                <CardBody className="card-body">
                  <Row>
                    <div className="col" style={{ marginTop: 20 }}>
                      <h3 className="card-title col-md-9 col-lg-9 col-xl-9 text-muted">
                        ..
                      </h3>
                    </div>
                    <div className="col">
                      <i className="fas fa-chevron-right float-right mt-3 ml-2 fa-2x text-muted"></i>
                    </div>
                  </Row>
                </CardBody>
              </Link>
            </Card>
          ) : (
            ""
          )}
          {state.jsonCatego.id !== -1000
            ? state.jsonCatego.map((data, index) => (
                <Card className="shadow col-md-5 mr-2 ml-2 mb-3 arrow c-categorie" key={index}>
                  <CardBody
                    className="card-body"
                  >
                    <Row>
                      <Link
                        to={"/admin/catego#" + data.id}
                        className="col"
                        style={{ marginTop: 20 }}
                        onClick={() => setrefreshData(!refreshData)}
                      >
                        <h3 className="card-title col-md-9 col-lg-9 col-xl-9">
                          {data.categoria}
                        </h3>
                      </Link>
                      <div className="col">
                        <i className="fas fa-chevron-right float-right mt-3 ml-2 fa-2x"></i>
                        <i
                          className="fas fa-trash-alt float-right mt-4 text-danger arrow"
                          onClick={(e) =>
                            OpenModalDelete(e, data.id, data.categoria)
                          }
                        ></i>
                        <i
                          className="far fa-edit float-right mr-1 mt-4 text-primary arrow"
                          onClick={(e) =>
                            OpenModalEdit(
                              e,
                              data.id,
                              data.categoria,
                              data.descripcion,
                              data.grupo,
                              data.sub_categoria
                            )
                          }
                        ></i>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              ))
            : ""}
          <Card
            className="shadow col-md-5 mr-2 ml-2 mb-3 arrow"
            onClick={(e) => OpenModalNew(e)}
          >
            <CardBody className="card-body">
              <Row>
                <div className="col">
                  <h3 className="card-title col-md-9 col-lg-9 col-xl-9 text-muted">
                    <i className="fas fa-plus mr-2"></i>New Category
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
          <Modal show={showNewMod} id="ModalAdd" onHide={ModNewCateSate}>
            <Modal.Header closeButton>
              <Modal.Title>Creator of category</Modal.Title>
            </Modal.Header>
            <Form role="form" onSubmit={handleSubmit}>
              <Modal.Body>
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
                  <Label>Group</Label>
                  <Form.Control
                    as="select"
                    name="group"
                    required
                    onChange={handleChange}
                    defaultValue="0"
                  >
                    <option value="0" disabled>
                      Select one option
                    </option>
                    <option value="1">Fixed costs</option>
                    <option value="2">Personal expenses</option>
                    <option value="3">Savings</option>
                    <option value="4">Income</option>
                  </Form.Control>
                </FormGroup>
                <FormGroup>
                  <Label>Include inside other category</Label>
                  <Form.Control
                    as="select"
                    name="include"
                    onChange={handleChange}
                  >
                    <option></option>
                    {state.jsonCatego.id !== -1000
                      ? state.jsonCatego.map((data, index) => (
                          <option key={index} value={data.id}>
                            {data.categoria}
                          </option>
                        ))
                      : ""}
                  </Form.Control>
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button color="danger" onClick={ModNewCateSate}>
                  Close
                </Button>
                <Button type="submit" color="success">
                  Save Changes
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
