import { useState, useEffect } from "react";
import axios from "axios";

import API from "variables/API";

const usePlanned = () => {
  const [contextMenu, setContextMenu] = useState(null);
  const [state, setState] = useState([]);
  const [refreshData, setrefreshData] = useState(false);
  const [stateSignal, setSignal] = useState({ Signal: "+" });
  const [stateAcount, setAcount] = useState([]);

  const [stateform, setform] = useState({
    category: "",
    descrip: "",
    badge: "COP",
    value: 0,
    frequency: "0",
    recurrency: "",
    startDate: null,
    endDate: null,
  });

  const [stateformEdit, setformEdit] = useState({
    catego: "",
    description: "",
    account: "",
    badge: "COP",
    monto: 0,
    frequency: "0",
    recurrency: "",
    startDate: null,
    endDate: null,
    id_data: 0,
  });

  const translateRecu = {
    "-1.00": "Specific Day",
    "0.70": "Weekly",
    "0.15": "Biweekly",
    "1.00": "Monthly",
    "2.00": "Bimonthly",
    "3.00": "Trimestraly",
    "4.00": "Quarterly",
    "6.00": "Biannual",
    "12.00": "Yearly",
  };

  const [showNewMod, setshowNewMod] = useState(false);
  const [showDelMod, setshowDelMod] = useState(false);
  const [showEdiMod, setshowEdiMod] = useState(false);
  const [stateCatego, setCatego] = useState([]);
  const [stateAlert, setSateAlert] = useState({ visible: false, code: 200 });

  const ModNewPlannedSate = () => setshowNewMod(!showNewMod);
  const ModDelCateSate = () => setshowDelMod(!showDelMod);
  const ModEdiEventSate = () => setshowEdiMod(!showEdiMod);

  useEffect(() => {
    let idc = localStorage.getItem("IdUser");
    API.post("acount", {
      id: 15,
      idc: idc,
    }).then((response) => {
      //console.log(response.data);
      setState(response.data);
    });
    setform({
      ...stateform,
      startDate: `${new Date().getFullYear()}-${`${
        new Date().getMonth() + 1
      }`.padStart(2, 0)}-${`${new Date().getDate()}`.padStart(2, 0)}`,
    });
   
  }, [refreshData]);

  const handleChange = (event) => {
    if(event.target.name === 'repeat' && event.target.value === '0') {
      setform({ ...stateform, endDate: '', [event.target.name]: event.target.value });
    } else {
      setform({ ...stateform, [event.target.name]: event.target.value });
    }
  };
  const handleChangeEdit = (event) => {
    setformEdit({ ...stateformEdit, [event.target.name]: event.target.value });
  };

  const OpenModalNew = (e) => {
    e.preventDefault();
    let idc = localStorage.getItem("IdUser");
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
    ModNewPlannedSate();
  };
  const OpenModalDelete = (e) => {
    e.preventDefault();
    ModDelCateSate();
  };
  const OpenModalEdit = (e, data) => {
    e.preventDefault();
    let idc = localStorage.getItem("IdUser");
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
          setformEdit({
            category: data.category,
            account: data.account,
            description: data.description,
            badge: data.badge,
            value: data.value < 0 ? data.value * -1 : data.value,
            frequency: data.fequency,
            recurrency: data.recurrency,
            startDate: data.startDate,
            endDate: data.endDate,
            categoryName: data.categoryName,
            accountName: data.accountName,
            specificDay: data.specificDay,
            signal: data.value < 0 ? "-" : "+",
            repeat: stateformEdit.endDate === '0000-00-00' ? 0 : 1,
            id_data: data.id,
          });
          ModEdiEventSate();
        })
      );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      stateform.startDate === "" ||
      stateform.account === "" ||
      stateform.value === "" ||
      stateform.category === ""
    ) {
      setSateAlert({ visible: true, code: 1 });
      setTimeout(() => {
        setSateAlert({ visible: false, code: 0 });
      }, 2000);
    } else {
      API.post("add_data", {
        id: 9,
        idu: localStorage.getItem("IdUser"),
        value: stateform.value,
        badge: stateform.badge,
        account: stateform.account,
        category: stateform.category,
        startDate: stateform.startDate,
        frequency: stateform.frequency,
        recurrency: stateform.recurrency,
        specificDay: stateform.specificDay,
        endDate: stateform.endDate,
        description: stateform.description,
      }).then((response) => {
        //alert(response.data);
        ModNewPlannedSate();
        setrefreshData(!refreshData);
        setSignal({ Signal: "+" });
        setSateAlert({ visible: true, code: response.data });
        setform({frequency: '0', repeat: '0'})
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
            onClickEdit: (event) => {
              OpenModalEdit(event, data);
            },
          }
        : null
    );
  };
  const handleClose = () => {
    setContextMenu(null);
  };
  const ChangeSignal = (event) => {
    setSignal({ Signal: event.target.value !== "+" ? "+" : "-" });
  };
  const VerifySignal = (event, idSigno) => {
    if (event.target.value < 0) {
      if (idSigno !== "") {
        setSignal({ Signal: "-" });
      }
      event.target.value = event.target.value * -1;
      setform({ ...stateform, [event.target.name]: event.target.value * -1 });
    } else {
      setform({
        ...stateform,
        [event.target.name]:
          stateSignal.Signal === "+"
            ? event.target.value
            : event.target.value * -1,
      });
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
          dangerouslySetInnerHTML={{__html: '&nbsp;'.repeat(category.lvl - 1) + category.name}}
        />
        {category.subCategories?.length > 0 &&
          renderRecursion(category.subCategories)}
      </>
    ));
  };

    return {
        state,
    handleContextMenu,
    OpenModalEdit,
    translateRecu,
    contextMenu,
    handleClose,
    OpenModalNew,
    stateAlert,
    showNewMod,
    ModNewPlannedSate,
    handleSubmit,
    stateSignal,
    ChangeSignal,
    VerifySignal,
    stateAcount,
    handleChange,
    stateCatego,
    renderRecursion,
    stateform,
    stateformEdit,
    refreshData,
    setrefreshData,
    showDelMod,
    setshowDelMod,
    setSateAlert,
    showEdiMod,
    setshowEdiMod,
    handleChangeEdit,
    OpenModalDelete,
    setformEdit,
    }
}

export default usePlanned