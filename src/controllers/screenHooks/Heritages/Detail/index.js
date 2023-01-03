import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import API from "variables/API";

const useHeritagesDetail = () => {
  const { year } = useParams();
  const history = useHistory()
  const [listHeritage, setListHeritage] = useState([]);
  const [listHeritageDetail, setListHeritageDetail] = useState([]);
  const [stateAlert, setSateAlert] = useState({ visible: false, code: 200 });
  const [refreshData, setrefreshData] = useState(false);
  const [showNewMod, setshowNewMod] = useState(false);
  const [showDelMod, setshowDelMod] = useState(false);
  const [showEdiMod, setshowEdiMod] = useState(false);

  const [stateform, setform] = useState({
    badge: localStorage.getItem("Divisa"),
    legal_value: 0,
    comercial_value: 0,
  });
  const [stateformEdit, setStateformEdit] = useState({
    badge: localStorage.getItem("Divisa"),
    legal_value: 0,
    comercial_value: 0,
  });

  const formatting_options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };
  // users can see how locale passed as a parameter.
  const dollarString = new Intl.NumberFormat("en-US", formatting_options);

  const ModNewHeritageSate = () => setshowNewMod(!showNewMod);
  const ModDelHeritageSate = () => setshowDelMod(!showDelMod);
  const ModEdiHeritageSate = () => setshowEdiMod(!showEdiMod);

  const handleSubmit = (e) => {
    e.preventDefault();
    let idc = localStorage.getItem("IdUser");
    API.post("add_data", {
      id: 10,
      idu: idc,
      year,
      badge: listHeritage.find(v=> v.year === year)?.badge,
      ...stateform,
    }).then((response) => {
      //alert(response.data);
      ModNewHeritageSate();
      setrefreshData(!refreshData);
      setSateAlert({ visible: true, code: response.data });
      setTimeout(() => {
        setSateAlert({ visible: false, code: 0 });
      }, 2000);
    });
  };

  const handleChangeEdit = (event) => {
    setStateformEdit({
      ...stateformEdit,
      [event.target.name]: event.target.value,
      ...(event.target.name === "legal_value" && {
        comercial_value: event.target.value,
      }),
    });
  };
  
  const handleChange = (event) => {
    setform({
      ...stateform,
      [event.target.name]: event.target.value,
      ...(event.target.name === "legal_value" && {
        comercial_value: event.target.value,
      }),
    });
  };

  const handleChangeYear = (e) => {
    history.push(e.target.value)
  }

  const handleSubmitEdit = () => {

  }
  const handleEditHeritage = (data) => {
    setStateformEdit(data)
    ModEdiHeritageSate()
  }

  useEffect(() => {
    let idc = localStorage.getItem("IdUser");
    let divi = localStorage.getItem("Divisa");
    API.post("acount", {
      id: 16,
      idc: idc,
      badge: divi,
    }).then((response) => {
      setListHeritage(response.data === "" ? [] : response.data);
      API.post("acount", {
        id: 17,
        idc: idc,
        year: year,
      }).then((response) => {
        setListHeritageDetail(response.data === "" ? [] : response.data);
      });
    });
  }, [refreshData, year]);
  return {
    listHeritage,
    stateAlert,
    showNewMod,
    ModNewHeritageSate,
    handleSubmit,
    handleChange,
    stateform,
    listHeritageDetail,
    year,
    dollarString,
    handleChangeYear,
    showDelMod,
    setshowDelMod,
    setSateAlert,
    ModDelHeritageSate,
    showEdiMod,
    ModEdiHeritageSate,
    handleSubmitEdit,
    stateformEdit,
    handleChangeEdit,
    handleEditHeritage,
    refreshData,
    setrefreshData,
  };
};

export default useHeritagesDetail;
