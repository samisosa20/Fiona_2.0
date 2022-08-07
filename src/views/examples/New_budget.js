import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Button,
  Label,
  ModalFooter,
  Container,
  FormGroup,
} from "reactstrap";
import { Form, Modal } from "react-bootstrap";
// core components
import { Header } from "components/Headers/Header.js";
import Alert from "../../components/Alert";
import API from "../../variables/API";

function ViewBudget() {
  const [stateForm, setStateForm] = useState({
    mounth: 1,
    value: 0.0,
    action: 2,
    catego: "",
    mode: 0,
    badge: "",
    year: 0,
    replica: 0,
  });
  const [stateCatego, setCatego] = useState([]);
  let year = new Date().getFullYear();

  /* Declaracion de estados de los modals */
  const [ShowStep1, SetShowStep1] = useState(false);
  const [stateAlert, setSateAlert] = useState({ visible: false, code: 200 });
  const [ShowStep2, SetShowStep2] = useState(false);
  const [refreshData, /* setrefreshData */] = useState(false);

  // Funcion para cambiar de estado de los modals
  const ModStep1 = () => SetShowStep1(!ShowStep1);
  const ModStep2 = () => SetShowStep2(!ShowStep2);

  useEffect(() => {
    /*var idc = localStorage.getItem("IdUser");
    API.post("acount", {
      id: 10,
      idc: idc,
      year: year,
    }).then((response) => setState(response.data));*/
  }, [refreshData]);

  const handleChange = (event) => {
    setStateForm({ ...stateForm, [event.target.name]: event.target.value });
    if (
      "mode".localeCompare([event.target.name]) === 0 &&
      parseInt(event.target.value) > 1
    ) {
      setStateForm({ ...stateForm, action: 1, mode: event.target.value });
    }
    if (
      "mode".localeCompare([event.target.name]) === 0 &&
      parseInt(event.target.value) === 1
    ) {
      setStateForm({ ...stateForm, action: 2, mode: event.target.value });
    }
  };
  // Accion al abrir los modals
  const OpenModalStep2 = (e) => {
    e.preventDefault();
    let catego = document.getElementById("catego");
    let mode = document.getElementById("mode");
    if (catego.value !== 0 && mode.value !== 0) {
      catego.className = "mt-4 form-control is-valid";
      mode.className = "mt-4 form-control is-valid";
      setStateForm({ ...stateForm, mounth: 1 });
      ModStep2();
    } else {
      if (catego.value !== 0) {
        catego.className = "mt-4 form-control is-valid";
      } else {
        catego.className = "mt-4 form-control is-invalid";
      }
      if (mode.value !== 0) {
        mode.className = "mt-4 form-control is-valid";
      } else {
        mode.className = "mt-4 form-control is-invalid";
      }
    }
  };

  const renderRecursion = (listCategories) => {
    return listCategories.map((category) => (
      <>
        <option
          key={category.id + category.name}
          className={
            category.lvl === 1 || category.subCategories.length > 0
              ? "font-weight-bold"
              : ""
          }
          value={category.id}
          dangerouslySetInnerHTML={{__html: '&nbsp;'.repeat(category.lvl - 1) + category.name}}
        />
        {category.subCategories.length > 0 &&
          renderRecursion(category.subCategories)}
      </>
    ));
  };

  const OpenModalStep1 = (e) => {
    e.preventDefault();
    let year = document.getElementById("year");
    let badge = document.getElementById("badge");
    if (year.value !== 0 && badge.value !== 0) {
      year.className = "mt-4 form-control is-valid";
      badge.className = "mt-4 form-control is-valid";
      API.post("acount", {
        id: 5,
        idc: localStorage.getItem("IdUser"),
      }).then((response) => setCatego(response.data));
      ModStep1();
    } else {
      if (year.value !== 0) {
        year.className = "mt-4 form-control is-valid";
      } else {
        year.className = "mt-4 form-control is-invalid";
      }
      if (badge.value !== 0) {
        badge.className = "mt-4 form-control is-valid";
      } else {
        badge.className = "mt-4 form-control is-invalid";
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      stateForm.value < 0 ||
      stateForm.value === "" ||
      stateForm.mode === 0
    ) {
      alert("Value has to positive");
    } else {
      let replicar_val = 0;
      if (stateForm.mounth === 1 && stateForm.action === 2) {
        if (document.getElementById("replica").checked) {
          replicar_val = 1;
        }
      }
      document.getElementById("btn_save_budget").disabled = true;
      document.getElementById("btn_save_budget").innerHTML =
        "<span class='spinner-border spinner-border-sm mr-1'" +
        "role='status' aria-hidden='true'></span>Loading...";
      //console.log(stateForm);
      API.post("add_data", {
        id: 5,
        idu: localStorage.getItem("IdUser"),
        action: stateForm.action,
        month_frist: stateForm.mounth,
        value: stateForm.value,
        catego: stateForm.catego,
        mode: stateForm.mode,
        divisa: stateForm.badge,
        replica: replicar_val,
        year: stateForm.year,
      }).then((response) => {
        setSateAlert({ visible: true, code: response.data })
        setTimeout(() => {
          setSateAlert({ visible: false, code: 0 });
        }, 2000);
        //alert(response.data);
        if (stateForm.action === 1 || replicar_val === 1) {
          ModStep2();
          document.getElementById("btn_save_budget").innerHTML = "Next";
          document.getElementById("btn_save_budget").disabled = false;
        } else {
          if (stateForm.mounth < 12) {
            document.getElementById("mounth").value = stateForm.mounth + 1;
            document.getElementById("value").value = 0.0;
            setStateForm({
              ...stateForm,
              mounth: stateForm.mounth++,
            });
            setStateForm({ ...stateForm, value: 0.0 });
            document.getElementById("btn_save_budget").innerHTML = "Next";
            document.getElementById("btn_save_budget").disabled = false;
          } else {
            document.getElementById("mounth").value = 1;
            document.getElementById("value").value = 0.0;
            setStateForm({ ...stateForm, mounth: 1 });
            setStateForm({ ...stateForm, value: 0.0 });
            document.getElementById("btn_save_budget").innerHTML = "Finish";
            document.getElementById("btn_save_budget").disabled = false;
          }
        }
      });
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Card>
          <CardBody>
            <FormGroup>
              <Label for="badge">badge</Label>
              <Form.Control
                as="select"
                className="mt-4"
                id="badge"
                defaultValue="0"
                onChange={handleChange}
                name="badge"
              >
                <option value="0">Select a option</option>
                <option value="COP">COP</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="JPY">JPY</option>
                <option value="GBD">GBD</option>
                <option value="CAD">CAD</option>
                <option value="AUD">AUD</option>
                <option value="MXN">MXN</option>
                <option value="ILS">ILS</option>
              </Form.Control>
              <Label for="year">Budget year</Label>
              <Form.Control
                as="select"
                defaultValue="0"
                className="mt-4"
                name="year"
                onChange={handleChange}
                id="year"
              >
                <option value="0">Select a option</option>
                <option value={year - 1}>{year - 1}</option>
                <option value={year}>{year}</option>
                <option value={year + 1}>{year + 1}</option>
              </Form.Control>
              <Button
                color="primary"
                className="mt-3"
                onClick={(e) => OpenModalStep1(e)}
              >
                Next
              </Button>
            </FormGroup>
          </CardBody>
        </Card>
        <Modal show={ShowStep1} id="ModalSetp1" onHide={ModStep1}>
          <Modal.Header closeButton>
            <Modal.Title>Budget Part I</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <Label for="catego">Category</Label>
              <Form.Control
                as="select"
                id="catego"
                name="catego"
                onChange={handleChange}
              >
                <option></option>
                {stateCatego.id !== -1000
                  ? renderRecursion(stateCatego): ""}
              </Form.Control>
            </FormGroup>
            <FormGroup>
              <Label for="mode">Budget mode</Label>
              <Form.Control
                as="select"
                className="mt-4"
                name="mode"
                id="mode"
                defaultValue="0"
                onChange={handleChange}
              >
                <option value="0">Select a option</option>
                <option value="1">Monthly</option>
                <option value="2">Bimonthly</option>
                <option value="3">Quarterly</option>
                <option value="4">Four-semester</option>
                <option value="6">Biannual</option>
                <option value="12">Annual</option>
              </Form.Control>
            </FormGroup>
          </Modal.Body>
          <ModalFooter>
            <Button color="secundary" onClick={ModStep1}>
              Close
            </Button>
            <Button color="primary" onClick={(e) => OpenModalStep2(e)}>
              Next
            </Button>
          </ModalFooter>
        </Modal>
        <Modal show={ShowStep2} id="ModalSetp2" onHide={ModStep2}>
          <Modal.Header closeButton>
            <Modal.Title>Budget Part II</Modal.Title>
          </Modal.Header>
          <Form role="form" onSubmit={handleSubmit}>
            <Modal.Body>
              <FormGroup>
                <Label>Mounth</Label>
                <Form.Control
                  as="select"
                  className="mt-4"
                  name="mounth"
                  disabled={stateForm.action === 2 ? true : false}
                  id="mounth"
                  onChange={handleChange}
                  defaultValue={stateForm.mounth}
                >
                  <option value="0">Select a option</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>Value</Label>
                <Form.Control
                  pattern="[0-9]{0,5}"
                  type="number"
                  name="value"
                  id="value"
                  step={0.01}
                  onChange={handleChange}
                  required
                ></Form.Control>
              </FormGroup>
              {stateForm.action === 2 && stateForm.mounth === 1 ? (
                <FormGroup>
                  <Form.Check
                    type="checkbox"
                    label="Duplicate values ​​for all months"
                    value="1"
                    name="replica"
                    id="replica"
                    onChange={handleChange}
                  />
                </FormGroup>
              ) : (
                ""
              )}
            </Modal.Body>
            <ModalFooter>
              <Button color="secundary" onClick={ModStep2}>
                Prev
              </Button>
              <Button color="primary" id="btn_save_budget" type="submit">
                {stateForm.action === 2 || stateForm.replica === 1
                  ? "Next"
                  : "Finish"}
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Container>
      <Alert visible={stateAlert.visible} code={stateAlert.code} />
    </>
  );
}

export default ViewBudget;
