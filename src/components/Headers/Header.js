import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Modal } from "react-bootstrap";
import API from "../../variables/API";

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
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card
                  className="card-stats mb-4 mb-xl-0"
                  onClick={(e) => OpenViewMovi(e, 1)}
                >
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
                          {state.ingresos}
                        </span>
                      </div>
                      {/*<Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>*/}
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card
                  className="card-stats mb-4 mb-xl-0"
                  onClick={(e) => OpenViewMovi(e, 2)}
                >
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
                          {state.egresos}
                        </span>
                      </div>
                      {/*<Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>*/}
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Savings
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {state.ahorros}
                        </span>
                      </div>
                      {/*<Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                    </Col>*/}
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Utility
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {state.utilidad}
                        </span>
                      </div>
                      {/*<Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                    </Col>*/}
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
          <Modal show={ModViewMovi} id="ModalMovi" onHide={ModViewMoviState}>
            <Modal.Header closeButton>
              <Modal.Title>Activity By Account</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: "500px", overflow: "auto" }}>
              {stateViewMovi.title === 1
                ? stateViewMovi.data.map((data, index) => (
                    <Card
                      key={index}
                      onClick={
                        stateViewMovi.lvl === 0
                          ? (e) => OpenViewMovilvl(e, 1, data.nombre)
                          : stateViewMovi.lvl === 1
                          ? (e) =>
                              OpenViewMovilvlMonth(e, 1, data.nombre, data.mes)
                          : ""
                      }
                    >
                      <h4 className="card-title col-md-12 text-muted mt-2">
                        {stateViewMovi.lvl === 0
                          ? data.nombre
                          : stateViewMovi.lvl === 1
                          ? data.mes + " - " + data.nombre
                          : data.categoria}
                      </h4>
                      <h6 className="card-title ml-3 row col-md-12 text-muted font-weight-bold">
                        <p className="text-success">
                          {stateViewMovi.lvl === 0
                            ? formatter.format(data.ingreso)
                            : formatter.format(data.cantidad)}
                        </p>
                      </h6>
                    </Card>
                  ))
                : stateViewMovi.data.map((data, index) => (
                    <Card
                      key={index}
                      onClick={
                        stateViewMovi.lvl === 0
                          ? (e) => OpenViewMovilvl(e, 2, data.nombre)
                          : stateViewMovi.lvl === 1
                          ? (e) =>
                              OpenViewMovilvlMonth(e, 2, data.nombre, data.mes)
                          : ""
                      }
                    >
                      <h4 className="card-title col-md-12 text-muted mt-2">
                        {stateViewMovi.lvl === 0
                          ? data.nombre
                          : stateViewMovi.lvl === 1
                          ? data.mes + " - " + data.nombre
                          : data.categoria}
                      </h4>
                      <h6 className="card-title ml-3 row col-md-12 text-muted font-weight-bold">
                        <p className="text-danger">
                          {stateViewMovi.lvl === 0
                            ? formatter.format(data.egreso)
                            : formatter.format(data.cantidad)}
                        </p>
                      </h6>
                    </Card>
                  ))}
            </Modal.Body>
            <Modal.Footer>
              {stateViewMovi.lvl === 0 ? (
                <Button color="danger" onClick={ModViewMoviState}>
                  Close
                </Button>
              ) : (
                <Button color="primary" onClick={(e) => BackViewMovi(e)}>
                  Back
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </>
  );
}

export { Header };
