import React, { useState, useEffect } from "react";
import TrmApi from "trm-api";
// reactstrap components
import { Button, Container } from "reactstrap";

// core components
import { Header } from "components/Headers/Header.js";
import API from "../../variables/API";
import axios from "axios";

import Alert from "../../components/Alert";
import ModalEditAcount from "components/Modals/EditorAcount";
import Modaldelete from "../../components/Modals/Delete";
import ModalAcountAdd from "../../components/Modals/AddAcount";
import AcountAdd from "components/Acount/NewAccounts";
import ModalAddMovement from "components/Modals/AddMovement";
import ModalTranfer from "components/Modals/Transfer";
import ModalshareAccount from "components/Modals/Share";

function Account() {
  const [state, setState] = useState([]);
  // envio de informacion
  const [stateform, setform] = useState({
    catego: "",
    descrip: "",
    badge: "COP",
    monto: null,
    save_account: false
  });
  // edicion de informacion
  const [stateformEdit, setformEdit] = useState({
    edit_account: "",
    edit_descrip: "",
    edit_badge: "",
    edit_monto: false,
    edit_save_account: 0,
    id_data: 0
  });
  /* Declaracion de estados de los modals */
  const [showNewMod, setshowNewMod] = useState(false);
  const [showNewModMovi, setshowNewModMovie] = useState(false);
  const [showDelMod, setshowDelMod] = useState(false);
  const [showShareMod, setshowShareMod] = useState(false);
  const [showEdiMod, setshowEdiMod] = useState(false);
  const [stateAccount, setStateAccount] = useState(false);
  const [showNewTransMod, setshowNewTransMod] = useState(false);
  const [refreshData, setrefreshData] = useState(false);
  const [stateCatego, setCatego] = useState([]);
  const [stateAcount, setAcount] = useState([]);
  const [stateEvent, setEvent] = useState([]);
  const [stateAlert, setSateAlert] = useState({ visible: false, code: 200 });
  const [stateSignal, setSignal] = useState({ Signal: "+" });
  const [stateformtrans, setformtrans] = useState({
    monto: null,
    badge: "COP",
    account_ini: 0,
    account_fin: 0,
    datetime: "",
    descrip: "",
    trm: 1,
    customDeposit: 0,
    inBadge: "COP"
  });

  useEffect(() => {
    var idc = localStorage.getItem("IdUser");
    API.post("acount", {
      id: 2,
      idc: idc
    }).then(response => {
      setState(response.data);
    });
  }, [refreshData]);

  // Funcion para cambiar de estado de los modals
  const ModNewCateSate = () => setshowNewMod(!showNewMod);
  const ModDelCateSate = () => setshowDelMod(!showDelMod);
  const ModShareAccount = () => setshowShareMod(!showShareMod);
  const ModEdiCateSate = () => setshowEdiMod(!showEdiMod);
  const ChangeStateAccount = () => setStateAccount(!stateAccount);
  const ModNewMoviSate = () => setshowNewModMovie(!showNewModMovi);
  const ModNewTransSate = () => setshowNewTransMod(!showNewTransMod);

  // Accion al abrir los modals
  const OpenModalNew = e => {
    e.preventDefault();
    ModNewCateSate();
  };
  const OpenModalDelete = (e, id, account) => {
    e.preventDefault();
    setformEdit({
      edit_account: account,
      edit_descrip: stateformEdit.descrip,
      edit_badge: stateformEdit.group,
      edit_include: stateformEdit.include,
      id_data: id
    });
    ModDelCateSate();
  };
  const OpenModalShare = (e, id, account) => {
    e.preventDefault();
    setformEdit({
      edit_account: account,
      edit_descrip: stateformEdit.descrip,
      edit_badge: stateformEdit.group,
      edit_include: stateformEdit.include,
      id_data: id
    });
    ModShareAccount();
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
      id_data: id
    });
    ModEdiCateSate();
    //document.getElementById("edit_badge").value = group;
  };
  const VerifySignal = (value, nameContainer, idSigno) => {
    let signo = document.getElementById(idSigno), valuePrice = value === undefined ? null : value
    
    if (valuePrice?.includes('-')) {
      if (idSigno !== "") {
        setSignal({ Signal: "-" });
        signo.className = "btn btn-outline-danger";
      }
      valuePrice = valuePrice.replace('-', '');
    }

    if (idSigno === "signo_move") {
      setform({ ...stateform, [nameContainer]: valuePrice });
    } else {
      const customDeposit = stateformtrans.badge === "COP" && stateformtrans.inBadge === 'USD' ? parseFloat(valuePrice / stateformtrans.trm).toFixed(2) : parseFloat(valuePrice * stateformtrans.trm).toFixed(2)
      setformtrans({
        ...stateformtrans,
        [nameContainer]: valuePrice,
        customDeposit: customDeposit,
      });
    }
  };
  const ChangeSignal = event => {
    setSignal({ Signal: event.target.value !== "+" ? "+" : "-" });
    if (event.target.value !== "+") {
      event.target.className = "btn btn-outline-success";
    } else {
      event.target.className = "btn btn-outline-danger";
    }
  };
  const handleChangeTrans = event => {
    if (event.target.name === "inBadge" || event.target.name === "badge") {
      let value = event.target.value
      let name = event.target.name
      if (event.target.value !== stateformtrans.badge || event.target.value !== stateformtrans.inBadge ){
        const trmApi = new TrmApi("HNgPywsjYTxDDwnGPdpyVbOth");
        trmApi
        .latest()
        .then((data) => {
          const valueTRM = name === "inBadge" && stateformtrans.badge === value ? 1 : name === "badge" && stateformtrans.inBadge === value ? 1 : data.valor
          const customDeposit = stateformtrans.badge === "COP" && value === 'USD' ? parseFloat(stateformtrans.monto / valueTRM).toFixed(2) : parseFloat(stateformtrans.monto * valueTRM).toFixed(2)
          setformtrans({
          ...stateformtrans,
          trm: valueTRM,
          [name]: value,
          customDeposit: customDeposit
        })}
        )
        .catch((error) => console.log(error));
      }
    } else if (event.target.name === "customDeposit"){
      const valueTRM = stateformtrans.badge === "COP" && stateformtrans.inBadge === 'USD' ? parseFloat(stateformtrans.monto / event.target.value).toFixed(2) : parseFloat(stateformtrans.monto * event.target.value).toFixed(2)
      setformtrans({
        ...stateformtrans,
        trm: valueTRM,
        [event.target.name]: event.target.value
      });
    } else {
      setformtrans({
        ...stateformtrans,
        [event.target.name]: event.target.value
      });
    }
  };
  const OpenModalMovi = e => {
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
        }),
        API.post(`acount`, {
          id: 12,
          idc: idc
        })
      ])
      .then(
        axios.spread((firstResponse, secondResponse, thirdResponse) => {
          setCatego(firstResponse.data);
          setAcount(secondResponse.data);
          let d = new Date();
          let d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
          const eventFilter = thirdResponse.data.filter(event => {
            let d2 = new Date(event.fecha_fin.split("T")[0]);
            d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
            return d2.getTime() >= d1.getTime()
          })
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
    (now.getMonth() + 1).toString().length === 1
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
      year +
      "-" +
      month +
      "-" +
      date +
      "T" +
      hours +
      ":" +
      minutes;
    setform({ ...stateform, datetime: formattedDateTime });
    ModNewMoviSate();
  };
  const OpenModalTrans = e => {
    e.preventDefault();
    let idc = localStorage.getItem("IdUser");
    API.post("acount", {
      id: 2,
      idc: idc
    }).then(response => setCatego(response.data));
    let now = new Date(),
      year,
      month,
      date,
      hours,
      minutes,
      formattedDateTime;

    year = now.getFullYear();
    month =
    (now.getMonth() + 1).toString().length === 1
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
      year +
      "-" +
      month +
      "-" +
      date +
      "T" +
      hours +
      ":" +
      minutes;

    //document.getElementById("datetime_movi").value = formattedDateTime;
    setformtrans({ ...stateformtrans, datetime: formattedDateTime });
    ModNewTransSate();
  };

  /* ...state para que no se modifique */
  const handleChange = event => {
    //console.log(event.target.name === "edit_save_account");
    if (event.target.name === "edit_save_account") {
      setform({ ...stateform, save_account: event.target.checked });
    } else {
      setform({ ...stateform, [event.target.name]: event.target.value });
    }
  };
  const handleChangeEdit = event => {
    if (event.target.name === "edit_save_account") {
      setformEdit({ ...stateformEdit, edit_include: event.target.checked });
    } else {
      setformEdit({
        ...stateformEdit,
        [event.target.name]: event.target.value
      });
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (stateform.badge === 0) {
    } else {
      let save_account = stateform.save_account ? 1 : 0;
      API.post("add_data", {
        id: 2,
        idu: localStorage.getItem("IdUser"),
        name: stateform.catego,
        descrip: stateform.descrip,
        divisa: stateform.badge,
        monto: stateform.monto,
        save: save_account
      }).then(response => {
        console.log(response);
        ModNewCateSate();
        ChangeStateAccount();
        setrefreshData(!refreshData);
        setSateAlert({ visible: true, code: response.data });
        setTimeout(() => {
          setSateAlert({ visible: false, code: 0 });
        }, 2000);
      });
    }
  };

  const handleSubmitMovi = event => {
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
        event: stateform.event ? stateform.event : ''
      }).then(response => {
        //alert (response.data);
        setrefreshData(!refreshData);
        ModNewMoviSate();
        document.getElementById("btn_new_move_dash").innerHTML = "Add";
        document.getElementById("btn_new_move_dash").disabled = false;
        setform({
          catego: "",
          descrip: "",
          badge: "COP",
          monto: null,
          save_account: false
        });
        setSignal({ Signal: "+" });
        setSateAlert({ visible: true, code: response.data });
        setTimeout(() => {
          setSateAlert({ visible: false, code: 0 });
        }, 2000);
      });
    }
  };
  const handleSubmit_trans = event => {
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
      API.post("add_data", {
        id: 4,
        idu: localStorage.getItem("IdUser"),
        acco_frist: stateformtrans.account_ini,
        value: stateformtrans.monto,
        divisa: stateformtrans.badge,
        acco_sec: stateformtrans.account_fin,
        descri: stateformtrans.descrip,
        date: stateformtrans.datetime,
        trm: stateformtrans.trm,
        customDeposit: stateformtrans.customDeposit,
        inBadge: stateformtrans.inBadge
      }).then(response => {
        //alert (response.data);
        setrefreshData(!refreshData);
        ModNewTransSate();
        setformtrans({
          monto: null,
          badge: "COP",
          account_ini: 0,
          account_fin: 0,
          datetime: "",
          descrip: "",
          trm: 1,
          customDeposit: 0,
          inBadge: "COP"
        })
        document.getElementById("btn_new_trans_dash").innerHTML = "Add";
        document.getElementById("btn_new_trans_dash").disabled = false;
        setSateAlert({ visible: true, code: response.data });
        setTimeout(() => {
          setSateAlert({ visible: false, code: 0 });
        }, 2000);
      });
    }
  };
  const handleSubmitEdit = event => {
    event.preventDefault();
    if (stateformEdit.badge === 0) {
    } else {
      let idc = localStorage.getItem("IdUser");
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
        save_account: include
      }).then(response => {
        console.log(response);
        ModEdiCateSate();
        ChangeStateAccount();
        setrefreshData(!refreshData);
        setSateAlert({ visible: true, code: response.data });
        setTimeout(() => {
          setSateAlert({ visible: false, code: 0 });
        }, 2000);
      });
    }
  };
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <div className="col justify-content-end row p-0 m-0">
          <Button className="btn-info mb-3" onClick={e => OpenModalMovi(e)}>
            <i className="fas fa-plus mr-2"></i>
            Move
          </Button>
          <Button className="btn-success mb-3" onClick={e => OpenModalTrans(e)}>
            <i className="fas fa-exchange-alt mr-2"></i>
            Transfer
          </Button>
        </div>
        <AcountAdd
          state={state}
          OpenModalNew={OpenModalNew}
          OpenModalEdit={OpenModalEdit}
          OpenModalDelete={OpenModalDelete}
          OpenModalShare={OpenModalShare}
        />
        <ModalAcountAdd
          showNewMod={showNewMod}
          ModNewCateSate={ModNewCateSate}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
        <ModalAddMovement
          stateSignal={stateSignal}
          ChangeSignal={ChangeSignal}
          VerifySignal={VerifySignal}
          handleChange={handleChange}
          stateAcount={stateAcount}
          stateCatego={stateCatego}
          stateEvent={stateEvent}
          stateform={stateform}
          showNewModMovi={showNewModMovi}
          handleSubmitMovi={handleSubmitMovi}
          ModNewMoviSate={ModNewMoviSate}
        />
        <Modaldelete
          action="account"
          title="Delete account"
          message={
            "Are you sure delete the account " +
            stateformEdit.edit_account +
            "?"
          }
          refreshData={refreshData}
          setrefreshData={setrefreshData}
          state={stateformEdit}
          showDelMod={showDelMod}
          setshowDelMod={setshowDelMod}
          setSateAlert={setSateAlert}
        />
        <ModalshareAccount
          title="Share account"
          message={
            "Are you sure share the account " + stateformEdit.edit_account + "?"
          }
          refreshData={refreshData}
          setrefreshData={setrefreshData}
          state={stateformEdit}
          showShareMod={showShareMod}
          setshowShareMod={setshowShareMod}
          setSateAlert={setSateAlert}
        />
        <ModalEditAcount
          showEdiMod={showEdiMod}
          ModEdiCateSate={ModEdiCateSate}
          handleSubmitEdit={handleSubmitEdit}
          stateformEdit={stateformEdit}
          handleChangeEdit={handleChangeEdit}
        />
        <ModalTranfer
          showNewTransMod={showNewTransMod}
          handleSubmit_trans={handleSubmit_trans}
          stateSignal={stateSignal}
          VerifySignal={VerifySignal}
          stateCatego={stateCatego}
          handleChangeTrans={handleChangeTrans}
          ModNewTransSate={ModNewTransSate}
          stateformtrans={stateformtrans}
        />
        <Alert visible={stateAlert.visible} code={stateAlert.code} />
      </Container>
    </>
  );
}

export default Account;
