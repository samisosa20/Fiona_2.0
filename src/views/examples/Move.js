import React, { useState, useEffect } from "react";
import TrmApi from "trm-api";

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
import Alert from "../../components/Alert";
import Modaldelete from "../../components/Modals/Delete";

function Account() {
  //declaracion de variables
  const [state, setState] = useState({
    NameAcount: "",
    json_movi: [],
    Balance: 0,
    Divisa: "",
    Descripcion: "",
  });
  const [moveJson, setMoveJson] = useState([]);
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
    trm: 1,
    customDeposit: 0,
    inBadge: "COP",
  });
  const [stateformEdit, setformEdit] = useState({
    id_data: 0,
    monto: 0,
    badge: "",
    catego: 0,
    event: "",
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
    trm: 1,
    customDeposit: 0,
    editInBadge: "COP",
  });
  const [stateCatego, setCatego] = useState([]);
  const [stateEvent, setEvent] = useState([]);
  const [refreshData, setrefreshData] = useState(false);
  const [stateAlert, setSateAlert] = useState({ visible: false, code: 200 });
  const [showOption, setShowOption] = useState(false);

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
  let idc = localStorage.getItem("IdUser");

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
              NameAcount: div[2].replace("%20", " "),
              Balance: firstResponse.data[0]
                ? firstResponse.data[0].cantidad
                : 0.0,
              Divisa: firstResponse.data[0]
                ? firstResponse.data[0].divisa
                : "COP",
              Descripcion: firstResponse.data[0]
                ? firstResponse.data[0].descripcion
                : "",
              json_movi: secondResponse.data,
            });
            setMoveJson(secondResponse.data);
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
  const showAdvanceOption = () => setShowOption(!showOption);

  // Accion al abrir los modals
  const OpenModalMovi = (e) => {
    e.preventDefault();
    axios
      .all([
        API.post("acount", {
          id: 5,
          idc: idc,
        }),
        API.post(`acount`, {
          id: 12,
          idc: idc,
        }),
      ])
      .then(
        axios.spread((firstResponse, secondResponse) => {
          setCatego(firstResponse.data);
          let d = new Date();
          let d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
          const eventFilter = secondResponse.data.filter((event) => {
            let d2 = new Date(event.fecha_fin.split("T")[0]);
            d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate() + 1);
            return d2.getTime() >= d1.getTime();
          });
          setEvent(eventFilter);
        })
      );
    let now = new Date(),
      year,
      month,
      date,
      hours,
      minutes,
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
    /* seconds =
      now.getSeconds().toString().length === 1
        ? "0" + now.getSeconds().toString()
        : now.getSeconds(); */

    formattedDateTime =
      year + "-" + month + "-" + date + "T" + hours + ":" + minutes;

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
    /* seconds =
      now.getSeconds().toString().length === 1
        ? "0" + now.getSeconds().toString()
        : now.getSeconds(); */

    formattedDateTime =
      year + "-" + month + "-" + date + "T" + hours + ":" + minutes;

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
    catego,
    event
  ) => {
    e.preventDefault();
    axios
      .all([
        API.post("acount", {
          id: 5,
          idc: idc,
        }),
        API.post(`acount`, {
          id: 12,
          idc: idc,
        }),
      ])
      .then(
        axios.spread((firstResponse, secondResponse) => {
          setCatego(firstResponse.data);
          setEvent(secondResponse.data);
        })
      );
    let div = fecha.split(" ");
    let fecha2 = div[0] + "T" + div[1];
    let signo = "+";
    if (valor_int < 0) {
      valor_int = valor_int * -1;
      signo = "-";
    }
    //console.log(event);
    setformEdit({
      id_data: id,
      monto: valor_int,
      badge: divisa,
      catego: catego,
      event: event,
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
    id_transe,
    trm
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
      trm: trm,
      customDeposit: parseFloat(trm).toFixed(2) > 1 ? parseFloat(valor_int / trm).toFixed(2) : parseFloat(valor_int * trm).toFixed(2),
      editInBadge: parseFloat(trm).toFixed(2) > 1 ? "USD" : "COP",
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
    if (event.target.name === "inBadge" || event.target.name === "badge") {
      let value = event.target.value;
      let name = event.target.name;
      if (
        event.target.value !== stateformtrans.badge ||
        event.target.value !== stateformtrans.inBadge
      ) {
        const trmApi = new TrmApi("HNgPywsjYTxDDwnGPdpyVbOth");
        trmApi
          .latest()
          .then((data) => {
            const valueTRM =
              name === "inBadge" && stateformtrans.badge === value
                ? 1
                : name === "badge" && stateformtrans.inBadge === value
                ? 1
                : data.valor;
            const customDeposit =
              stateformtrans.badge === "COP" && value === "USD"
                ? parseFloat(stateformtrans.monto / valueTRM).toFixed(2)
                : parseFloat(stateformtrans.monto * valueTRM).toFixed(2);
            setformtrans({
              ...stateformtrans,
              trm: valueTRM,
              [name]: value,
              customDeposit: customDeposit,
            });
          })
          .catch((error) => console.log(error));
      }
    } else if (event.target.name === "customDeposit") {
      const valueTRM =
        stateformtrans.badge === "COP" && stateformtrans.inBadge === "USD"
          ? parseFloat(stateformtrans.monto / event.target.value).toFixed(2)
          : parseFloat(stateformtrans.monto * event.target.value).toFixed(2);
      setformtrans({
        ...stateformtrans,
        trm: valueTRM,
        [event.target.name]: event.target.value,
      });
    } else {
      setformtrans({
        ...stateformtrans,
        [event.target.name]: event.target.value,
      });
    }
  };
  const handleChangeEdit = (event) => {
    setformEdit({ ...stateformEdit, [event.target.name]: event.target.value });
  };
  const handleChangeEditTrans = (event) => {
    if (event.target.name === "editInBadge" || event.target.name === "badge") {
      let value = event.target.value;
      let name = event.target.name;
      if (
        event.target.value !== stateformEditTrans.badge ||
        event.target.value !== stateformEditTrans.editInBadge
      ) {
        const trmApi = new TrmApi("HNgPywsjYTxDDwnGPdpyVbOth");
        trmApi
          .latest()
          .then((data) => {
            const valueTRM =
            name === "editInBadge" && stateformEditTrans.badge === value
            ? 1
            : name === "badge" && stateformEditTrans.editInBadge === value
            ? 1
            : data.valor;
            const customDeposit =
            stateformEditTrans.badge === "COP" && value === "USD"
            ? parseFloat(stateformEditTrans.monto / valueTRM).toFixed(2)
            : parseFloat(stateformEditTrans.monto * valueTRM).toFixed(2);
            setformEditTrans({
              ...stateformEditTrans,
              trm: valueTRM,
              [name]: value,
              customDeposit: customDeposit,
            });
          })
          .catch((error) => console.log(error));
      }
    } else if (event.target.name === "customDeposit") {
      const valueTRM =
        stateformEditTrans.badge === "COP" && stateformEditTrans.editInBadge === "USD"
          ? parseFloat(stateformEditTrans.monto / event.target.value).toFixed(2)
          : parseFloat(stateformEditTrans.monto * event.target.value).toFixed(2);
          setformEditTrans({
        ...stateformEditTrans,
        trm: valueTRM,
        [event.target.name]: event.target.value,
      });
    } else {
      setformEditTrans({
        ...stateformEditTrans,
        [event.target.name]: event.target.value,
      });
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
    if (idSigno === "signo_move") {
      setform({ ...stateform, [event.target.name]: event.target.value });
    } else if (idSigno === "signo_move_edit") {
      setformEdit({
        ...stateformEdit,
        [event.target.name]: event.target.value,
      });
    } else if (idSigno === "signo_trans_edit") {
      const customDeposit =
        stateformEditTrans.badge === "COP" &&
        stateformEditTrans.editInBadge === "USD"
          ? parseFloat(event.target.value / stateformEditTrans.trm).toFixed(2)
          : parseFloat(event.target.value * stateformEditTrans.trm).toFixed(2);
      setformEditTrans({
        ...stateformEditTrans,
        [event.target.name]: event.target.value,
        customDeposit: customDeposit,
      });
    } else {
      const customDeposit =
        stateformtrans.badge === "COP" && stateformtrans.inBadge === "USD"
          ? parseFloat(event.target.value / stateformtrans.trm).toFixed(2)
          : parseFloat(event.target.value * stateformtrans.trm).toFixed(2);
      setformtrans({
        ...stateformtrans,
        [event.target.name]: event.target.value,
        customDeposit: customDeposit,
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
      let idc = localStorage.getItem("IdUser");
      API.post("add_data", {
        id: 3,
        idu: idc,
        accoun: acount,
        value: valor,
        divisa: stateform.badge,
        catego: stateform.catego,
        descrip: stateform.descrip,
        date: stateform.datetime,
        event: stateform.event ? stateform.event : "",
      }).then((response) => {
        //alert (response.data);
        ModNewMoviSate();
        document.getElementById("btn_new_move_move").innerHTML = "Add";
        document.getElementById("btn_new_move_move").disabled = false;
        setform({
          monto: 0,
          badge: "COP",
          catego: 0,
          descrip: "",
          datetime: "",
        });
        setrefreshData(!refreshData);
        setSateAlert({ visible: true, code: response.data });
        setTimeout(() => {
          setSateAlert({ visible: false, code: 0 });
        }, 2000);
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
      let idc = localStorage.getItem("IdUser");
      API.post("add_data", {
        id: 4,
        idu: idc,
        acco_frist: account_ini,
        value: stateformtrans.monto,
        divisa: stateformtrans.badge,
        acco_sec: stateformtrans.account_fin,
        descri: stateformtrans.descrip,
        date: stateformtrans.datetime,
        trm: stateformtrans.trm,
        customDeposit: stateformtrans.customDeposit,
        inBadge: stateformtrans.inBadge,
      }).then((response) => {
        //alert (response.data);
        ModNewTransSate();
        document.getElementById("btn_new_trans_move").innerHTML = "Add";
        document.getElementById("btn_new_trans_move").disabled = false;
        setformtrans({
          monto: 0,
          badge: "COP",
          account_ini: 0,
          account_fin: 0,
          datetime: "",
          descrip: "",
          trm: 1,
          customDeposit: 0,
          inBadge: "COP",
        });
        setrefreshData(!refreshData);
        setSateAlert({ visible: true, code: response.data });
        setTimeout(() => {
          setSateAlert({ visible: false, code: 0 });
        }, 2000);
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
      let idc = localStorage.getItem("IdUser");
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
        event: stateformEdit.event ? stateformEdit.event : "",
      }).then((response) => {
        //alert (response.data);
        ModEditSate();
        document.getElementById("btn_edit_move_move").innerHTML =
          "Save Changes";
        document.getElementById("btn_edit_move_move").disabled = false;
        setrefreshData(!refreshData);
        setSateAlert({ visible: true, code: response.data });
        setTimeout(() => {
          setSateAlert({ visible: false, code: 0 });
        }, 2000);
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
      let idc = localStorage.getItem("IdUser");
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
        trm: stateformEditTrans.trm,
        customDeposit: stateformEditTrans.customDeposit,
        inBadge: stateformEditTrans.editInBadge,
      }).then((response) => {
        //alert (response.data);
        ModEditTransSate();
        document.getElementById("btn_edit_trans_move").innerHTML =
          "Save Changes";
        document.getElementById("btn_edit_trans_move").disabled = false;
        setrefreshData(!refreshData);
        setSateAlert({ visible: true, code: response.data });
        setTimeout(() => {
          setSateAlert({ visible: false, code: 0 });
        }, 2000);
      });
    }
  };
  const searchMove = (e) => {
    const newJson = moveJson.filter((data) => {
      if (
        data.categoria.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
          -1 ||
        data.valor_int.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
          -1 ||
        data.descripcion.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
          -1 ||
        data.fecha.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      ) {
        return true;
      }
    });
    setState({ ...state, json_movi: newJson });
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row className="mb-2">
          <div className="col">
            <h3 className="mb-0 text-white text-uppercase">
              {state.NameAcount}:
            </h3>
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
          <CardHeader className="border-0 pt-3 px-2">
            <div className="d-md-flex">
              <div className="col p-0">
                <h3 className="mb-0 text-bold">
                  Description:
                  <span className="font-weight-normal ml-1">
                    {state.Descripcion}
                  </span>
                </h3>
              </div>
              <div className="col justify-content-end my-2 my-md-0 p-0">
                <h3 className="mb-0">
                  Balance:
                  <span className="font-weight-normal ml-1">
                    {state.Balance + " " + state.Divisa}
                  </span>
                </h3>
              </div>
              <FormGroup className="col p-0 m-0">
                <Form.Control
                  type="text"
                  name="search"
                  placeholder="Search"
                  onKeyUp={(e) => searchMove(e)}
                ></Form.Control>
              </FormGroup>
            </div>
          </CardHeader>
        </Card>
        <ListGroup
          className="shadow col-md-12 mb-3 p-0"
          style={{ maxHeight: "500px", overflow: "auto" }}
        >
          {state.json_movi ? (
            state.json_movi.map((data, index) => (
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
                          data.nro_cate,
                          data.evento
                        )
                    : (e) =>
                        OpenModalEditTras(
                          e,
                          data.id,
                          data.valor_int,
                          data.divisa,
                          data.descripcion,
                          data.fecha,
                          data.id_transfe,
                          data.trm
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
            ))
          ) : (
            <ListGroupItem>
              <Row>
                <div className="col">
                  <h3 className="mb-0 text-center">Without Movement</h3>
                </div>
              </Row>
            </ListGroupItem>
          )}
        </ListGroup>
        <Alert visible={stateAlert.visible} code={stateAlert.code} />
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
                  defaultValue={`${new Date().getFullYear()}-${`${
                    new Date().getMonth() + 1
                  }`.padStart(2, 0)}-${`${new Date().getDate()}`.padStart(
                    2,
                    0
                  )}T${`${new Date().getHours()}`.padStart(
                    2,
                    0
                  )}:${`${new Date().getMinutes()}`.padStart(2, 0)}`}
                  name="datetime"
                  onChange={handleChange}
                ></Form.Control>
              </FormGroup>
              <p
                className="text-sm text-info"
                onClick={() => showAdvanceOption()}
              >
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
                  <Form.Control
                    as="select"
                    name="event"
                    onChange={handleChange}
                  >
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
                  name="datetime"
                  defaultValue={`${new Date().getFullYear()}-${`${
                    new Date().getMonth() + 1
                  }`.padStart(2, 0)}-${`${new Date().getDate()}`.padStart(
                    2,
                    0
                  )}T${`${new Date().getHours()}`.padStart(
                    2,
                    0
                  )}:${`${new Date().getMinutes()}`.padStart(2, 0)}`}
                  onChange={handleChangeTrans}
                ></Form.Control>
              </FormGroup>
              <p
                className="text-sm text-info"
                onClick={() => showAdvanceOption()}
              >
                Advanced Options
                <i
                  className={`fas ${
                    showOption ? "fa-chevron-up" : "fa-chevron-down"
                  } ml-2`}
                ></i>
              </p>
              {showOption && (
                <FormGroup>
                  <Row className="align-items-end">
                    <div className="col-md-8">
                      <Label>TRM</Label>
                      <Form.Control
                        pattern="[0-9]{0,5}"
                        type="number"
                        name="trm"
                        id="trm"
                        step={0.01}
                        required
                        disabled
                        key={
                          stateformtrans.monto +
                          stateformtrans.inBadge +
                          stateformtrans.badge +
                          stateformtrans.trm
                        }
                        defaultValue={stateformtrans.trm}
                        onChange={handleChangeTrans}
                      ></Form.Control>
                    </div>
                    <div className="col-md-3">
                      <Label>In Badge</Label>
                      <Form.Control
                        as="select"
                        name="inBadge"
                        onChange={handleChangeTrans}
                      >
                        <option>COP</option>
                        <option>USD</option>
                      </Form.Control>
                    </div>
                  </Row>
                </FormGroup>
              )}
              {showOption && (
                <FormGroup>
                  <Label>Custom deposit amount</Label>
                  <Form.Control
                    pattern="[0-9]{0,5}"
                    type="number"
                    name="customDeposit"
                    id="customDeposit"
                    step={0.01}
                    required
                    key={
                      stateformtrans.monto +
                      stateformtrans.badge +
                      stateformtrans.inBadge
                    }
                    defaultValue={stateformtrans.customDeposit}
                    onChange={handleChangeTrans}
                  ></Form.Control>
                </FormGroup>
              )}
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
                  value={stateformEdit.catego}
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
              <p
                className="text-sm text-info"
                onClick={() => showAdvanceOption()}
              >
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
                  <Form.Control
                    as="select"
                    name="event"
                    onChange={handleChangeEdit}
                    value={stateformEdit.event ? stateformEdit.event : ""}
                  >
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
        <Modaldelete
          action="movement"
          title="Delete movement"
          message="Are you sure to delete the movement of this account?"
          refreshData={refreshData}
          setrefreshData={setrefreshData}
          state={stateformEdit}
          showDelMod={showDelMod}
          setshowDelMod={setshowDelMod}
          extraModal={
            stateformEdit.Modal === "move" ? ModEditSate : ModEditTransSate
          }
          setSateAlert={setSateAlert}
        />
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
              <p
                className="text-sm text-info"
                onClick={() => showAdvanceOption()}
              >
                Advanced Options
                <i
                  className={`fas ${
                    showOption ? "fa-chevron-up" : "fa-chevron-down"
                  } ml-2`}
                ></i>
              </p>
              {showOption && (
                <FormGroup>
                  <Row className="align-items-end">
                    <div className="col-md-8">
                      <Label>TRM</Label>
                      <Form.Control
                        pattern="[0-9]{0,2}"
                        type="number"
                        name="trm"
                        id="trm"
                        step={0.01}
                        required
                        disabled
                        key={
                          stateformEditTrans.monto +
                          stateformEditTrans.editInBadge +
                          stateformEditTrans.badge +
                          stateformEditTrans.trm
                        }
                        defaultValue={stateformEditTrans.trm}
                        onChange={handleChangeEditTrans}
                      ></Form.Control>
                    </div>
                    <div className="col-md-3">
                      <Label>In Badge</Label>
                      <Form.Control
                        as="select"
                        name="editInBadge"
                        defaultValue={stateformEditTrans.editInBadge}
                        onChange={handleChangeEditTrans}
                      >
                        <option>COP</option>
                        <option>USD</option>
                      </Form.Control>
                    </div>
                  </Row>
                </FormGroup>
              )}
              {showOption && (
                <FormGroup>
                  <Label>Custom deposit amount</Label>
                  <Form.Control
                    pattern="[0-9]{0,2}"
                    type="number"
                    name="customDeposit"
                    id="customDeposit"
                    step={0.01}
                    required
                    key={
                      stateformEditTrans.monto +
                      stateformEditTrans.badge +
                      stateformEditTrans.editInBadge
                    }
                    defaultValue={stateformEditTrans.customDeposit}
                    onChange={handleChangeEditTrans}
                  ></Form.Control>
                </FormGroup>
              )}
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
