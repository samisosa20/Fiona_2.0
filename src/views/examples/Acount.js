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
import { Form, Modal, InputGroup } from "react-bootstrap";
// core components
import { Header } from "components/Headers/Header.js";
import API from "../../variables/API";
import axios from "axios";
import { Link } from "react-router-dom"; // para navegar entre paginas
import FormAccount from "components/Form/FormTransfer";
import FormEditor from "components/Form/FormEditor";

function Account() {
  const [state, setState] = useState([]);
  // envio de informacion
  const [stateform, setform] = useState({
    catego: "",
    descrip: "",
    badge: "COP",
    monto: 0,
    save_account: false,
  });
  // edicion de informacion
  const [stateformEdit, setformEdit] = useState({
    edit_account: "",
    edit_descrip: "",
    edit_badge: "",
    edit_monto: false,
    edit_save_account: 0,
    id_data: 0,
  });
  /* Declaracion de estados de los modals */
  const [showNewMod, setshowNewMod] = useState(false);
  const [showNewModMovi, setshowNewModMovie] = useState(false);
  const [showDelMod, setshowDelMod] = useState(false);
  const [showEdiMod, setshowEdiMod] = useState(false);
  const [stateAccount, setStateAccount] = useState(false);
  const [showNewTransMod, setshowNewTransMod] = useState(false);
  const [stateCatego, setCatego] = useState([]);
  const [stateAcount, setAcount] = useState([]);
  const [stateSignal, setSignal] = useState({ Signal: "+" });
  const [stateformtrans, setformtrans] = useState({
    monto: 0,
    badge: "COP",
    account_ini: 0,
    account_fin: 0,
    datetime: "",
    descrip: "",
  });

  useEffect(() => {
    var idc = sessionStorage.getItem("IdUser");
    API.post("acount", {
      id: 2,
      idc: idc,
    }).then((response) => {
      setState(response.data);
    });
  }, [stateAccount, showNewModMovi, showNewTransMod]);

  // Funcion para cambiar de estado de los modals
  const ModNewCateSate = () => setshowNewMod(!showNewMod);
  const ModDelCateSate = () => setshowDelMod(!showDelMod);
  const ModEdiCateSate = () => setshowEdiMod(!showEdiMod);
  const ChangeStateAccount = () => setStateAccount(!stateAccount);
  const ModNewMoviSate = () => setshowNewModMovie(!showNewModMovi);
  const ModNewTransSate = () => setshowNewTransMod(!showNewTransMod);

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
    include = include === "1" ? true : false;
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
  const handleChangeTrans = (event) => {
    setformtrans({
      ...stateformtrans,
      [event.target.name]: event.target.value,
    });
  };
  const OpenModalMovi = (e) => {
    e.preventDefault();
    let idc = sessionStorage.getItem("IdUser");
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
    let idc = sessionStorage.getItem("IdUser");
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
    console.log(event.target.name === "edit_save_account");
    if (event.target.name === "edit_save_account") {
      setform({ ...stateform, save_account: event.target.checked });
    } else {
      setform({ ...stateform, [event.target.name]: event.target.value });
    }
  };
  const handleChangeEdit = (event) => {
    if (event.target.name === "edit_save_account") {
      setformEdit({ ...stateformEdit, edit_include: event.target.checked });
    } else {
      setformEdit({
        ...stateformEdit,
        [event.target.name]: event.target.value,
      });
    }
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
        ModNewCateSate();
        ChangeStateAccount();
        let idAlert;
        if (response.data === 200) {
          idAlert = "alert-200";
        } else {
          idAlert = "alert-400";
        }
        document.querySelector(`#${idAlert}`).classList.remove("d-none");
        setTimeout(() => {
          document.querySelector(`#${idAlert}`).classList.add("d-none");
        }, 2000);
      });
    }
  };
  const handleSubmitMovi = (event) => {
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
        "<span className='spinner-border spinner-border-sm mr-1'" +
        "role='status' aria-hidden='true'></span>Loading...";
      let valor = stateform.monto;
      if (document.getElementById("signo_move").value === "-") {
        valor = valor * -1;
      }
      let idc = sessionStorage.getItem("IdUser");
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
        let idAlert;
        if (response.data === 200) {
          idAlert = "alert-200";
        } else {
          idAlert = "alert-400";
        }
        document.querySelector(`#${idAlert}`).classList.remove("d-none");
        setTimeout(() => {
          document.querySelector(`#${idAlert}`).classList.add("d-none");
        }, 2000);
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
        "<span className='spinner-border spinner-border-sm mr-1'" +
        "role='status' aria-hidden='true'></span>Loading...";
      let idc = sessionStorage.getItem("IdUser");
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
        let idAlert;
        if (response.data === 200) {
          idAlert = "alert-200";
        } else {
          idAlert = "alert-400";
        }
        document.querySelector(`#${idAlert}`).classList.remove("d-none");
        setTimeout(() => {
          document.querySelector(`#${idAlert}`).classList.add("d-none");
        }, 2000);
      });
    }
  };
  const handleSubmitEdit = (event) => {
    event.preventDefault();
    if (stateformEdit.badge === 0) {
    } else {
      let idc = sessionStorage.getItem("IdUser");
      let include;
      if (stateformEdit.edit_include === false) {
        include = 0;
      } else {
        include = 1;
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
        let idAlert;
        if (response.data === 200) {
          idAlert = "alert-200";
        } else {
          idAlert = "alert-400";
        }
        document.querySelector(`#${idAlert}`).classList.remove("d-none");
        setTimeout(() => {
          document.querySelector(`#${idAlert}`).classList.add("d-none");
        }, 2000);
      });
    }
  };
  return (
    <>
      <Header />
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
                        {data.cuenta_ahorro === "1" ? "Saving Acount" : ""}
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
                          className="mr-4 shadow btn-circle"
                          color="success"
                          size="sm"
                        >
                          <i className="ni ni-curved-next"></i>
                        </Button>
                      </Link>
                      <Button
                        className="mr-4 shadow btn-circle"
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
                        className="mr-4 shadow btn-circle"
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
                  <h3 className="card-title col-md-11 col-lg-11 col-xl-11 text-muted pt-3">
                    <i className="fas fa-plus mr-2"></i>New Account
                  </h3>
                </div>
                <div className="col pt-3">
                  <i className="fas fa-chevron-right float-right mt-3 ml-2 fa-2x"></i>
                </div>
              </Row>
            </CardBody>
          </Card>
        </Row>
        <div
          className="alert bg-success-lighten-20 fixed-bottom mx-auto col-3 mb-2 text-dark d-none"
          id="alert-200"
          role="alert"
        >
          <i className="far fa-check-circle mr-5"></i>
          Data save success!
        </div>
        <div
          className="alert bg-wrong-darken-10 fixed-bottom mx-auto col-3 mb-2 text-dark d-none"
          id="alert-400"
          role="alert"
        >
          <i className="far fa-times-circle mr-5"></i>
          Data doens't save!
        </div>
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
        <Modal show={showNewModMovi} id="ModalAdd" onHide={ModNewMoviSate}>
          <Modal.Header closeButton>
            <Modal.Title>Add Movement</Modal.Title>
          </Modal.Header>
          <Form role="form" onSubmit={handleSubmitMovi}>
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
              <FormEditor stateformEdit handleChangeEdit/>
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
        <Modal show={showNewTransMod} id="ModalTrans" onHide={ModNewTransSate}>
          <Modal.Header closeButton>
            <Modal.Title>Add Transfer</Modal.Title>
          </Modal.Header>
          <FormAccount
            handleSubmit_trans={handleSubmit_trans}
            stateSignal={stateSignal}
            VerifySignal={VerifySignal}
            stateCatego={stateCatego}
            handleChangeTrans={handleChangeTrans}
            ModNewTransSate={ModNewTransSate}
          />
        </Modal>
      </Container>
    </>
  );
}

export default Account;
