import React, { useState, useEffect } from "react";

import API from "../../variables/API";
import axios from "axios";
// reactstrap components
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  FormGroup,
  Label,
  ModalFooter,
} from "reactstrap";
import { Form, InputGroup, Modal } from "react-bootstrap";
// core components
import { Header } from "components/Headers/Header.js";

function Account() {
  //declaracion de variables
  const [state, setState] = useState({
    NameAcount: "",
    json_movi: [],
    Balance: 0,
    Divisa: "",
    Descripcion: "",
  });
  // envio de informacion
  const [stateform, setform] = useState({
    monto: 0,
    badge: "COP",
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
  const [stateformEdit, setformEdit] = useState({
    id_data: 0,
    monto: 0,
    badge: "",
    catego: 0,
    descrip: "",
    datetime: "",
    Signal: "+",
    Modal: "",
  });
  const [stateformEditTrans, setformEditTrans] = useState({
    id_data: 0,
    monto: 0,
    badge: "",
    account_ini: 0,
    account_fin: 0,
    datetime: "",
    descrip: "",
  });
  const [stateCatego, setCatego] = useState([]);
  const [refreshData, setrefreshData] = useState(false);
  /* Declaracion de estados de los modals */
  const [showNewMod, setshowNewMod] = useState(false);
  const [showNewTransMod, setshowNewTransMod] = useState(false);
  const [showEditsMod, setshowEditMod] = useState(false);
  const [showEditsTransMod, setshowEditTransMod] = useState(false);
  const [showDelMod, setshowDelMod] = useState(false);
  const [stateSignal, setSignal] = useState({ Signal: "+" });

  // extrae de la URL informacion
  let url = window.location.href;
  let div = url.split("=");
  let sub_acount = div[1];
  let div2 = sub_acount.split("&");
  let acount = div2[0];
  let idc = sessionStorage.getItem("IdUser");

  // Llamado multiple para la lista y la descripcion
  useEffect(() => {
    async function loadDataMove() {
      await axios
        .all([
          API.post(`acount`, {
            id: 3,
            idc: idc,
            idacount: acount,
          }),
          API.post(`acount`, {
            id: 1,
            idc: idc,
            acount: acount,
          }),
        ])
        .then(
          axios.spread((firstResponse, secondResponse) => {
            setState({
              NameAcount: div[2].replace("%20", ' '),
              Balance: firstResponse.data[0].cantidad,
              Divisa: firstResponse.data[0].divisa,
              Descripcion: firstResponse.data[0].descripcion,
              json_movi: secondResponse.data,
            });
          })
        );
    }
    loadDataMove();
  }, [refreshData]);

  // Funcion para cambiar de estado de los modals
  const ModNewMoviSate = () => setshowNewMod(!showNewMod);
  const ModNewTransSate = () => setshowNewTransMod(!showNewTransMod);
  const ModEditSate = () => setshowEditMod(!showEditsMod);
  const ModEditTransSate = () => setshowEditTransMod(!showEditsTransMod);
  const ModDelCateSate = () => setshowDelMod(!showDelMod);

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
  const OpenModalEdit = (
    e,
    id,
    valor_int,
    divisa,
    descripcion,
    fecha,
    catego
  ) => {
    e.preventDefault();
    API.post("acount", {
      id: 5,
      idc: idc,
    }).then((response) => setCatego(response.data));

    let div = fecha.split(" ");
    let fecha2 = div[0] + "T" + div[1];
    let signo = "+";
    if (valor_int < 0) {
      valor_int = valor_int * -1;
      signo = "-";
    }
    setformEdit({
      id_data: id,
      monto: valor_int,
      badge: divisa,
      catego: catego,
      descrip: descripcion,
      datetime: fecha2,
      Signal: signo,
    });
    setSignal({ Signal: signo });
    ModEditSate();
  };
  const OpenModalEditTras = (
    e,
    id,
    valor_int,
    divisa,
    descripcion,
    fecha,
    id_transe
  ) => {
    e.preventDefault();
    API.post("acount", {
      id: 2,
      idc: idc,
    }).then((response) => setCatego(response.data));

    let div = fecha.split(" ");
    let fecha2 = div[0] + "T" + div[1];
    let signo = "+";
    let account_ini = id_transe;
    let account_fin = acount;
    if (valor_int < 0) {
      valor_int = valor_int * -1;
      signo = "-";
      account_ini = acount;
      account_fin = id_transe;
    }
    setformEditTrans({
      id_data: id,
      monto: valor_int,
      badge: divisa,
      account_ini: account_ini,
      account_fin: account_fin,
      datetime: fecha2,
      descrip: descripcion,
    });
    setSignal({ Signal: signo });
    ModEditTransSate();
  };
  const OpenModalDelete = (e, id, date, modal) => {
    e.preventDefault();
    setformEdit({
      id_data: id,
      monto: stateformEdit.monto,
      badge: stateformEdit.badge,
      catego: stateformEdit.catego,
      descrip: stateformEdit.descrip,
      datetime: date,
      Signal: stateformEdit.Signal,
      Modal: modal,
    });
    ModDelCateSate();
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
  const handleChangeEdit = (event) => {
    setformEdit({ ...stateformEdit, [event.target.name]: event.target.value });
  };
  const handleChangeEditTrans = (event) => {
    setformEditTrans({
      ...stateformEditTrans,
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
    } else if (idSigno === "signo_move_edit") {
      setformEdit({
        ...stateformEdit,
        [event.target.name]: event.target.value,
      });
    } else if (idSigno === "signo_trans_edit") {
      setformEditTrans({
        ...stateformEditTrans,
        [event.target.name]: event.target.value,
      });
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
    if (stateform.badge === "" || stateform.catego === 0) {
      alert("Fill in all the fields");
    } else {
      document.getElementById("btn_new_move_move").disabled = true;
      document.getElementById("btn_new_move_move").innerHTML =
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
        accoun: acount,
        value: valor,
        divisa: stateform.badge,
        catego: stateform.catego,
        descrip: stateform.descrip,
        date: stateform.datetime,
      }).then((response) => {
        //alert (response.data);
        ModNewMoviSate();
        document.getElementById("btn_new_move_move").innerHTML = "Add";
        document.getElementById("btn_new_move_move").disabled = false;
        setrefreshData(!refreshData);
        let idAlert;
        if (response.data === 200) {
          idAlert = "alert-200";
        } else {
          idAlert = "alert-400";
        }
        document.querySelector(`#${idAlert}`).classList.remove("d-none");
          setTimeout(() => {
          document.querySelector(`#${idAlert}`).classList.add("d-none");
          }, 2000)
      });
    }
  };
  const handleSubmit_trans = (event) => {
    event.preventDefault();
    let account_ini = stateformtrans.account_ini;
    if (account_ini === 0) {
      account_ini = document.getElementById("account_ini").value;
    }
    if (
      stateformtrans.badge === "" ||
      stateformtrans.account_fin === 0 ||
      account_ini === 0 ||
      stateformtrans.monto === 0
    ) {
      alert("Fill in all the fields");
    } else {
      document.getElementById("btn_new_trans_move").disabled = true;
      document.getElementById("btn_new_trans_move").innerHTML =
        "<span className='spinner-border spinner-border-sm mr-1'" +
        "role='status' aria-hidden='true'></span>Loading...";
      let idc = sessionStorage.getItem("IdUser");
      API.post("add_data", {
        id: 4,
        idu: idc,
        acco_frist: account_ini,
        value: stateformtrans.monto,
        divisa: stateformtrans.badge,
        acco_sec: stateformtrans.account_fin,
        descri: stateformtrans.descrip,
        date: stateformtrans.datetime,
      }).then((response) => {
        //alert (response.data);
        ModNewTransSate();
        document.getElementById("btn_new_trans_move").innerHTML = "Add";
        document.getElementById("btn_new_trans_move").disabled = false;
        setrefreshData(!refreshData);
        let idAlert;
        if (response.data === 200) {
          idAlert = "alert-200";
        } else {
          idAlert = "alert-400";
        }
        document.querySelector(`#${idAlert}`).classList.remove("d-none");
          setTimeout(() => {
          document.querySelector(`#${idAlert}`).classList.add("d-none");
          }, 2000)
      });
    }
  };
  const handleSubmitEdit = (event) => {
    event.preventDefault();
    if (stateformEdit.badge === "" || stateformEdit.catego === 0) {
      alert("Fill in all the fields");
    } else {
      document.getElementById("btn_edit_move_move").disabled = true;
      document.getElementById("btn_edit_move_move").innerHTML =
        "<span className='spinner-border spinner-border-sm mr-1'" +
        "role='status' aria-hidden='true'></span>Loading...";
      let valor = stateformEdit.monto;
      if (document.getElementById("signo_move_edit").value === "-") {
        valor = valor * -1;
      }
      let idc = sessionStorage.getItem("IdUser");
      API.post("edit_data", {
        id: 3,
        idu: idc,
        id_data: stateformEdit.id_data,
        value: valor,
        divisa: stateformEdit.badge,
        descrip: stateformEdit.descrip,
        date: stateformEdit.datetime,
        catego: stateformEdit.catego,
        account: acount,
      }).then((response) => {
        //alert (response.data);
        ModEditSate();
        document.getElementById("btn_edit_move_move").innerHTML =
          "Save Changes";
        document.getElementById("btn_edit_move_move").disabled = false;
        setrefreshData(!refreshData);
        let idAlert;
        if (response.data === 200) {
          idAlert = "alert-200";
        } else {
          idAlert = "alert-400";
        }
        document.querySelector(`#${idAlert}`).classList.remove("d-none");
          setTimeout(() => {
          document.querySelector(`#${idAlert}`).classList.add("d-none");
          }, 2000)
      });
    }
  };
  const handleSubmitEditTrans = (event) => {
    event.preventDefault();
    if (
      stateformEditTrans.badge === "" ||
      stateformEditTrans.account_ini === 0 ||
      stateformEditTrans.account_fin === 0 ||
      stateformEditTrans.monto === 0
    ) {
      alert("Fill in all the fields");
    } else {
      document.getElementById("btn_edit_trans_move").disabled = true;
      document.getElementById("btn_edit_trans_move").innerHTML =
        "<span className='spinner-border spinner-border-sm mr-1'" +
        "role='status' aria-hidden='true'></span>Loading...";
      let valor = stateformEditTrans.monto;
      let idc = sessionStorage.getItem("IdUser");
      API.post("edit_data", {
        id: 4,
        idu: idc,
        id_data: stateformEditTrans.id_data,
        value: valor,
        divisa: stateformEditTrans.badge,
        descrip: stateformEditTrans.descrip,
        date: stateformEditTrans.datetime,
        account_ini: stateformEditTrans.account_ini,
        account_fin: stateformEditTrans.account_fin,
      }).then((response) => {
        //alert (response.data);
        ModEditTransSate();
        document.getElementById("btn_edit_trans_move").innerHTML =
          "Save Changes";
        document.getElementById("btn_edit_trans_move").disabled = false;
        setrefreshData(!refreshData);
        let idAlert;
        if (response.data === 200) {
          idAlert = "alert-200";
        } else {
          idAlert = "alert-400";
        }
        document.querySelector(`#${idAlert}`).classList.remove("d-none");
          setTimeout(() => {
          document.querySelector(`#${idAlert}`).classList.add("d-none");
          }, 2000)
      });
    }
  };
  const handleDelete = (e, id) => {
    e.preventDefault();
    document.getElementById("btn_dele_move_move").disabled = true;
    document.getElementById("btn_dele_move_move").innerHTML =
      "<span className='spinner-border spinner-border-sm mr-1'" +
      "role='status' aria-hidden='true'></span>Loading...";
    let idc = sessionStorage.getItem("IdUser");
    API.post("delete_data", {
      id: 3,
      idu: idc,
      id_data: id,
      date: stateformEdit.datetime,
    }).then((response) => {
      //alert (response.data);
      ModDelCateSate();
      stateformEdit.Modal === "move" ? ModEditSate() : ModEditTransSate();
      document.getElementById("btn_dele_move_move").innerHTML = "Delete";
      document.getElementById("btn_dele_move_move").disabled = false;
      setrefreshData(!refreshData);
      let idAlert;
        if (response.data === 200) {
          idAlert = "alert-200";
        } else {
          idAlert = "alert-400";
        }
        document.querySelector(`#${idAlert}`).classList.remove("d-none");
          setTimeout(() => {
          document.querySelector(`#${idAlert}`).classList.add("d-none");
          }, 2000)
    });
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row className="mb-2">
          <div className="col">
            <h3 className="mb-0 text-white">{state.NameAcount}:</h3>
          </div>
          <div className="col justify-content-end row">
            <Button className="btn-info mb-3" onClick={(e) => OpenModalMovi(e)}>
              <i className="fas fa-plus mr-2"></i>
              Move
            </Button>
            <Button
              className="mr-3 mb-3 btn-success"
              onClick={(e) => OpenModalTrans(e)}
            >
              <i className="fas fa-exchange-alt mr-2"></i>
              Transfer
            </Button>
          </div>
        </Row>
        <Card className="shadow col-md-12 mb-3">
          <CardHeader className="border-0">
            <Row>
              <div className="col">
                <h3 className="mb-0">{"Description: " + state.Descripcion}</h3>
              </div>
              <div className="col justify-content-end">
                <h3 className="mb-0">
                  {"Balance: " + state.Balance + " " + state.Divisa}
                </h3>
              </div>
            </Row>
          </CardHeader>
        </Card>
        <ListGroup
          className="shadow col-md-12 mb-3"
          style={{ maxHeight: "500px", overflow: "auto" }}
        >
          {state.json_movi.map((data, index) => (
            <ListGroupItem
              key={index}
              onClick={
                data.categoria !== "Transferencia"
                  ? (e) =>
                      OpenModalEdit(
                        e,
                        data.id,
                        data.valor_int,
                        data.divisa,
                        data.descripcion,
                        data.fecha,
                        data.nro_cate
                      )
                  : (e) =>
                      OpenModalEditTras(
                        e,
                        data.id,
                        data.valor_int,
                        data.divisa,
                        data.descripcion,
                        data.fecha,
                        data.id_transfe
                      )
              }
            >
              <Row>
                <div className="col">
                  <h3 className="mb-0">{data.categoria}</h3>
                </div>
                <div className="col justify-content-end">
                  {data.valor_int < 0 ? (
                    <h3 className="mb-0 text-danger">
                      {"$ " + data.valor + " " + data.divisa}
                    </h3>
                  ) : (
                    <h3 className="mb-0 text-success">
                      {"$ " + data.valor + " " + data.divisa}
                    </h3>
                  )}
                </div>
              </Row>
              <div className="col">Date: {data.fecha}</div>
            </ListGroupItem>
          ))}
        </ListGroup>
        <div className="alert bg-success-lighten-20 fixed-bottom mx-auto col-3 mb-2 text-dark d-none" id="alert-200" role="alert">
          <i className="far fa-check-circle mr-5"></i>
          Data save success!
        </div>
        <div className="alert bg-wrong-darken-10 fixed-bottom mx-auto col-3 mb-2 text-dark d-none" id="alert-400" role="alert">
          <i className="far fa-times-circle mr-5"></i>
          Data doens't save!
        </div>
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
                <Form.Control
                  type="datetime-local"
                  defaultValue="2020-01-01T12:00:00"
                  name="datetime"
                  onChange={handleChange}
                ></Form.Control>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button color="danger" onClick={ModNewMoviSate}>
                Close
              </Button>
              <Button type="submit" color="success" id="btn_new_move_move">
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
                        if (data.id === acount) {
                          return (
                            <option
                              key={index}
                              selected
                              className="font-weight-bold"
                              value={data.id}
                            >
                              {data.nombre}
                            </option>
                          );
                        } else {
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
              <Button type="submit" color="success" id="btn_new_trans_move">
                Add
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal show={showEditsMod} id="ModalEdit" onHide={ModEditSate}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Movement</Modal.Title>
          </Modal.Header>
          <Form role="form" onSubmit={handleSubmitEdit}>
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
                          id="signo_move_edit"
                          name="Signal"
                          className={
                            stateSignal.Signal === "+"
                              ? "btn btn-outline-success"
                              : "btn btn-outline-danger"
                          }
                          onClick={ChangeSignal}
                        >
                          {stateSignal.Signal}
                        </Button>
                      </InputGroup.Prepend>
                      <Form.Control
                        pattern="[0-9]{0,5}"
                        type="number"
                        name="monto"
                        step={0.01}
                        id="monto_edit"
                        aria-describedby="SignalAppend"
                        required
                        defaultValue={stateformEdit.monto}
                        onChange={(e) => VerifySignal(e, "signo_move_edit")}
                      ></Form.Control>
                    </InputGroup>
                  </div>
                  <div className="col-md-3">
                    <Form.Control
                      as="select"
                      className="mt-4"
                      name="badge"
                      onChange={handleChangeEdit}
                    >
                      <option>COP</option>
                      <option>USD</option>
                    </Form.Control>
                  </div>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label>Category</Label>
                <Form.Control
                  as="select"
                  name="catego"
                  onChange={handleChangeEdit}
                >
                  <option></option>
                  {stateCatego.id !== -1000
                    ? stateCatego.map((data, index) => {
                        if (data.sub_categoria === data.categoria) {
                          return (
                            <option
                              key={index}
                              className="font-weight-bold"
                              selected={
                                data.nro_sub_catego === stateformEdit.catego
                                  ? true
                                  : false
                              }
                              value={data.nro_sub_catego}
                            >
                              {data.sub_categoria}
                            </option>
                          );
                        } else {
                          return (
                            <option
                              key={index}
                              selected={
                                data.nro_sub_catego === stateformEdit.catego
                                  ? true
                                  : false
                              }
                              value={data.nro_sub_catego}
                            >
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
                  defaultValue={stateformEdit.descrip}
                  name="descrip"
                  rows="3"
                  onChange={handleChangeEdit}
                ></Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>Date</Label>
                <Form.Control
                  type="datetime-local"
                  defaultValue={stateformEdit.datetime}
                  name="datetime"
                  onChange={handleChangeEdit}
                ></Form.Control>
              </FormGroup>
            </Modal.Body>
            <ModalFooter>
              <Button
                color="danger"
                onClick={(e) =>
                  OpenModalDelete(
                    e,
                    stateformEdit.id_data,
                    stateformEdit.datetime,
                    "move"
                  )
                }
              >
                Delete
              </Button>
              <Button type="submit" color="success" id="btn_edit_move_move">
                Save Changes
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Modal show={showDelMod} id="ModalDelete" onHide={ModDelCateSate}>
          <Modal.Header closeButton>
            <Modal.Title>Delete movement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {"Are you sure delete the account this movement?"}
          </Modal.Body>
          <Modal.Footer>
            <Button color="secundary" onClick={ModDelCateSate}>
              Cancel
            </Button>
            <Button
              type="submit"
              color="danger"
              id="btn_dele_move_move"
              onClick={(e) => handleDelete(e, stateformEdit.id_data)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showEditsTransMod}
          id="ModalEditTrans"
          onHide={ModEditTransSate}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Transfer</Modal.Title>
          </Modal.Header>
          <Form role="form" onSubmit={handleSubmitEditTrans}>
            <Modal.Body>
              <FormGroup>
                <Row>
                  <div className="col-md-8">
                    <Label>Value</Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <Button
                          defaultValue={stateSignal.Signal}
                          type="button"
                          id="signo_trans_edit"
                          className={
                            stateSignal.Signal === "+"
                              ? "btn btn-outline-success"
                              : "btn btn-outline-danger"
                          }
                          onClick={ChangeSignal}
                        >
                          {stateSignal.Signal}
                        </Button>
                      </InputGroup.Prepend>
                      <Form.Control
                        pattern="[0-9]{0,5}"
                        type="number"
                        name="monto"
                        id="monto_edit"
                        step={0.01}
                        aria-describedby="SignalAppend"
                        required
                        defaultValue={stateformEditTrans.monto}
                        onChange={(e) => VerifySignal(e, "signo_trans_edit")}
                      ></Form.Control>
                    </InputGroup>
                  </div>
                  <div className="col-md-3">
                    <Form.Control
                      as="select"
                      className="mt-4"
                      name="badge"
                      onChange={handleChangeEditTrans}
                    >
                      <option>COP</option>
                      <option>USD</option>
                    </Form.Control>
                  </div>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label>In Account</Label>
                <Form.Control
                  as="select"
                  name="account_ini"
                  onChange={handleChangeEditTrans}
                >
                  <option></option>
                  {stateCatego.id !== -1000
                    ? stateCatego.map((data, index) => {
                        if (data.id === stateformEditTrans.account_ini) {
                          return (
                            <option
                              key={index}
                              selected
                              className="font-weight-bold"
                              value={data.id}
                            >
                              {data.nombre}
                            </option>
                          );
                        } else {
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
              <FormGroup>
                <Label>Out Account</Label>
                <Form.Control
                  as="select"
                  name="account_fin"
                  onChange={handleChangeEditTrans}
                >
                  <option></option>
                  {stateCatego.id !== -1000
                    ? stateCatego.map((data, index) => {
                        if (data.id === stateformEditTrans.account_fin) {
                          return (
                            <option
                              key={index}
                              selected
                              className="font-weight-bold"
                              value={data.id}
                            >
                              {data.nombre}
                            </option>
                          );
                        } else {
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
              <FormGroup>
                <Label>Description</Label>
                <Form.Control
                  as="textarea"
                  defaultValue={stateformEditTrans.descrip}
                  name="descrip"
                  rows="3"
                  onChange={handleChangeEditTrans}
                ></Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>Date</Label>
                <Form.Control
                  type="datetime-local"
                  defaultValue={stateformEditTrans.datetime}
                  name="datetime"
                  onChange={handleChangeEditTrans}
                ></Form.Control>
              </FormGroup>
            </Modal.Body>
            <ModalFooter>
              <Button
                color="danger"
                onClick={(e) =>
                  OpenModalDelete(
                    e,
                    stateformEditTrans.id_data,
                    stateformEditTrans.datetime,
                    "transfer"
                  )
                }
              >
                Delete
              </Button>
              <Button type="submit" id="btn_edit_trans_move" color="success">
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
