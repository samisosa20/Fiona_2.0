import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Label,
  Container,
  Row,
  Button,
} from "reactstrap";
import { Form, InputGroup, Modal, ProgressBar } from "react-bootstrap";
import {
  ChartIncoming,
  ChartExpense,
  ChartSaving,
  ChartBalance
} from "../../variables/charts";
import ExcelExport from "components/Excel";
import API from "../../variables/API";
import axios from "axios";

// core components
import { Header } from "components/Headers/Header.js";

function Report() {
  const [stateDate, setDate] = useState({
    modal: 1,
    Sdate: "",
    Fdate: "",
    hidden: true,
  });
  const [stateData, setData] = useState({
    ResumAco: [],
    TopExp: [],
    Budget: [],
    groupExpensive: [],
    OpenClose: [],
    ClassOpen: "",
    ClassClose: "",
    identify: 0,
  });
  const [dataToExport, setDataToExport] = useState();
  const [stateDataModal, setDataModal] = useState({
    data: [],
    title: "",
    id_modal: 0,
  });
  let idc = localStorage.getItem("IdUser");
  let divi = localStorage.getItem("Divisa");
  const [stateSearch, setSearch] = useState(false);
  /* Declaracion de estados de los modals */
  const [ShowModalMove, setShowModalMove] = useState(false);

  // Funciones data modal
  const OpenModalMove = (e, id, cuenta, mes, numberGroup = null) => {
    e.preventDefault();
    API.post(`report`, {
      id: id,
      idc: idc,
      divi: divi,
      acocate: numberGroup ? numberGroup : cuenta,
      fecha_ini: stateDate.Sdate,
      fecha_fin: stateDate.Fdate,
      mouth: mes,
    }).then((res) => {
      if (id !== 12) {
        setDataModal({
          data: res.data,
          title: cuenta,
          id_modal: 0,
          id: id === 16,
        });
      } else {
        setDataModal({ data: res.data, title: cuenta, id_modal: 1 });
      }
    });
    if (!ShowModalMove) {
      ModShowModal();
    }
  };

  function getDate(mode = "1") {
    let now = new Date(),
      year,
      month,
      month_now,
      date,
      formattedDateTime,
      formattedDateTimeIni;
    month_now = now.getMonth() + 1;
    month_now = month_now.toString().length === 1 ? "0" + month_now : month_now;
    let d = new Date();
    if (mode === "-1") {
      d.setFullYear(now.getFullYear(), month_now - 1, 0);
      year = d.getFullYear();
      month =
        (d.getMonth() + 1).toString().length === 1
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
      setDate({ ...stateDate, hidden: false });
    }
  }
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  useEffect(() => {
    async function getDataReport(idc, divi) {
      if (stateDate.Sdate === "") {
        getDate("1");
      }
      let Fecha_ini = document.getElementById("Sdate").value;
      let Fehca_fin = document.getElementById("Edate").value;
      await axios
        .all([
          API.post(`report`, {
            id: 1,
            idc: idc,
            divi: divi,
            fecha_ini: Fecha_ini,
            fecha_fin: Fehca_fin,
          }),
          API.post(`report`, {
            id: 5,
            idc: idc,
            divi: divi,
            fecha_ini: Fecha_ini,
            fecha_fin: Fehca_fin,
          }),
          API.post(`report`, {
            id: 11,
            idc: idc,
            divi: divi,
            fecha_ini: Fecha_ini,
            fecha_fin: Fehca_fin,
          }),
          API.post(`report`, {
            id: 13,
            idc: idc,
            divi: divi,
            fecha_ini: Fecha_ini,
            fecha_fin: Fehca_fin,
          }),
          API.post(`acount`, {
            id: 14,
            idc: idc,
            sdate: Fecha_ini,
            edate: Fehca_fin,
          }),
          API.post(`report`, {
            id: 15,
            idc: idc,
            divi: divi,
            fecha_ini: Fecha_ini,
            fecha_fin: Fehca_fin,
          }),
        ])
        .then(
          axios.spread(
            (
              resumAcount,
              topExpenses,
              budget,
              openClose,
              dataExport,
              groupExpensive
            ) => {
              //console.log(groupExpensive.data)
              setData({
                ResumAco: resumAcount.data,
                TopExp: topExpenses.data,
                Budget: budget.data,
                groupExpensive: groupExpensive.data,
                OpenClose: openClose.data[0],
                ClassOpen:
                  openClose.data[0] && openClose.data[0].open < 0
                    ? "text-danger"
                    : "text-success",
                ClassClose:
                  openClose.data[0] && openClose.data[0].end < 0
                    ? "text-danger"
                    : "text-success",
                identify: 1,
              });
              setDataToExport(dataExport.data);
            }
          )
        );
    }
    getDataReport(idc, divi);
    // eslint-disable-next-line
  }, [stateSearch]);

  // Funcion para cambiar de estado de los modals
  const ModShowModal = () => setShowModalMove(!ShowModalMove);
  const consultdate = () => {
    setDate({
      ...stateDate,
      Sdate: document.getElementById("Sdate").value,
      Fdate: document.getElementById("Edate").value,
    });
    setSearch(!stateSearch);
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="col justify-content-end mb-3">
          <div className="col-md-4">
            <Label className="text-dark">View Mode</Label>
            <Form.Control
              as="select"
              name="catego"
              onChange={(e) => getDate(e.target.value)}
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
            <ExcelExport data={dataToExport} />
          </div>
        </Row>
        <Row className="mt-2 mb-4">
          <Col lg="6" xl="3">
            <Card className="card-stats mb-4 mb-xl-0 shadow">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      Opening Balance
                    </CardTitle>
                    <span
                      className={
                        "h2 font-weight-bold mb-0 " + stateData.ClassOpen
                      }
                    >
                      {stateData.OpenClose
                        ? formatter.format(stateData.OpenClose.open)
                        : formatter.format(0)}
                    </span>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" xl="3">
            <Card className="card-stats mb-4 mb-xl-0 shadow">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      Income
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-success">
                      {stateData.OpenClose
                        ? formatter.format(stateData.OpenClose.income)
                        : formatter.format(0)}
                    </span>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" xl="3">
            <Card className="card-stats mb-4 mb-xl-0 shadow">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      Expenses
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-danger">
                      {stateData.OpenClose
                        ? formatter.format(stateData.OpenClose.expenses)
                        : formatter.format(0)}
                    </span>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" xl="3">
            <Card className="card-stats mb-4 mb-xl-0 shadow">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      Ending Balance
                    </CardTitle>
                    <span
                      className={
                        "h2 font-weight-bold mb-0 " + stateData.ClassClose
                      }
                    >
                      {stateData.OpenClose
                        ? formatter.format(stateData.OpenClose.end)
                        : formatter.format(0)}
                    </span>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Cake chart
                    </h6>
                    <h2 className="text-white mb-0">Income</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  {stateDate.Sdate !== "" ? (
                    <ChartIncoming
                      dstart={stateDate.Sdate}
                      dend={stateDate.Fdate}
                      upload={stateSearch}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Cake chart
                    </h6>
                    <h2 className="text-white mb-0">Expenses</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  {stateDate.Sdate !== "" ? (
                    <ChartExpense
                      dstart={stateDate.Sdate}
                      dend={stateDate.Fdate}
                      upload={stateSearch}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Cake chart
                    </h6>
                    <h2 className="text-white mb-0">Savings</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  {stateDate.Sdate !== "" ? (
                    <ChartSaving
                      dstart={stateDate.Sdate}
                      dend={stateDate.Fdate}
                      upload={stateSearch}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Line chart
                    </h6>
                    <h2 className="text-white mb-0">Balance per day</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  {stateDate.Sdate !== "" ? (
                    <ChartBalance
                      dstart={stateDate.Sdate}
                      dend={stateDate.Fdate}
                      upload={stateSearch}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Resumen by Account
                    </h6>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="scroll-none card-scroll">
                  {stateData.identify === 1 && stateData.ResumAco
                    ? stateData.ResumAco.map((data, index) => (
                        <Card
                          className="card-stats mb-1 shadow cursor-pointer"
                          key={index}
                          onClick={(e) => OpenModalMove(e, 9, data.nombre, "")}
                        >
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  {data.nombre}
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0 row ml-2">
                                  <p className="text-dark mr-2 mb-0">
                                    Incomes:{" "}
                                  </p>
                                  <p className="text-success mb-0">
                                    {data.ingreso}
                                  </p>
                                </span>
                                <span className="h2 font-weight-bold mb-0 row ml-2">
                                  <p className="text-dark mr-2 mb-0">
                                    Expenses:{" "}
                                  </p>
                                  <p className="text-danger mb-0">
                                    {data.egreso}
                                  </p>
                                </span>
                              </div>
                            </Row>
                          </CardBody>
                        </Card>
                      ))
                    : "Not found Data"}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      TOP 10 expenses
                    </h6>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="scroll-none card-scroll">
                  {stateData.identify === 1 && stateData.TopExp
                    ? stateData.TopExp.map((data, index) => (
                        <Card
                          className="card-stats mb-1 shadow cursor-pointer"
                          key={index}
                          onClick={(e) =>
                            OpenModalMove(e, 10, data.categoria, "")
                          }
                        >
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  {data.categoria}
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0 row ml-2 text-danger">
                                  {data.cantidad}
                                </span>
                              </div>
                            </Row>
                          </CardBody>
                        </Card>
                      ))
                    : "Not found Data"}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Expenses by group
                    </h6>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="scroll-none card-scroll">
                  {stateData.groupExpensive.length > 0
                    ? stateData.groupExpensive.map((data, index) => (
                        <Card
                          className="card-stats mb-1 shadow cursor-pointer"
                          key={index}
                          onClick={(e) =>
                            OpenModalMove(
                              e,
                              16,
                              data.groupCategorie,
                              "",
                              data.groupNumber
                            )
                          }
                        >
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  {data.groupCategorie}
                                </CardTitle>
                                <span
                                  className={`h3 font-weight-bold mb-0 row ml-2 ${
                                    parseInt(data.value) < 0
                                      ? "text-danger"
                                      : "text-success"
                                  }`}
                                >
                                  {`${formatter.format(data.value)} ${
                                    data.groupCategorie !== "Income"
                                      ? `(${data.porcent}%)`
                                      : ""
                                  }`}
                                </span>
                              </div>
                            </Row>
                          </CardBody>
                        </Card>
                      ))
                    : "Not found Data"}
                  {stateData.groupExpensive.length > 0 && (
                    <Card className="card-stats mb-1 shadow">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Savings
                            </CardTitle>
                            <span
                              className={`h3 font-weight-bold mb-0 row ml-2 text-success`}
                            >
                              {`${formatter.format(
                                stateData.groupExpensive.reduce(
                                  (total, currentValue) =>
                                    total + parseFloat(currentValue.value),
                                  0
                                )
                              )} (${(
                                (stateData.groupExpensive.reduce(
                                  (total, currentValue) =>
                                    total + parseFloat(currentValue.value),
                                  0
                                ) /
                                  stateData.groupExpensive.find(
                                    (e) => parseInt(e.value) > 0
                                  ).value) *
                                100
                              ).toFixed(2)}%)`}
                            </span>
                          </div>
                        </Row>
                      </CardBody>
                    </Card>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Budget
                    </h6>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="scroll-none card-scroll">
                  {stateData.identify === 1 && stateData.Budget
                    ? stateData.Budget.map((data, index) => (
                        <Card
                          className="card-stats mb-1 shadow cursor-pointer"
                          key={index}
                          onClick={(e) =>
                            OpenModalMove(e, 12, data.categoria, data.mes)
                          }
                        >
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  {data.categoria}
                                </CardTitle>
                                <span className="h6 font-weight-bold mb-0 ml-2">
                                  {(data.cumplimiento >= 95 &&
                                    data.grupo === "4") ||
                                  ((data.grupo === "1" || data.grupo === "2") &&
                                    data.cumplimiento <= 85) ? (
                                    <ProgressBar
                                      striped
                                      className="height-15 m-0"
                                      animated
                                      variant="success"
                                      now={data.cumplimiento}
                                      label={`${data.cumplimiento}%`}
                                    />
                                  ) : (data.cumplimiento >= 85 &&
                                      data.cumplimiento < 95 &&
                                      data.grupo === "4") ||
                                    ((data.grupo === "1" ||
                                      data.grupo === "2") &&
                                      data.cumplimiento > 85 &&
                                      data.cumplimiento <= 100) ? (
                                    <ProgressBar
                                      striped
                                      className="height-15 m-0"
                                      animated
                                      variant="warning"
                                      now={data.cumplimiento}
                                      label={`${data.cumplimiento}%`}
                                    />
                                  ) : (
                                    <ProgressBar
                                      striped
                                      className="height-15 m-0"
                                      animated
                                      variant="danger"
                                      now={data.cumplimiento}
                                      label={`${data.cumplimiento}%`}
                                    />
                                  )}
                                </span>
                              </div>
                            </Row>
                          </CardBody>
                        </Card>
                      ))
                    : "Not found Data"}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal show={ShowModalMove} id="ModalEditTrans" onHide={ModShowModal}>
          <Modal.Header closeButton>
            <Modal.Title>{stateDataModal.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {stateDataModal.id_modal === 0 && stateDataModal.data
              ? stateDataModal.data.map((data, index) => (
                  <Card
                    className={`border-botton border-right border-left mb-2 ${
                      stateDataModal.id ? "cursor-pointer" : ""
                    }`}
                    key={index}
                    onClick={
                      stateDataModal.id
                        ? (e) => OpenModalMove(e, 10, data.category, "")
                        : ""
                    }
                  >
                    <h4 className="card-title col-md-12 text-muted mt-2 mb-1">
                      {data.sub_categoria
                        ? data.categoria + " - " + data.sub_categoria
                        : data.categoria
                        ? data.categoria
                        : data.category
                        ? data.category
                        : data.nombre}
                    </h4>
                    <Row>
                      <h6 className="card-title ml-3 row col-md-12 text-muted mb-1">
                        {data.cantidad >= 0 || data.value >= 0 ? (
                          <p className="text-success mr-2 mb-0">
                            {formatter.format(
                              data.cantidad ? data.cantidad : data.value
                            )}
                          </p>
                        ) : (
                          <p className="text-danger mr-2 mb-0">
                            {formatter.format(
                              data.cantidad ? data.cantidad : data.value
                            )}
                          </p>
                        )}
                        {!stateDataModal.id && (
                          <p className="text-muted ml-1 mb-0">
                            {data.fecha ? data.fecha : data.date}
                          </p>
                        )}
                      </h6>
                      {data.event && (
                        <h6 className="card-title ml-3 row col-md-12 text-muted mb-1">
                          {data.event}
                        </h6>
                      )}
                    </Row>
                  </Card>
                ))
              : stateDataModal.id_modal === 1 && stateDataModal.data
              ? stateDataModal.data.map((data, index) => (
                  <Card className="card-stats mb-1 shadow" key={index}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            {data.sub_categoria
                              ? data.categoria + " - " + data.sub_categoria
                              : data.categoria
                              ? data.categoria
                              : data.nombre}
                          </CardTitle>
                          <span className="h6 font-weight-bold mb-0 ml-2">
                            {(data.cumplimiento >= 95 && data.grupo === "4") ||
                            ((data.grupo === "1" || data.grupo === "2") &&
                              data.cumplimiento <= 85) ? (
                              <ProgressBar
                                striped
                                className="height-15 m-0"
                                animated
                                variant="success"
                                now={data.cumplimiento}
                                label={`${data.cumplimiento}%`}
                              />
                            ) : (data.cumplimiento >= 85 &&
                                data.cumplimiento < 95 &&
                                data.grupo === "4") ||
                              ((data.grupo === "1" || data.grupo === "2") &&
                                data.cumplimiento > 85 &&
                                data.cumplimiento <= 100) ? (
                              <ProgressBar
                                striped
                                className="height-15"
                                animated
                                variant="warning"
                                now={data.cumplimiento}
                                label={`${data.cumplimiento}%`}
                              />
                            ) : (
                              <ProgressBar
                                striped
                                className="height-15"
                                animated
                                variant="danger"
                                now={data.cumplimiento}
                                label={`${data.cumplimiento}%`}
                              />
                            )}
                          </span>
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                ))
              : "Not found Data"}
          </Modal.Body>
          <Modal.Footer>
            <Button color="secondary" onClick={ModShowModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default Report;
