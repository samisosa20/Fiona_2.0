import { useState, useEffect } from "react";

import API from "variables/API";

const useBudgetCreate = () => {
  const [stateForm, setStateForm] = useState({
    mounth: 1,
    value: 0.0,
    action: 2,
    catego: "",
    mode: 0,
    badge: "",
    year: 0,
    replica: 0,
  });
  const [stateCatego, setCatego] = useState([]);
  let year = new Date().getFullYear();

  /* Declaracion de estados de los modals */
  const [ShowStep1, SetShowStep1] = useState(false);
  const [stateAlert, setSateAlert] = useState({ visible: false, code: 200 });
  const [ShowStep2, SetShowStep2] = useState(false);
  const [refreshData /* setrefreshData */] = useState(false);

  // Funcion para cambiar de estado de los modals
  const ModStep1 = () => SetShowStep1(!ShowStep1);
  const ModStep2 = () => SetShowStep2(!ShowStep2);

  useEffect(() => {
    /*var idc = localStorage.getItem("IdUser");
        API.post("acount", {
          id: 10,
          idc: idc,
          year: year,
        }).then((response) => setState(response.data));*/
  }, [refreshData]);

  const handleChange = (event) => {
    setStateForm({ ...stateForm, [event.target.name]: event.target.value });
    if (
      "mode".localeCompare([event.target.name]) === 0 &&
      parseInt(event.target.value) > 1
    ) {
      setStateForm({ ...stateForm, action: 1, mode: event.target.value });
    }
    if (
      "mode".localeCompare([event.target.name]) === 0 &&
      parseInt(event.target.value) === 1
    ) {
      setStateForm({ ...stateForm, action: 2, mode: event.target.value });
    }
  };
  // Accion al abrir los modals
  const OpenModalStep2 = (e) => {
    e.preventDefault();
    let catego = document.getElementById("catego");
    let mode = document.getElementById("mode");
    if (catego.value !== 0 && mode.value !== 0) {
      catego.className = "mt-4 form-control is-valid";
      mode.className = "mt-4 form-control is-valid";
      setStateForm({ ...stateForm, mounth: 1 });
      ModStep2();
    } else {
      if (catego.value !== 0) {
        catego.className = "mt-4 form-control is-valid";
      } else {
        catego.className = "mt-4 form-control is-invalid";
      }
      if (mode.value !== 0) {
        mode.className = "mt-4 form-control is-valid";
      } else {
        mode.className = "mt-4 form-control is-invalid";
      }
    }
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

  const OpenModalStep1 = (e) => {
    e.preventDefault();
    let year = document.getElementById("year");
    let badge = document.getElementById("badge");
    if (year.value !== 0 && badge.value !== 0) {
      year.className = "mt-4 form-control is-valid";
      badge.className = "mt-4 form-control is-valid";
      API.post("acount", {
        id: 5,
        idc: localStorage.getItem("IdUser"),
      }).then((response) => setCatego(response.data));
      ModStep1();
    } else {
      if (year.value !== 0) {
        year.className = "mt-4 form-control is-valid";
      } else {
        year.className = "mt-4 form-control is-invalid";
      }
      if (badge.value !== 0) {
        badge.className = "mt-4 form-control is-valid";
      } else {
        badge.className = "mt-4 form-control is-invalid";
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (stateForm.value < 0 || stateForm.value === "" || stateForm.mode === 0) {
      alert("Value has to positive");
    } else {
      let replicar_val = 0;
      if (stateForm.mounth === 1 && stateForm.action === 2) {
        if (document.getElementById("replica").checked) {
          replicar_val = 1;
        }
      }
      document.getElementById("btn_save_budget").disabled = true;
      document.getElementById("btn_save_budget").innerHTML =
        "<span class='spinner-border spinner-border-sm mr-1'" +
        "role='status' aria-hidden='true'></span>Loading...";
      //console.log(stateForm);
      API.post("add_data", {
        id: 5,
        idu: localStorage.getItem("IdUser"),
        action: stateForm.action,
        month_frist: stateForm.mounth,
        value: stateForm.value,
        catego: stateForm.catego,
        mode: stateForm.mode,
        divisa: stateForm.badge,
        replica: replicar_val,
        year: stateForm.year,
      }).then((response) => {
        setSateAlert({ visible: true, code: response.data });
        setTimeout(() => {
          setSateAlert({ visible: false, code: 0 });
        }, 2000);
        //alert(response.data);
        if (stateForm.action === 1 || replicar_val === 1) {
          ModStep2();
          document.getElementById("btn_save_budget").innerHTML = "Next";
          document.getElementById("btn_save_budget").disabled = false;
        } else {
          if (stateForm.mounth < 12) {
            document.getElementById("mounth").value = stateForm.mounth + 1;
            document.getElementById("value").value = 0.0;
            setStateForm({
              ...stateForm,
              mounth: stateForm.mounth++,
            });
            setStateForm({ ...stateForm, value: 0.0 });
            document.getElementById("btn_save_budget").innerHTML = "Next";
            document.getElementById("btn_save_budget").disabled = false;
          } else {
            document.getElementById("mounth").value = 1;
            document.getElementById("value").value = 0.0;
            setStateForm({ ...stateForm, mounth: 1 });
            setStateForm({ ...stateForm, value: 0.0 });
            document.getElementById("btn_save_budget").innerHTML = "Finish";
            document.getElementById("btn_save_budget").disabled = false;
          }
        }
      });
    }
  };
  return {
    handleChange,
    year,
    OpenModalStep1,
    ShowStep1,
    ModStep1,
    stateCatego,
    renderRecursion,
    OpenModalStep2,
    ShowStep2,
    ModStep2,
    handleSubmit,
    stateForm,
    stateAlert,
  };
};

export default useBudgetCreate;
