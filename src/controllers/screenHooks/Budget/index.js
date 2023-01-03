import { useState, useEffect } from "react";

import API from "variables/API";

const useBudget = () => {
  const [contextMenu, setContextMenu] = useState(null);
  const [yearPaste, setYearPaste] = useState(null);
  const [state, setState] = useState([]);
  const [stateDelete, setStateDelete] = useState([]);
  const [showDelMod, setDelMod] = useState(false);
  const [showCopyMod, setCopyMod] = useState(false);
  const [refreshData, setrefreshData] = useState(false);
  const [stateAlert, setSateAlert] = useState({ visible: false, code: 200 });
  let year = new Date().getFullYear();

  useEffect(() => {
    var idc = localStorage.getItem("IdUser");
    API.post("acount", {
      id: 9,
      idc: idc,
    }).then((response) => setState(response.data));
  }, [refreshData]);

  // Funcion para cambiar de estado de los modals
  const ModDelCateSate = () => setDelMod(!showDelMod);
  const ModCopyBudgetSate = () => setCopyMod(!showCopyMod);

  const OpenModalDelete = (e, id, year) => {
    e.preventDefault();
    setStateDelete({
      year: year,
      id_data: id,
    });
    ModDelCateSate();
  };
  const OpenModalCopy = (e, id, year) => {
    e.preventDefault();
    setStateDelete({
      year: year,
      id_data: id,
    });
    ModCopyBudgetSate();
  };

  // Eliminar data
  const handleDelete = (e, year) => {
    e.preventDefault();
    let idc = localStorage.getItem("IdUser");
    document.getElementById("btn_delete_budget_year").disabled = true;
    document.getElementById("btn_delete_budget_year").innerHTML =
      "<span class='spinner-border spinner-border-sm mr-1'" +
      "role='status' aria-hidden='true'></span>Loading...";
    API.post("delete_data", {
      id: 4,
      idu: idc,
      year: year,
    }).then((response) => {
      document.getElementById("btn_delete_budget_year").disabled = false;
      document.getElementById("btn_delete_budget_year").innerHTML = "Delete";
      setSateAlert({ visible: true, code: response.data });
      setTimeout(() => {
        setSateAlert({ visible: false, code: 0 });
      }, 2000);
      ModDelCateSate();
      setrefreshData(!refreshData);
    });
  };

  const handleCopy = (e) => {
    e.preventDefault();
    document.getElementById("btn_copy_budget_year").disabled = true;
    document.getElementById("btn_copy_budget_year").innerHTML =
      "<span class='spinner-border spinner-border-sm mr-1'" +
      "role='status' aria-hidden='true'></span>Loading...";
    API.post("add_data", {
      id: 8,
      idu: localStorage.getItem("IdUser"),
      yearCopy: stateDelete.year,
      yearPaste: yearPaste,
    }).then((response) => {
      document.getElementById("btn_copy_budget_year").disabled = false;
      document.getElementById("btn_copy_budget_year").innerHTML = "Confirm";
      setSateAlert({ visible: true, code: response.data });
      setTimeout(() => {
        setSateAlert({ visible: false, code: 0 });
      }, 2000);
      ModCopyBudgetSate();
      setrefreshData(!refreshData);
    });
  };

  const handleContextMenu = (event, data) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            onClickDelete: (e) => OpenModalDelete(e, data.id, data.year),
            onClickCopy: (e) => OpenModalCopy(e, data.id, data.year),
          }
        : null
    );
  };
  const handleClose = () => {
    setContextMenu(null);
  };
  return {
    state,
    contextMenu,
    handleClose,
    showDelMod,
    ModDelCateSate,
    showCopyMod,
    ModCopyBudgetSate,
    stateAlert,
    stateDelete,
    handleDelete,
    setYearPaste,
    year,
    handleCopy,
    yearPaste,
    handleContextMenu,
  };
};

export default useBudget;
