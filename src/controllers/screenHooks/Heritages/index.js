import { useState, useEffect } from "react";

import API from "variables/API";

const useHeritages = () => {
  const [listHeritage, setListHeritage] = useState([]);
  const [stateAlert, setSateAlert] = useState({ visible: false, code: 200 });
  const [refreshData, setrefreshData] = useState(false);
  const [showNewMod, setshowNewMod] = useState(false);

  const [stateform, setform] = useState({
    badge: localStorage.getItem("Divisa"),
    legal_value: 0,
    comercial_value: 0
  });

  const ModNewHeritageSate = () => setshowNewMod(!showNewMod);

  const handleSubmit = (e) => {
    e.preventDefault();
    let idc = localStorage.getItem("IdUser");
      API.post("add_data", {
        id: 10,
        idu: idc,
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
  }

  const handleChange = (event) => {
    setform({ ...stateform, [event.target.name]: event.target.value, ...(event.target.name === 'legal_value' && {'comercial_value': event.target.value}) });
  };

  useEffect(() => {
    let idc = localStorage.getItem("IdUser");
    let divi = localStorage.getItem("Divisa");
    API.post("acount", {
      id: 16,
      idc: idc,
      badge: divi,
    }).then((response) => {
      setListHeritage(response.data === "" ? [] : response.data);
    });
  }, [refreshData]);
  return {
    listHeritage,
    stateAlert,
    showNewMod,
    ModNewHeritageSate,
    handleSubmit,
    handleChange,
    stateform,
  };
};

export default useHeritages;
