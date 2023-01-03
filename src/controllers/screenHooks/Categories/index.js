import { useState, useEffect } from "react";

// Variables
import API from "variables/API";

const useCategories = () => {
  const [contextMenu, setContextMenu] = useState(null);
  const [state, setState] = useState({ jsonCatego: [], lvl: 0 });
  const [refreshData, setrefreshData] = useState(false);

  const [stateform, setform] = useState({
    catego: "",
    descrip: "",
    group: 0,
    include: 0,
  });

  const [stateformEdit, setformEdit] = useState({
    edit_categor: "",
    edit_descrip: "",
    edit_group: 0,
    edit_include: 0,
    id_data: 0,
  });

  const [showNewMod, setshowNewMod] = useState(false);
  const [showDelMod, setshowDelMod] = useState(false);
  const [showEdiMod, setshowEdiMod] = useState(false);
  const [stateCatego, setStateCatego] = useState(false);
  const [stateAlert, setSateAlert] = useState({ visible: false, code: 200 });

  const ModNewCateSate = () => setshowNewMod(!showNewMod);
  const ModDelCateSate = () => setshowDelMod(!showDelMod);
  const ModEdiCateSate = () => setshowEdiMod(!showEdiMod);
  const ChangeStateCatego = () => setStateCatego(!stateCatego);

  useEffect(() => {
    let url = window.location.href;
    let div = url.split("#");
    let lvl = div[1];
    let idc = localStorage.getItem("IdUser");
    setform({ ...stateform, include: lvl ? lvl : 0 });
    API.post("acount", {
      id: 4,
      idc: idc,
      lvl: lvl,
    }).then((response) => setState({ jsonCatego: response.data, lvl: lvl }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshData]);

  const handleChange = (event) => {
    setform({ ...stateform, [event.target.name]: event.target.value });
  };
  const handleChangeEdit = (event) => {
    setformEdit({ ...stateformEdit, [event.target.name]: event.target.value });
  };

  const OpenModalNew = (e) => {
    e.preventDefault();
    ModNewCateSate();
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
  const OpenModalEdit = (e, id, catego, descrip, group, include) => {
    e.preventDefault();
    setformEdit({
      edit_categor: catego,
      edit_descrip: descrip,
      edit_group: group,
      edit_include: include,
      id_data: id,
    });
    ModEdiCateSate();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (stateform.group === 0) {
    } else {
      let idc = localStorage.getItem("IdUser");
      API.post("add_data", {
        id: 1,
        idu: idc,
        name: stateform.catego,
        descrip: stateform.descrip,
        group: stateform.group,
        catego: stateform.include,
      }).then((response) => {
        //alert(response.data);
        ModNewCateSate();
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
              OpenModalEdit(
                e,
                data.id,
                data.categoria,
                data.descripcion,
                data.grupo,
                data.sub_categoria
              ),
            onClickDelete: (e) => OpenModalDelete(e, data.id, data.categoria),
          }
        : null
    );
  };
  const handleClose = () => {
    setContextMenu(null);
  };

  return {
    state,
    setrefreshData,
    refreshData,
    handleContextMenu,
    contextMenu,
    handleClose,
    OpenModalNew,
    stateAlert,
    showNewMod,
    ModNewCateSate,
    handleSubmit,
    handleChange,
    stateformEdit,
    showDelMod,
    setshowDelMod,
    setSateAlert,
    setformEdit,
    showEdiMod,
    setshowEdiMod,
    handleChangeEdit,
  };
};

export default useCategories;
