import { useState, useEffect } from "react";

import API from "variables/API";

const useBudgetReport = () => {
  const [state, setState] = useState([]);
  const [stateFilter, setStateFilter] = useState([]);
  const [stateSearch, setSearch] = useState(false);
  const [displayDetail, setDisplayDetail] = useState({
    key: 0,
    chevron: false,
  });
  const [stateDate, setDate] = useState({
    modal: 1,
    Sdate: "",
    Fdate: "",
    hidden: true,
  });

  let aux_catego = "",
    aux_cat_print = "",
    aux_group = "",
    acuBudget_print = 0.0,
    acuReal_print = 0.0,
    acuBudget = 0.0,
    acuReal = 0.0,
    utilidadBudget = 0.0,
    utilidadReal = 0.0,
    aux_variation = 0.0;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    if (stateDate.Sdate === "") {
      getDateLocal("1");
    }
    API.post("report", {
      id: 14,
      idc: localStorage.getItem("IdUser"),
      fecha_ini: document.getElementById("Sdate").value,
      fecha_fin: document.getElementById("Edate").value,
    }).then((response) => setState(response.data));
    // eslint-disable-next-line
  }, [stateSearch]);

  function getDateLocal(mode = "1") {
    let now = new Date(),
      year,
      month,
      month_now,
      date,
      formattedDateTime,
      formattedDateTimeIni;
    month_now = now.getMonth() + 1;
    month_now =
      (now.getMonth() + 1).toString().length === 1
        ? "0" + month_now
        : month_now;

    let d = new Date();
    if (mode === "-1") {
      d.setFullYear(now.getFullYear(), month_now - 1, 0);
      year = d.getFullYear();
      month =
        (now.getMonth() + 1).toString().length === 1
          ? "0" + (d.getMonth() + 1).toString()
          : d.getMonth() + 1;
      date =
        d.getDate().toString().length === 1
          ? "0" + d.getDate().toString()
          : d.getDate();
      formattedDateTime = year + "-" + month + "-" + date;
      document.getElementById("Edate").value = formattedDateTime;
      month_now = month;
      date = "01";
      formattedDateTimeIni = year + "-" + month_now + "-" + date;
      document.getElementById("Sdate").value = formattedDateTimeIni;

      setDate({
        ...stateDate,
        Sdate: formattedDateTimeIni,
        Fdate: formattedDateTime,
        hidden: true,
      });
    } else if (mode === "1") {
      d.setFullYear(now.getFullYear(), month_now, 0);
      year = d.getFullYear();
      month =
        (now.getMonth() + 1).toString().length === 1
          ? "0" + (now.getMonth() + 1).toString()
          : d.getMonth() + 1;
      date =
        d.getDate().toString().length === 1
          ? "0" + d.getDate().toString()
          : d.getDate();
      formattedDateTime = year + "-" + month_now + "-" + date;
      document.getElementById("Edate").value = formattedDateTime;

      if (month_now === 12) {
        d.setFullYear(now.getFullYear(), month_now - 1, 1);
      }

      formattedDateTimeIni = year + "-" + month_now + "-01";
      document.getElementById("Sdate").value = formattedDateTimeIni;

      setDate({
        ...stateDate,
        Sdate: formattedDateTimeIni,
        Fdate: formattedDateTime,
        hidden: true,
      });
    } else {
      setDate({ ...stateDate, Sdate: "", hidden: false });
    }
  }

  const consultdate = () => {
    setDate({
      ...stateDate,
      Sdate: document.getElementById("Sdate").value,
      Fdate: document.getElementById("Edate").value,
    });
    setSearch(!stateSearch);
  };

  const showDetail = (key) => {
    setDisplayDetail({ key: key, chevron: !displayDetail.chevron });
    setStateFilter(
      state.filter(
        (v) =>
          v.nameSub ===
          document.querySelector(`#card-primary-${key} h3`).textContent
      )
    );
  };
  return {
    getDateLocal,
    stateDate,
    consultdate,
    state,
    utilidadBudget,
    aux_catego,
    acuBudget,
    acuReal,
    aux_cat_print,
    aux_variation,
    acuReal_print,
    utilidadReal,
    formatter,
    acuBudget_print,
    showDetail,
    displayDetail,
    stateFilter,
    aux_group,
  };
};

export default useBudgetReport;
