import { useState, useEffect } from "react";
import TrmApi from "trm-api";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import API from "variables/API";

const useMovements = () => {
  const [state, setState] = useState({
    NameAcount: "",
    json_movi: [],
    Balance: 0,
    Divisa: "",
    Descripcion: "",
  });
  const [moveJson, setMoveJson] = useState([]);
  const [stateform, setform] = useState({
    monto: null,
    badge: "COP",
    catego: 0,
    descrip: "",
    datetime: "",
  });
  const [stateformtrans, setformtrans] = useState({
    monto: null,
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
  const [listAccount, setListAccount] = useState([]);
  const [refreshData, setrefreshData] = useState(false);
  const [stateAlert, setSateAlert] = useState({ visible: false, code: 200 });
  const [showOption, setShowOption] = useState(false);

  const [showNewMod, setshowNewMod] = useState(false);
  const [showNewTransMod, setshowNewTransMod] = useState(false);
  const [showEditsMod, setshowEditMod] = useState(false);
  const [showEditsTransMod, setshowEditTransMod] = useState(false);
  const [showDelMod, setshowDelMod] = useState(false);
  const [stateSignal, setSignal] = useState({ Signal: "+" });

  const params = useParams();
  const histoy = useHistory();
  let acount = params.id;
  let idc = localStorage.getItem("IdUser");

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
          API.post(`acount`, {
            id: 2,
            idc: idc,
            acount: acount,
          }),
        ])
        .then(
          axios.spread((firstResponse, secondResponse, accountsResponse) => {
            setState({
              NameAcount: firstResponse.data[0].nombre,
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
            setListAccount(accountsResponse.data);
          })
        );
    }
    loadDataMove();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshData, params.id]);

  const ModNewMoviSate = () => setshowNewMod(!showNewMod);
  const ModNewTransSate = () => setshowNewTransMod(!showNewTransMod);
  const ModEditSate = () => setshowEditMod(!showEditsMod);
  const ModEditTransSate = () => setshowEditTransMod(!showEditsTransMod);
  const ModDelCateSate = () => setshowDelMod(!showDelMod);
  const showAdvanceOption = () => setShowOption(!showOption);

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
      customDeposit:
        parseFloat(trm).toFixed(2) > 1
          ? parseFloat(valor_int / trm).toFixed(2)
          : parseFloat(valor_int * trm).toFixed(2),
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
        stateformEditTrans.badge === "COP" &&
        stateformEditTrans.editInBadge === "USD"
          ? parseFloat(stateformEditTrans.monto / event.target.value).toFixed(2)
          : parseFloat(stateformEditTrans.monto * event.target.value).toFixed(
              2
            );
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
    let value = event.target.value ? event.target.value * 1 : null;
    let signo = document.getElementById(idSigno);
    if (value < 0) {
      if (idSigno !== "") {
        setSignal({ Signal: "-" });
        signo.className = "btn btn-outline-danger";
      }
      value = value * -1;
    }

    if (idSigno === "signo_move") {
      setform({ ...stateform, [event.target.name]: value });
    } else if (idSigno === "signo_move_edit") {
      setformEdit({
        ...stateformEdit,
        [event.target.name]: value,
      });
    } else if (idSigno === "signo_trans_edit") {
      const customDeposit =
        stateformEditTrans.badge === "COP" &&
        stateformEditTrans.editInBadge === "USD"
          ? parseFloat(value / stateformEditTrans.trm).toFixed(2)
          : parseFloat(value * stateformEditTrans.trm).toFixed(2);
      setformEditTrans({
        ...stateformEditTrans,
        [event.target.name]: value,
        customDeposit: customDeposit,
      });
    } else {
      const customDeposit =
        stateformtrans.badge === "COP" && stateformtrans.inBadge === "USD"
          ? parseFloat(value / stateformtrans.trm).toFixed(2)
          : parseFloat(value * stateformtrans.trm).toFixed(2);
      setformtrans({
        ...stateformtrans,
        [event.target.name]: value,
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
          monto: null,
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
          monto: null,
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
    const newJson = moveJson.filter((data) => data.categoria.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
    -1 ||
  data.valor_int.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
    -1 ||
  data.descripcion.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
    -1 ||
  data.fecha.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);
    setState({ ...state, json_movi: newJson });
  };
  const handleChangeAccount = (e) => {
    histoy.push("/admin/move/" + e.target.value);
  };
  const renderRecursion = (listCategories) => {
    return listCategories.map((category) => (
      <>
        <option
          key={category.id + category.name}
          className={
            category.lvl === 1 || category.subCategories?.length > 0
              ? "font-weight-bold"
              : ""
          }
          value={category.id}
          dangerouslySetInnerHTML={{
            __html: "&nbsp;".repeat(category.lvl - 1) + category.name,
          }}
        />
        {category.subCategories?.length > 0 &&
          renderRecursion(category.subCategories)}
      </>
    ));
  };
  return {
    handleChangeAccount,
    acount,
    listAccount,
    OpenModalTrans,
    state,
    searchMove,
    OpenModalEdit,
    OpenModalMovi,
    OpenModalEditTras,
    stateAlert,
    showNewMod,
    ModNewMoviSate,
    handleSubmit,
    stateSignal,
    ChangeSignal,
    stateform,
    VerifySignal,
    handleChange,
    stateCatego,
    renderRecursion,
    showAdvanceOption,
    showOption,
    stateEvent,
    showNewTransMod,
    ModNewTransSate,
    handleSubmit_trans,
    stateformtrans,
    handleChangeTrans,
    showEditsMod,
    ModEditSate,
    handleSubmitEdit,
    stateformEdit,
    handleChangeEdit,
    OpenModalDelete,
    refreshData,
    setrefreshData,
    showDelMod,
    setshowDelMod,
    ModEditTransSate,
    setSateAlert,
    showEditsTransMod,
    handleSubmitEditTrans,
    stateformEditTrans,
    handleChangeEditTrans,
  };
};

export default useMovements;
