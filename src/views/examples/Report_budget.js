import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Table,
  Container,
  Button,
  Label,
  Row,
  CardHeader,
} from "reactstrap";
import { Form, InputGroup } from "react-bootstrap";
// core components
import { Header } from "components/Headers/Header.js";
import API from "../../variables/API";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

function ViewBudget() {
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
  }, [stateSearch]);

  function getDateLocal(mode = "1") {
    let now = new Date(),
      year,
      month,
      month_now,
      date,
      formattedDateTime,
      formattedDateTimeIni;
      month_now = (now.getMonth() + 1)
      month_now = month_now.toString().length === 1
          ? "0" + month_now
          : month_now;

    let d = new Date();
    if (mode === "-1") {
      d.setFullYear(now.getFullYear(), month_now - 1, 0);
      year = d.getFullYear();
      month =
        d.getMonth().toString().length === 1
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
        d.getMonth().toString().length === 1
          ? "0" + d.getMonth().toString()
          : d.getMonth();
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
      setDate({ ...stateDate, Sdate: "ola", hidden: false });
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

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="col justify-content-end mb-3">
          <div className="col-md-4">
            <Label className="text-dark">View Mode</Label>
            <Form.Control
              as="select"
              name="catego"
              onChange={(e) => getDateLocal(e.target.value)}
            >
              <option value="1">THIS MONTH</option>
              <option value="-1">LAST MONTH</option>
              <option value="0">CUSTOM DATE</option>
            </Form.Control>
          </div>
          <div className="col-md-4" hidden={stateDate.hidden}>
            <Label className="text-dark">Start Date</Label>
            <InputGroup>
              <Form.Control
                type="date"
                name="Sdate"
                id="Sdate"
                aria-describedby="SignalAppend"
                defaultValue={stateDate.Sdate}
                required
              ></Form.Control>
            </InputGroup>
          </div>
          <div className="col-md-4" hidden={stateDate.hidden}>
            <Label className="text-dark">End Date</Label>
            <InputGroup>
              <Form.Control
                type="date"
                name="Edate"
                id="Edate"
                aria-describedby="SignalAppend"
                defaultValue={stateDate.Fdate}
                required
              ></Form.Control>
            </InputGroup>
          </div>
          <div className="mt-4">
            <Button className="mr-3 btn-success" onClick={() => consultdate()}>
              <i className="fas fa-search mr-2"></i>
              Search
            </Button>
          </div>
        </Row>
        {window.innerWidth >= 768 ? (
          <Card>
            <CardBody className="overflow-x-auto">
              <Table hover>
                <thead>
                  <tr className="text-dark">
                    <th>Category</th>
                    <th>Budget</th>
                    <th>Real</th>
                    <th>Variation</th>
                  </tr>
                </thead>
                <tbody>
                  {state ? (
                    state.map((data, index) => {
                      if (data.grupo === "4") {
                        utilidadBudget =
                          parseFloat(utilidadBudget) + parseFloat(data.budget);
                        utilidadReal =
                          parseFloat(utilidadReal) + parseFloat(data.realValue);
                      } else {
                        utilidadBudget =
                          parseFloat(utilidadBudget) - parseFloat(data.budget);
                        utilidadReal =
                          parseFloat(utilidadReal) - parseFloat(data.realValue);
                      }
                      if (data.nameSub !== aux_catego && aux_catego === "") {
                        aux_catego = data.nameSub;
                        acuBudget =
                          parseFloat(acuBudget) + parseFloat(data.budget);
                        acuReal =
                          parseFloat(acuReal) + parseFloat(data.realValue);
                        return (
                          <tr key={index}>
                            <td>{data.categoria}</td>
                            <td>{formatter.format(data.budget)}</td>
                            <td>{formatter.format(data.realValue)}</td>
                            <td
                              className={
                                parseFloat(data.variation) < 0
                                  ? "text-danger"
                                  : "text-success"
                              }
                            >
                              {parseFloat(data.variation).toFixed(2)}
                            </td>
                          </tr>
                        );
                      } else if (data.nameSub !== aux_catego) {
                        aux_cat_print = aux_catego;
                        aux_catego = data.nameSub;
                        acuBudget_print = acuBudget;
                        acuReal_print = acuReal;
                        aux_variation =
                          ((acuReal_print - acuBudget_print) / acuReal_print) *
                          100;
                        acuBudget = parseFloat(data.budget);
                        acuReal = parseFloat(data.realValue);
                        return [
                          <tr
                            key={index * 100}
                            className="table-dark text-dark"
                          >
                            <td>{aux_cat_print}</td>
                            <td>{formatter.format(acuBudget_print)}</td>
                            <td>{formatter.format(acuReal_print)}</td>
                            <td
                              className={
                                parseFloat(aux_variation) < 0
                                  ? "text-danger"
                                  : "text-success"
                              }
                            >
                              {parseFloat(aux_variation).toFixed(2)}
                            </td>
                          </tr>,
                          <tr key={index}>
                            <td>{data.categoria}</td>
                            <td>{formatter.format(data.budget)}</td>
                            <td>{formatter.format(data.realValue)}</td>
                            <td
                              className={
                                parseFloat(data.variation) < 0
                                  ? "text-danger"
                                  : "text-success"
                              }
                            >
                              {parseFloat(data.variation).toFixed(2)}
                            </td>
                          </tr>,
                        ];
                      } else {
                        aux_catego = data.nameSub;
                        acuBudget =
                          parseFloat(acuBudget) + parseFloat(data.budget);
                        acuReal =
                          parseFloat(acuReal) + parseFloat(data.realValue);
                        return (
                          <tr key={index}>
                            <td>{data.categoria}</td>
                            <td>{formatter.format(data.budget)}</td>
                            <td>{formatter.format(data.realValue)}</td>
                            <td
                              className={
                                parseFloat(data.variation) < 0
                                  ? "text-danger"
                                  : "text-success"
                              }
                            >
                              {parseFloat(data.variation).toFixed(2)}
                            </td>
                          </tr>
                        );
                      }
                    })
                  ) : (
                    <tr></tr>
                  )}
                  <tr className="table-dark text-dark">
                    <td className="font-weight-bold">{aux_catego}</td>
                    <td>{formatter.format(acuBudget)}</td>
                    <td>{formatter.format(acuReal)}</td>
                    <td
                      className={
                        parseFloat(((acuReal - acuBudget) / acuReal) * 100) < 0
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      {parseFloat(
                        ((acuReal - acuBudget) / acuReal) * 100
                      ).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-weight-bold">Utility</td>
                    <td
                      className={
                        utilidadBudget < 0 ? "text-danger" : "text-success"
                      }
                    >
                      {formatter.format(utilidadBudget)}
                    </td>
                    <td
                      className={
                        utilidadReal < 0 ? "text-danger" : "text-success"
                      }
                    >
                      {formatter.format(utilidadReal)}
                    </td>
                    <td
                      className={
                        parseFloat(
                          ((utilidadReal - utilidadBudget) / utilidadReal) * 100
                        ) < 0
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      {parseFloat(
                        ((utilidadReal - utilidadBudget) / utilidadReal) * 100
                      ).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        ) : (
          <>
            {state ? (
              state.map((data, index) => {
                if (data.grupo === "4") {
                  utilidadBudget =
                    parseFloat(utilidadBudget) + parseFloat(data.budget);
                  utilidadReal =
                    parseFloat(utilidadReal) + parseFloat(data.realValue);
                } else {
                  utilidadBudget =
                    parseFloat(utilidadBudget) - parseFloat(data.budget);
                  utilidadReal =
                    parseFloat(utilidadReal) - parseFloat(data.realValue);
                }
                if (data.nameSub !== aux_catego && aux_catego === "") {
                  aux_catego = data.nameSub;
                  acuBudget = parseFloat(acuBudget) + parseFloat(data.budget);
                  acuReal = parseFloat(acuReal) + parseFloat(data.realValue);
                } else if (data.nameSub !== aux_catego) {
                  aux_cat_print = aux_catego;
                  aux_catego = data.nameSub;
                  acuBudget_print = acuBudget;
                  acuReal_print = acuReal;
                  aux_variation =
                    ((acuReal_print - acuBudget_print) / acuReal_print) * 100;
                  acuBudget = parseFloat(data.budget);
                  acuReal = parseFloat(data.realValue);
                  return (
                    <Card
                      id={`card-primary-${index * 100}`}
                      key={index * 100}
                      className="mb-2 shadow"
                      onClick={() => showDetail(index * 100)}
                    >
                      <CardHeader className="px-3 pb-3">
                        <div className="row justify-content-between m-0 p-0 col-12">
                          <h3>{aux_cat_print}</h3>
                          {displayDetail.key === index * 100 &&
                          displayDetail.chevron ? (
                            <BsChevronUp />
                          ) : (
                            <BsChevronDown />
                          )}
                        </div>
                        <div className="row col-12 p-0 justify-content-between m-0">
                          <h5 className="m-0">Budget</h5>
                          <h5 className="m-0">Real</h5>
                          <h5 className="m-0">Variation</h5>
                        </div>
                        <div className="row col-12 p-0 justify-content-between m-0">
                          <p className="m-0 font-weight-normal">
                            {formatter.format(acuBudget_print)}
                          </p>
                          <p className="m-0 font-weight-normal">
                            {formatter.format(acuReal_print)}
                          </p>
                          <p
                            className={
                              parseFloat(aux_variation) < 0
                                ? "text-danger m-0 font-weight-bold"
                                : "text-success m-0 font-weight-bold"
                            }
                          >
                            {parseFloat(aux_variation).toFixed(2)}
                          </p>
                        </div>
                      </CardHeader>
                      {displayDetail.key === index * 100 &&
                      displayDetail.chevron ? (
                        <CardBody className={`p-0 border rounded`}>
                          {stateFilter.length > 0
                            ? stateFilter.map((v, i) => (
                                <div
                                  className={`border-bottom p-3 ${
                                    i % 2 === 0 ? "bg-secondary" : ""
                                  }`}
                                  key={i}
                                >
                                  <h4>{v.categoria}</h4>
                                  {/* <div className="row col-12 p-0 justify-content-between m-0">
                                    <h5 className="m-0">Budget</h5>
                                    <h5 className="m-0">Real</h5>
                                    <h5 className="m-0">Variation</h5>
                                  </div> */}
                                  <div className="row col-12 p-0 justify-content-between m-0">
                                    <p className="m-0 font-weight-normal">
                                      {formatter.format(v.budget)}
                                    </p>
                                    <p className="m-0 font-weight-normal">
                                      {formatter.format(v.realValue)}
                                    </p>
                                    <p
                                      className={
                                        parseFloat(v.variation) < 0
                                          ? "text-danger m-0 font-weight-bold"
                                          : "text-success m-0 font-weight-bold"
                                      }
                                    >
                                      {parseFloat(v.variation).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              ))
                            : ""}
                        </CardBody>
                      ) : null}
                    </Card>
                  );
                } else {
                  aux_catego = data.nameSub;
                  acuBudget = parseFloat(acuBudget) + parseFloat(data.budget);
                  acuReal = parseFloat(acuReal) + parseFloat(data.realValue);
                }
              })
            ) : (
              <Card></Card>
            )}
            <Card
              className="mb-2 shadow"
            >
              <CardHeader className="px-3 pb-3">
                <div className="row justify-content-between m-0 p-0 col-12">
                  <h3>{"Utility"}</h3>
                </div>
                <div className="row col-12 p-0 justify-content-between m-0">
                  <h5 className="m-0">Budget</h5>
                  <h5 className="m-0">Real</h5>
                  <h5 className="m-0">Variation</h5>
                </div>
                <div className="row col-12 p-0 justify-content-between m-0">
                  <p
                    className={
                      utilidadBudget < 0
                        ? "text-danger m-0 font-weight-normal"
                        : "text-success m-0 font-weight-normal"
                    }
                  >
                    {formatter.format(utilidadBudget)}
                  </p>
                  <p
                    className={
                      utilidadReal < 0
                        ? "text-danger m-0 font-weight-normal"
                        : "text-success m-0 font-weight-normal"
                    }
                  >
                    {formatter.format(utilidadReal)}
                  </p>
                  <p
                    className={
                      parseFloat(
                        ((utilidadReal - utilidadBudget) / utilidadReal) * 100
                      ) < 0
                        ? "text-danger m-0 font-weight-bold"
                        : "text-success m-0 font-weight-bold"
                    }
                  >
                    {parseFloat(
                      ((utilidadReal - utilidadBudget) / utilidadReal) * 100
                    ).toFixed(2)}
                  </p>
                </div>
              </CardHeader>
            </Card>
          </>
        )}
      </Container>
    </>
  );
}

export default ViewBudget;
