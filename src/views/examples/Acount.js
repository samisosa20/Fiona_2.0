import React, { useState, useEffect } from "react";
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Container,
  Row,
  Input,
  FormGroup,
  Label,
  ModalFooter,
} from "reactstrap";
import { Form, Modal, option } from "react-bootstrap";
// core components
import { Header } from "components/Headers/Header.js";
import API from "../../variables/API";
import { Link } from "react-router-dom"; // para navegar entre paginas

function Account() {
  const [state, setState] = useState([]);
  // envio de informacion
  const [stateform, setform] = useState({
    catego: "",
    descrip: "",
    badge: "",
    monto: 0,
    save_account: 0,
  });
  // edicion de informacion
  const [stateformEdit, setformEdit] = useState({
    edit_account: "",
    edit_descrip: "",
    edit_badge: "",
    edit_monto: 0,
    edit_save_account: 0,
    id_data: 0,
  });
  /* Declaracion de estados de los modals */
  const [showNewMod, setshowNewMod] = useState(false);
  const [showDelMod, setshowDelMod] = useState(false);
  const [showEdiMod, setshowEdiMod] = useState(false);
  const [stateAccount, setStateAccount] = useState(false);

  useEffect(() => {
    var idc = sessionStorage.getItem("IdUser");
    API.post("acount", {
      id: 2,
      idc: idc,
    }).then((response) => setState(response.data));
  }, [stateAccount]);

  // Funcion para cambiar de estado de los modals
  const ModNewCateSate = () => setshowNewMod(!showNewMod);
  const ModDelCateSate = () => setshowDelMod(!showDelMod);
  const ModEdiCateSate = () => setshowEdiMod(!showEdiMod);
  const ChangeStateAccount = () => setStateAccount(!stateAccount);

  // Accion al abrir los modals
  const OpenModalNew = (e) => {
    e.preventDefault();
    ModNewCateSate();
  };
  const OpenModalDelete = (e, id, catego) => {
    e.preventDefault();
    setformEdit({
      edit_account: catego,
      edit_descrip: stateformEdit.descrip,
      edit_badge: stateformEdit.group,
      edit_include: stateformEdit.include,
      id_data: id,
    });
    ModDelCateSate();
  };
  const OpenModalEdit = (e, id, catego, descrip, group, monto, include) => {
    e.preventDefault();
    setformEdit({
      edit_account: catego,
      edit_descrip: descrip,
      edit_badge: group,
      edit_include: include,
      edit_monto: monto,
      id_data: id,
    });
    ModEdiCateSate();
    //document.getElementById("edit_badge").value = group;
  };
  // Eliminar data
  const handleDelete = (e, id) => {
    e.preventDefault();
    let idc = sessionStorage.getItem("IdUser");
    API.post("delete_data", {
      id: 2,
      idu: idc,
      id_data: id,
    }).then((response) => {
      alert(response.data);
      ModDelCateSate();
      ChangeStateAccount();
    });
  };
  /* ...state para que no se modifique */
  const handleChange = (event) => {
    setform({ ...stateform, [event.target.name]: event.target.value });
  };
  const handleChangeEdit = (event) => {
    setformEdit({ ...stateformEdit, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (stateform.badge === 0) {
    } else {
      let idc = sessionStorage.getItem("IdUser");
      API.post("add_data", {
        id: 2,
        idu: idc,
        name: stateform.catego,
        descrip: stateform.descrip,
        divisa: stateform.badge,
        monto: stateform.monto,
        save: stateform.save_account,
      }).then((response) => {
        alert(response.data);
        ModNewCateSate();
        ChangeStateAccount();
      });
    }
  };
  const handleSubmitEdit = (event) => {
    event.preventDefault();
    if (stateformEdit.badge === 0) {
    } else {
      let idc = sessionStorage.getItem("IdUser");
      console.log(stateformEdit.edit_include);
      let include = 1;
      if (stateformEdit.edit_include == null) {
        include = 0;
      }
      API.post("edit_data", {
        id: 2,
        id_data: stateformEdit.id_data,
        idu: idc,
        name: stateformEdit.edit_account,
        descrip: stateformEdit.edit_descrip,
        divisa: stateformEdit.edit_badge,
        monto_ini: stateformEdit.edit_monto,
        save_account: include,
      }).then((response) => {
        console.log(response);
        ModEdiCateSate();
        ChangeStateAccount();
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
                <Card className="shadow col-md-5 mr-2 ml-2 mb-3" key={index}>
                  <CardHeader className="border-0">
                    <Row>
                      <div className="col">
                        <h3 className="mb-0">{data.nombre}</h3>
                      </div>
                      {data.cantidad_int < 0 ? (
                        <div className="col justify-content-end text-danger">
                          $ {data.cantidad}
                        </div>
                      ) : (
                        <div className="col justify-content-end text-success">
                          $ {data.cantidad}
                        </div>
                      )}
                    </Row>
                    <Row>
                      <div className="col">Divisas: {data.divisa}</div>
                      <div className="col">
                        {data.cuenta_ahorro === 1 ? "Cuenta Ahorro" : ""}
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody className="mt--4">
                    <Row>
                      <Link
                        to={
                          "/admin/move?acount=" +
                          data.id +
                          "&naco=" +
                          data.nombre
                        }
                      >
                        <Button
                          className="mr-4 shadow"
                          color="success"
                          size="sm"
                        >
                          <i className="ni ni-curved-next"></i>
                        </Button>
                      </Link>
                      <Button
                        className="mr-4 shadow"
                        color="info"
                        size="sm"
                        onClick={(e) =>
                          OpenModalEdit(
                            e,
                            data.id,
                            data.nombre,
                            data.descripcion,
                            data.divisa,
                            data.monto_inicial,
                            data.cuenta_ahorro
                          )
                        }
                      >
                        <i className="ni ni-settings"></i>
                      </Button>
                      <Button
                        className="mr-4 shadow"
                        color="danger"
                        size="sm"
                        onClick={(e) =>
                          OpenModalDelete(e, data.id, data.nombre)
                        }
                      >
                        <i className="far fa-trash-alt"></i>
                      </Button>
                    </Row>
                  </CardBody>
                </Card>
              ))
            : ""}
          <Card
            className="shadow col-md-5 mr-2 ml-2 mb-3"
            onClick={(e) => OpenModalNew(e)}
          >
            <CardBody style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              <Row>
                <div className="col" style={{ marginTop: 20 }}>
                  <h3 className="card-title col-md-9 col-lg-9 col-xl-9 text-muted">
                    <i className="fas fa-plus mr-2"></i>New Account
                  </h3>
                </div>
                <div className="col">
                  <i className="fas fa-chevron-right float-right mt-3 ml-2 fa-2x"></i>
                </div>
              </Row>
            </CardBody>
          </Card>
        </Row>
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
                <Label>Badge</Label>
                <Form.Control
                  as="select"
                  name="badge"
                  required
                  onChange={handleChange}
                >
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
        <Modal show={showDelMod} id="ModalDelete" onHide={ModDelCateSate}>
          <Modal.Header closeButton>
            <Modal.Title>Delete category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {"Are you sure delete the account " +
              stateformEdit.edit_account +
              "?"}
          </Modal.Body>
          <ModalFooter>
            <Button color="secundary" onClick={ModDelCateSate}>
              Cancel
            </Button>
            <Button
              type="submit"
              color="danger"
              onClick={(e) => handleDelete(e, stateformEdit.id_data)}
            >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
        <Modal show={showEdiMod} id="ModalEdit" onHide={ModEdiCateSate}>
          <Modal.Header closeButton>
            <Modal.Title>Editor of category</Modal.Title>
          </Modal.Header>
          <Form role="form" onSubmit={handleSubmitEdit}>
            <Modal.Body>
              <FormGroup>
                <Label>Name</Label>
                <Form.Control
                  type="text"
                  name="edit_catego"
                  defaultValue={stateformEdit.edit_account}
                  required
                  onChange={handleChangeEdit}
                ></Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Form.Control
                  as="textarea"
                  name="edit_descrip"
                  rows="3"
                  defaultValue={stateformEdit.edit_descrip}
                  onChange={handleChangeEdit}
                ></Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>Badge</Label>
                <Form.Control
                  as="select"
                  name="edit_badge"
                  required
                  onChange={handleChangeEdit}
                  defaultValue={stateformEdit.edit_badge}
                >
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
                  name="edit_monto"
                  pattern="[0-9]{0,5}"
                  defaultValue={stateformEdit.edit_monto}
                  type="number"
                  onChange={handleChangeEdit}
                />
              </FormGroup>
              <FormGroup>
                <Form.Check
                  type="checkbox"
                  label="Saving account"
                  value="1"
                  defaultChecked={stateformEdit.edit_include}
                  onChange={handleChangeEdit}
                  name="edit_save_account"
                  id="edit_save_account"
                />
              </FormGroup>
            </Modal.Body>
            <ModalFooter>
              <Button color="danger" onClick={ModEdiCateSate}>
                Close
              </Button>
              <Button type="submit" color="success">
                Save Changes
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Container>
    </>
  );
}

export default Account;
