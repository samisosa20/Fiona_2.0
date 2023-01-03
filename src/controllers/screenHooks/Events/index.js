import { useState, useEffect } from "react";

import API from "variables/API";

const useEvent = () => {
  const [contextMenu, setContextMenu] = useState(null);
  const [state, setState] = useState([]);
  const [refreshData, setrefreshData] = useState(false);

  const [stateform, setform] = useState({
    namevent: "",
    endingdate: "",
  });

  const [stateformEdit, setformEdit] = useState({
    edit_namevent: "",
    prevName: "",
    edit_endingdate: "",
    id_data: 0,
  });

  const [listMove, setlistMove] = useState({});

  const [showNewMod, setshowNewMod] = useState(false);
  const [showDelMod, setshowDelMod] = useState(false);
  const [showEdiMod, setshowEdiMod] = useState(false);
  const [showListMove, setShowListMove] = useState(false);
  const [stateCatego, setStateCatego] = useState(false);
  const [stateAlert, setSateAlert] = useState({ visible: false, code: 200 });

  const ModNewEventSate = () => setshowNewMod(!showNewMod);
  const ModListMove = () => setShowListMove(!showListMove);
  const ModDelCateSate = () => setshowDelMod(!showDelMod);
  const ModEdiEventSate = () => setshowEdiMod(!showEdiMod);
  const ChangeStateCatego = () => setStateCatego(!stateCatego);

  useEffect(() => {
    let idc = localStorage.getItem("IdUser");
    API.post("acount", {
      id: 12,
      idc: idc,
    }).then((response) => {
      //console.log(response.data);
      setState(response.data);
    });
  }, [refreshData]);

  const handleChange = (event) => {
    setform({ ...stateform, [event.target.name]: event.target.value });
  };
  const handleChangeEdit = (event) => {
    setformEdit({ ...stateformEdit, [event.target.name]: event.target.value });
  };

  const OpenModalNew = (e) => {
    e.preventDefault();
    ModNewEventSate();
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
  const OpenModalEdit = (e, id, name, endDate) => {
    e.preventDefault();
    setformEdit({
      edit_namevent: name,
      prevName: name,
      edit_endingdate: endDate,
      id_data: id,
    });
    ModEdiEventSate();
  };
  const openListModal = (event) => {
    let idc = localStorage.getItem("IdUser");
    API.post("acount", {
      id: 13,
      idc: idc,
      event: event,
    }).then((response) => {
      ModListMove();
      setlistMove(response.data);
      //console.log(response.data);
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (stateform.namevent === "" || stateform.endingdate === "") {
      setSateAlert({ visible: true, code: 1 });
      setTimeout(() => {
        setSateAlert({ visible: false, code: 0 });
      }, 2000);
    } else {
      let idc = localStorage.getItem("IdUser");
      API.post("add_data", {
        id: 6,
        idu: idc,
        name: stateform.namevent,
        date: stateform.endingdate,
      }).then((response) => {
        //alert(response.data);
        ModNewEventSate();
        ChangeStateCatego();
        setrefreshData(!refreshData);
        setSateAlert({ visible: true, code: response.data });
        setTimeout(() => {
          setSateAlert({ visible: false, code: 0 });
        }, 2000);
      });
    }
  };

  const handleContextMenu = (event, data) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            onClickEdit: (e) =>
              OpenModalEdit(e, data.id, data.nombre, data.fecha_fin),
          }
        : null
    );
  };
  const handleClose = () => {
    setContextMenu(null);
  };
  return {
    state,
    handleContextMenu,
    openListModal,
    contextMenu,
    handleClose,
    OpenModalNew,
    stateAlert,
    showNewMod,
    handleSubmit,
    handleChange,
    stateformEdit,
    refreshData,
    setrefreshData,
    showDelMod,
    setshowDelMod,
    setSateAlert,
    setformEdit,
    showEdiMod,
    setshowEdiMod,
    handleChangeEdit,
    OpenModalDelete,
    showListMove,
    ModListMove,
    listMove,
    ModNewEventSate,
  };
};

export default useEvent;
