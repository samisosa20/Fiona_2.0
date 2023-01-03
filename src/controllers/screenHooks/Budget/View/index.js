import { useState, useEffect } from "react";

import API from "variables/API";

const useBudgetView = () => {
  const [state, setState] = useState([]);
  const [showDelMod, setshowDelMod] = useState(false);
  const [stateAlert, setSateAlert] = useState({ visible: false, code: 200 });
  const [stateBudget, setstateBudget] = useState({
    number: 0,
    name: "",
    data: [],
  });
  const [stateEdit, setstateEdit] = useState({
    pass: 0,
    mounth: "",
    value: 0.0,
    id_data: 0,
  });
  let url = window.location.href;
  let div = url.split("/");
  let year = div[5];
  let aux_catego = "";
  let aux_cat_print = "";
  let acumulado_print = 0.0;
  let acumulado = 0.0;
  let utilidad = 0.0;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  /* Declaracion de estados de los modals */
  const [showMounthMod, setshowMounthMod] = useState(false);
  const [showEditMod, setEditMod] = useState(false);
  const [refreshData, setrefreshData] = useState(false);

  // Funcion para cambiar de estado de los modals
  const ModMounthSate = () => setshowMounthMod(!showMounthMod);
  const ModEditSate = () => setEditMod(!showEditMod);
  const ModDelCateSate = () => setshowDelMod(!showDelMod);

  useEffect(() => {
    var idc = localStorage.getItem("IdUser");
    API.post("acount", {
      id: 10,
      idc: idc,
      year: year,
    }).then((response) => setState(response.data));
  }, [refreshData]);

  const handleChange = (event) => {
    setstateEdit({ ...stateEdit, [event.target.name]: event.target.value });
  };
  // Accion al abrir los modals
  const OpenModalListMounth = (e, name_catego, number_cate, year) => {
    e.preventDefault();
    var idc = localStorage.getItem("IdUser");
    API.post("acount", {
      id: 11,
      idc: idc,
      cate: number_cate,
      year: year,
    }).then((response) =>
      setstateBudget({
        number: number_cate,
        name: name_catego,
        data: response.data,
      })
    );
    ModMounthSate();
  };

  const OpenModalEdit = (e, id, nro_mes, mes, year, value) => {
    e.preventDefault();
    let mounth = new Date().getMonth() + 1;
    let year_now = new Date().getFullYear();
    ModEditSate();
    if (nro_mes < mounth && parseInt(year) === year_now) {
      setstateEdit({ pass: 0, mounth: mes, value: value });
    } else {
      setstateEdit({ pass: 1, mounth: mes, value: value, id_data: id });
    }
  };
  const OpenModalDelete = (e) => {
    e.preventDefault();
    ModDelCateSate();
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    if (stateEdit.value < 0 || stateEdit.value === "") {
      alert("Value has to positive");
    } else {
      document.getElementById("btn_save_budget").disabled = true;
      document.getElementById("btn_save_budget").innerHTML =
        "<span class='spinner-border spinner-border-sm mr-1'" +
        "role='status' aria-hidden='true'></span>Loading...";
      let idc = localStorage.getItem("IdUser");
      API.post("edit_data", {
        id: 6,
        idu: idc,
        mounth: stateEdit.mounth,
        id_data: stateEdit.id_data,
        value: stateEdit.value,
      }).then((response) => {
        //alert (response.data);
        ModEditSate();
        document.getElementById("value_mounth_" + stateEdit.id_data).innerHTML =
          formatter.format(stateEdit.value);
        document.getElementById("btn_save_budget").innerHTML = "Save Changes";
        document.getElementById("btn_save_budget").disabled = false;
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
        }, 2000);
      });
    }
  };

  return {
    state,
    aux_catego,
    utilidad,
    acumulado,
    OpenModalListMounth,
    year,
    formatter,
    showDelMod,
    setshowDelMod,
    ModDelCateSate,
    refreshData,
    setrefreshData,
    stateBudget,
    ModMounthSate,
    setSateAlert,
    showEditMod,
    ModEditSate,
    stateAlert,
    aux_cat_print,
    acumulado_print,
    showMounthMod,
    OpenModalEdit,
    OpenModalDelete,
    handleSubmitEdit,
    stateEdit,
    handleChange,
  };
};

export default useBudgetView;
