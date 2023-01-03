import React from "react";

// Components
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
  ChartBalance,
  ChartCashFlow,
  ChartBalanceComparison,
} from "variables/charts";
import useComponents from "views/components";

// Controllers
import useControllers from "controllers";

const Report = () => {
  // Components
  const { Headers, ExcelExport } = useComponents();
  const { Header } = Headers();

  const { useScreenHooks } = useControllers();
  const { useReport } = useScreenHooks();
  const {
    getDate,
    stateDate,
    consultdate,
    dataToExport,
    stateData,
    formatter,
    stateSearch,
    OpenModalMove,
    ShowModalMove,
    ModShowModal,
    stateDataModal,
    windowWidth,
  } = useReport();

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
              <option value="1">This Month</option>
              <option value="-1">Last Month</option>
              <option value="-3">Last Trimester</option>
              <option value="-6">Last Semester</option>
              <option value="12">This Year</option>
              <option value="-12">Last Year</option>
              <option value="0">Custom Date</option>
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
          <Col className="mb-5 mb-xl-0" sm="6" xl="6">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
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
          <Col className="mb-5 mb-xl-0" sm="6" xl="6">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="text-white mb-0">
                      Main Categories Expenses
                    </h2>
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
          {/* <Col className="mb-5 mb-xl-0" sm="4" xl="4">
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
          </Col> */}
        </Row>
        <Row className="mb-4">
          <Col className="mb-5 mb-xl-0" sm="12" lg="6">
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
          <Col className="mb-5 mb-xl-0" sm="12" lg="6">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Bar chart
                    </h6>
                    <h2 className="text-white mb-0">Cash Flow</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  {stateDate.Sdate !== "" ? (
                    <ChartCashFlow
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
          <Col className="mb-5 mb-xl-0" sm="12" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Line chart
                    </h6>
                    <h2 className="text-white mb-0">Balance comparison</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  {stateDate.Sdate !== "" ? (
                    <ChartBalanceComparison
                      dstart={stateDate.Sdate}
                      dend={stateDate.Fdate}
                      upload={stateSearch}
                      resize={windowWidth}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0 d-none d-lg-block" sm="12" xl="4">
            <Card className="bg-gradient-default shadow h-100">
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
          <Col className="mb-5 mb-xl-0 d-lg-none" sm="6" xl="4">
            <Card className="bg-gradient-default shadow h-100">
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
          <Col className="mb-5 mb-xl-0" sm="6" xl="4">
            <Card className="bg-gradient-default shadow h-100">
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
          <Col className="mb-5 mb-xl-0" sm="6" xl="4">
            <Card className="bg-gradient-default shadow h-100">
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
                                ) < 0
                                  ? 0
                                  : stateData.groupExpensive.reduce(
                                      (total, currentValue) =>
                                        total + parseFloat(currentValue.value),
                                      0
                                    )
                              )} (${(stateData.groupExpensive.reduce(
                                (total, currentValue) =>
                                  total + parseFloat(currentValue.value),
                                0
                              ) < 0
                                ? 0
                                : (stateData.groupExpensive.reduce(
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
          <Col className="mb-5 mb-xl-0" sm="6" xl="4">
            <Card className="bg-gradient-default shadow h-100">
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
};

export default Report;
