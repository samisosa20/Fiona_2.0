import React, { useState, useEffect } from "react";
import axios from "axios";

import { Modal } from "react-bootstrap";
import API from "../../variables/API";
import ContainerHeader from "./ContainsHeader";

function Header() {
  const [state, setState] = useState({
    ingresos: 0,
    egresos: 0,
    ahorros: 0,
    utilidad: 0,
  });
  const [ModViewMovi, setModViewMovi] = useState(false);
  const [stateViewMovi, setViewMovi] = useState({
    title: 0,
    data: [],
    lvl: 0,
    catego: "",
  });
  const ModViewMoviState = () => setModViewMovi(!ModViewMovi);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  let idc = sessionStorage.getItem("IdUser");
  let divi = sessionStorage.getItem("Divisa");
  useEffect(() => {
    async function loadInfoCardMoney() {
      await axios
        .all([
          API.post(`acount`, {
            id: 7,
            idc: idc,
            divi: divi,
          }),
          API.post(`acount`, {
            id: 8,
            idc: idc,
            divi: divi,
          }),
        ])
        .then(
          axios.spread((firstResponse, secondResponse) => {
            try {
              setState({
                ingresos: firstResponse.data[0].ingreso,
                egresos: firstResponse.data[0].Egresos,
                ahorros: secondResponse.data[0].cantidad,
                utilidad: firstResponse.data[0].utilidad,
              });
              console.log("Value add", secondResponse.data[0].cantidad);
            } catch (error) {
              setState({ ingresos: 0, egresos: 0, ahorros: 0, utilidad: 0 });
            }
          })
        );
    }
    loadInfoCardMoney();
  }, []);

  const OpenViewMovi = (e, id) => {
    e.preventDefault();
    API.post(`report`, {
      id: 6,
      idc: idc,
      divi: divi,
    }).then((res) => {
      setViewMovi({ title: id, data: res.data, lvl: 0, catego: "" });
    });
    ModViewMoviState();
  };

  const OpenViewMovilvl = (e, id, catego) => {
    e.preventDefault();
    API.post(`report`, {
      id: 7,
      idc: idc,
      divi: divi,
      account: catego,
      signal: id,
    }).then((res) => {
      setViewMovi({ title: id, data: res.data, lvl: 1, catego: catego });
    });
  };

  const OpenViewMovilvlMonth = (e, id, catego, month) => {
    e.preventDefault();
    API.post(`report`, {
      id: 8,
      idc: idc,
      divi: divi,
      account: catego,
      mouth: month,
      signal: id,
    }).then((res) => {
      setViewMovi({ title: id, data: res.data, lvl: 2, catego: catego });
    });
  };
  const BackViewMovi = (e) => {
    let lvl = stateViewMovi.lvl - 1;

    e.preventDefault();
    if (lvl === 0) {
      API.post(`report`, {
        id: 6,
        idc: idc,
        divi: divi,
      }).then((res) => {
        setViewMovi({ title: stateViewMovi.title, data: res.data, lvl: lvl });
      });
    } else {
      API.post(`report`, {
        id: 7,
        idc: idc,
        divi: divi,
        account: stateViewMovi.catego,
        signal: stateViewMovi.title,
      }).then((res) => {
        setViewMovi({ title: stateViewMovi.title, data: res.data, lvl: lvl });
      });
    }
  };

  return (
    <ContainerHeader
      OpenViewMovi={OpenViewMovi}
      state={state}
      Modal={Modal}
      ModViewMovi={ModViewMovi}
      ModViewMoviState={ModViewMoviState}
      stateViewMovi={stateViewMovi}
      OpenViewMovilvl={OpenViewMovilvl}
      OpenViewMovilvlMonth={OpenViewMovilvlMonth}
      formatter={formatter}
      BackViewMovi={BackViewMovi}
    />
  );
}

export { Header };
