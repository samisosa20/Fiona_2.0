import { useState, useEffect } from "react";
import axios from "axios";
import TrmApi from "trm-api";

import API from "variables/API";

const useHeader = (refreshData) => {
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
      let idc = localStorage.getItem("IdUser");
      let divi = localStorage.getItem("Divisa");

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
                  const trmApi = new TrmApi("HNgPywsjYTxDDwnGPdpyVbOth");
                  trmApi
                    .latest()
                    .then((data) => {
                      const valueTRM = data.valor
                      const newFlow = firstResponse.data.map(v => {
                        if(divi !== v.divisa && divi === 'COP') {
                          return {ingreso: v.ingreso * valueTRM, Egresos: v.Egresos * valueTRM, utilidad: v.utilidad * valueTRM}
                        } else if (divi !== v.divisa && divi === 'USD') {
                          return {ingreso: v.ingreso / valueTRM, Egresos: v.Egresos / valueTRM, utilidad: v.utilidad / valueTRM}
                        }
                        return v
                      })
                      const newSaving = secondResponse.data.map(v => {
                        if(divi !== v.Divisa && divi === 'COP') {
                          return v.cantidad * valueTRM
                        } else if (divi !== v.Divisa && divi === 'USD') {
                          return v.cantidad / valueTRM
                        }
                        return v.cantidad
                      })
                      console.log(newSaving)
                      setState({
                        ingresos: newFlow.reduce((prev, curr) => prev + (curr.ingreso * 1), 0),
                        egresos: newFlow.reduce((prev, curr) => prev + (curr.Egresos * 1), 0),
                        ahorros: newSaving.reduce((prev, curr) => prev + (curr * 1), 0),
                        utilidad: newFlow.reduce((prev, curr) => prev + (curr.utilidad * 1), 0),
                      });
                    })
                    .catch((error) => console.log(error));
                } catch (error) {
                  setState({ ingresos: 0, egresos: 0, ahorros: 0, utilidad: 0 });
                }
              })
            );
        }
        loadInfoCardMoney();
      }, [divi, idc, refreshData]);
    
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
    


    return {
        OpenViewMovi,
        state,
        ModViewMovi,
        ModViewMoviState,
        stateViewMovi,
        OpenViewMovilvl,
        OpenViewMovilvlMonth,
        formatter,
        BackViewMovi,
    }
}

export default useHeader