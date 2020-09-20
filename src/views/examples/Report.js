import React, {useState, useEffect} from "react";
// reactstrap components
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Label,
  Container,
  Row,
  Button
} from "reactstrap";
import { Form, InputGroup, Modal } from 'react-bootstrap';
import {Chart_Ingresos, Chart_Egreso, Chart_Ahorros} from "../../variables/charts2";
import API from '../../variables/API';
import axios from 'axios';
// core components
import {Header} from "components/Headers/Header.js";


function Report() {
  
  const [stateDate, setDate] = useState({Sdate: "", Fdate: ""})
  const [stateData, setData] = useState({ResumAco: [], TopExp: [], Budget: [], identify: 0})
  const [stateDataModal, setDataModal] = useState({data: [], title: ""})
  let idc = sessionStorage.getItem("IdUser");
  let divi = sessionStorage.getItem("Divisa");
  const [stateSearch, setSearch] = useState(false)
  /* Declaracion de estados de los modals */
  const [ShowModalMove, setShowModalMove] = useState(false);

  // Funciones data modal
  const OpenModalMove = (e, id, cuenta, mes) => {
    e.preventDefault();
      API.post(`report`,{
          id: id,
          idc: idc,
          divi: divi,
          acocate: cuenta,
          fecha_ini: stateDate.Sdate,
          fecha_fin: stateDate.Fdate,
          mouth: mes
      }).then(res => {
        setDataModal({data: res.data, title: cuenta})
      });
      ModShowModal()
  };


  function getDate() {
    let now = new Date()
    , year
    , month
    , date
    , formattedDateTime
    , formattedDateTimeIni
    ;

    year = now.getFullYear();
    month = now.getMonth().toString().length === 1 ? '0' + (now.getMonth() + 1).toString() : now.getMonth() + 1;
    date = now.getDate().toString().length === 1 ? '0' + (now.getDate()).toString() : now.getDate();

    formattedDateTime = year + '-' + month + '-' + date
    document.getElementById("Edate").value = formattedDateTime
    now.setMonth(now.getMonth() - 1);
    year = now.getFullYear();
    month = now.getMonth().toString().length === 1 ? '0' + (now.getMonth() + 1).toString() : now.getMonth() + 1;
    date = now.getDate().toString().length === 1 ? '0' + (now.getDate()).toString() : now.getDate();

    formattedDateTimeIni = year + '-' + month + '-' + date;
    
    document.getElementById("Sdate").value = formattedDateTimeIni
    setDate({Sdate: formattedDateTimeIni, Fdate: formattedDateTime})
  }

  useEffect(() => {
      async function getDataReport(idc, divi) {
        if (stateDate.Sdate === ""){
          getDate()
        }
        let Fecha_ini = document.getElementById("Sdate").value
        let Fehca_fin = document.getElementById("Edate").value
        await axios.all([API.post(`report`,{
            id: 1,
            idc: idc,
            divi: divi,
            fecha_ini: Fecha_ini,
            fecha_fin: Fehca_fin
        }),
        API.post(`report`,{
          id: 5,
          idc: idc,
          divi: divi,
          fecha_ini: Fecha_ini,
          fecha_fin: Fehca_fin
        }),
        API.post(`report`,{
          id: 11,
          idc: idc,
          divi: divi,
          fecha_ini: Fecha_ini,
          fecha_fin: Fehca_fin
        })])
        .then(axios.spread((ResumAcount, TopExpenses, Budget) => {
          setData({ResumAco: ResumAcount.data, TopExp: TopExpenses.data, Budget: Budget.data, identify: 1})
        }))
      }
      getDataReport(idc, divi)
  }, [stateSearch])

  // Funcion para cambiar de estado de los modals
  const ModShowModal = () => setShowModalMove(!ShowModalMove)
  const consultdate = () => {
    setDate({Sdate: document.getElementById("Sdate").value, Fdate: document.getElementById("Edate").value})
    setSearch(!stateSearch)
  }
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="col justify-content-end mb-3">
            <div className="col-md-4">
              <Label className="text-dark">
                  Start Date
              </Label>
              <InputGroup>
                  <Form.Control
                  type='date'
                  name="Sdate"
                  id="Sdate"
                  aria-describedby="SignalAppend"
                  defaultValue={stateDate.Sdate}
                  required
                  >
                  </Form.Control>
              </InputGroup>
            </div>
            <div className="col-md-4">
              <Label className="text-dark">
                  End Date
              </Label>
              <InputGroup>
                  <Form.Control
                  type='date'
                  name="Edate"
                  id="Edate"
                  aria-describedby="SignalAppend"
                  defaultValue={stateDate.Fdate}
                  required
                  >
                  </Form.Control>
              </InputGroup>
            </div>
            <div className="mt-4">
              <Button className="mr-3 btn-success" onClick={consultdate}>
                  <i class="fas fa-search mr-2"></i>
                  Search
              </Button>
            </div>
          </Row>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="4">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Grafica de torta
                      </h6>
                      <h2 className="text-white mb-0"
                      >Ingresos</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Chart_Ingresos/>
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
                        Grafica de torta
                      </h6>
                      <h2 className="text-white mb-0"
                      >Egresos</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Chart_Egreso/>
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
                        Grafica de torta
                      </h6>
                      <h2 className="text-white mb-0"
                      >Ahorros</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Chart_Ahorros/>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
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
                  <div style={{maxHeight: "300px",  overflow: 'auto'}}>
                  {stateData.identify === 1 && stateData.ResumAco ?
                  stateData.ResumAco.map((data, index) => (
                    <Card class='border-botton border-right border-left' key={index} onClick={e => OpenModalMove(e, 9, data.nombre, "")}>
                      <Row>
                        <h4 class='ml-2 mt-1 card-title col-md-10 col-lg-10 col-xl-10 text-muted'>
                          {data.nombre}
                        </h4>
                        <h6 class='card-title ml-3 row col-md-12 col-lg-12 col-xl-12 text-muted'>
                          <p class='text-success'>{data.ingreso}</p> / <p class='text-danger'>
                            {data.egreso}
                          </p>
                        </h6>
                      </Row>
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
                        TOP 10 expenses
                      </h6>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                <div style={{maxHeight: "300px",  overflow: 'auto'}}>
                  {stateData.identify === 1 && stateData.TopExp ?
                  stateData.TopExp.map((data, index) => (
                    <Card class='border-botton border-right border-left' key={index} onClick={e => OpenModalMove(e, 10, data.categoria, "")}>
                      <Row>
                        <h4 class='ml-2 mt-1 card-title col-md-10 col-lg-10 col-xl-10 text-muted'>
                          {data.categoria}
                        </h4>
                        <h6 class='card-title ml-3 row col-md-12 col-lg-12 col-xl-12 text-muted'>
                          <p class='text-danger'>
                            {data.cantidad}
                          </p>
                        </h6>
                      </Row>
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
                        Budget
                      </h6>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                <div style={{maxHeight: "300px",  overflow: 'auto'}}>
                  {stateData.identify === 1 && stateData.Budget ?
                    stateData.Budget.map((data, index) => (
                      <Card class='border-botton border-right border-left' key={index} onClick={e => OpenModalMove(e, 12, data.categoria, data.mes)}>
                        <Row>
                          <h4 class='ml-2 mt-1 card-title col-md-10 col-lg-10 col-xl-10 text-muted'>
                            {data.name_mes + " - " + data.categoria}
                          </h4>
                          <h6 class='card-title ml-3 row col-md-12 col-lg-12 col-xl-12 text-muted'>
                            {
                              ((data.cumplimiento >= 95 && data.grupo === '4') || ((data.grupo === '1' || data.grupo === '2')
                                      && data.cumplimiento <= 85))
                              ? <p class='text-success'>{data.cumplimiento + " %"}</p>
                              : (data.cumplimiento >= 85 && data.cumplimiento < 95 && data.grupo === '4') 
                              || ((data.grupo === '1' || data.grupo === '2')
                              && data.cumplimiento > 85 && data.cumplimiento <= 100)
                              ? <p class='text-warning'>{data.cumplimiento + " %"}</p>
                              : <p class='text-danger'>{data.cumplimiento + " - " + data.grupo + " %"}</p>
                            }
                          </h6>
                        </Row>
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
              </Modal.Header >
              <Modal.Body>
              {stateDataModal.data ?
                  stateDataModal.data.map((data, index) => (
                    <Card class='border-botton border-right border-left' key={index}>
                      <h4 class='card-title col-md-12 text-muted mt-2'>
                        {data.sub_categoria ? data.categoria + " - " + data.sub_categoria : data.categoria ? data.categoria : data.nombre}
                      </h4>
                      <Row>
                        <h6 class='card-title ml-3 row col-md-12 text-muted'>
                          { data.cantidad >= 0 ?
                            <p class='text-success'>{data.cantidad}</p>
                            :
                            <p class='text-danger'>{data.cantidad}</p>
                          }
                          <p class='text-muted ml-1'>
                          {data.fecha}
                          </p>
                        </h6>
                      </Row>
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
