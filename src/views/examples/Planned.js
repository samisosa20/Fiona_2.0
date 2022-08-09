import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  FormGroup,
  Label,
  Button,
  Input,
} from "reactstrap";
import { Form, Modal, InputGroup } from "react-bootstrap";

import API from "../../variables/API";
import axios from "axios";

// core components
import { Header } from "components/Headers/Header.js";
import "../../assets/styles/components/Catego.scss";

import Modaldelete from "../../components/Modals/Delete";
import Alert from "../../components/Alert";
import Modaledit from "../../components/Modals/EditPlanned";
import ContextMenuCustom from "../../components/ContextMenu";

const Catego = () => {
  /* Declaracion de variables */
  const [contextMenu, setContextMenu] = useState(null);
  const [state, setState] = useState([]);
  const [refreshData, setrefreshData] = useState(false);
  const [stateSignal, setSignal] = useState({ Signal: "+" });
  const [stateAcount, setAcount] = useState([]);
  // envio de informacion
  const [stateform, setform] = useState({
    category: "",
    descrip: "",
    badge: "COP",
    value: 0,
    frequency: "0",
    recurrency: "",
    startDate: null,
    endDate: null,
  });
  // edicion de informacion
  const [stateformEdit, setformEdit] = useState({
    catego: "",
    description: "",
    account: "",
    badge: "COP",
    monto: 0,
    frequency: "0",
    recurrency: "",
    startDate: null,
    endDate: null,
    id_data: 0,
  });

  const translateRecu = {
    "-1.00": "Specific Day",
    "0.70": "Weekly",
    "0.15": "Biweekly",
    "1.00": "Monthly",
    "2.00": "Bimonthly",
    "3.00": "Trimestraly",
    "4.00": "Quarterly",
    "6.00": "Biannual",
    "12.00": "Yearly",
  };

  /* Declaracion de estados de los modals */
  const [showNewMod, setshowNewMod] = useState(false);
  const [showDelMod, setshowDelMod] = useState(false);
  const [showEdiMod, setshowEdiMod] = useState(false);
  const [stateCatego, setCatego] = useState([]);
  const [stateAlert, setSateAlert] = useState({ visible: false, code: 200 });

  // Funcion para cambiar de estado de los modals
  const ModNewPlannedSate = () => setshowNewMod(!showNewMod);
  const ModDelCateSate = () => setshowDelMod(!showDelMod);
  const ModEdiEventSate = () => setshowEdiMod(!showEdiMod);

  useEffect(() => {
    let idc = localStorage.getItem("IdUser");
    API.post("acount", {
      id: 15,
      idc: idc,
    }).then((response) => {
      //console.log(response.data);
      setState(response.data);
    });
    setform({
      ...stateform,
      startDate: `${new Date().getFullYear()}-${`${
        new Date().getMonth() + 1
      }`.padStart(2, 0)}-${`${new Date().getDate()}`.padStart(2, 0)}`,
    });
  }, [refreshData]);

  const handleChange = (event) => {
    if(event.target.name === 'repeat' && event.target.value === '0') {
      setform({ ...stateform, endDate: '', [event.target.name]: event.target.value });
    } else {
      setform({ ...stateform, [event.target.name]: event.target.value });
    }
  };
  const handleChangeEdit = (event) => {
    setformEdit({ ...stateformEdit, [event.target.name]: event.target.value });
  };

  const OpenModalNew = (e) => {
    e.preventDefault();
    let idc = localStorage.getItem("IdUser");
    axios
      .all([
        API.post(`acount`, {
          id: 5,
          idc: idc,
        }),
        API.post(`acount`, {
          id: 2,
          idc: idc,
        }),
      ])
      .then(
        axios.spread((firstResponse, secondResponse) => {
          setCatego(firstResponse.data);
          setAcount(secondResponse.data);
        })
      );
    ModNewPlannedSate();
  };
  const OpenModalDelete = (e) => {
    e.preventDefault();
    ModDelCateSate();
  };
  const OpenModalEdit = (e, data) => {
    e.preventDefault();
    let idc = localStorage.getItem("IdUser");
    axios
      .all([
        API.post(`acount`, {
          id: 5,
          idc: idc,
        }),
        API.post(`acount`, {
          id: 2,
          idc: idc,
        }),
      ])
      .then(
        axios.spread((firstResponse, secondResponse) => {
          setCatego(firstResponse.data);
          setAcount(secondResponse.data);
          setformEdit({
            category: data.category,
            account: data.account,
            description: data.description,
            badge: data.badge,
            value: data.value < 0 ? data.value * -1 : data.value,
            frequency: data.fequency,
            recurrency: data.recurrency,
            startDate: data.startDate,
            endDate: data.endDate,
            categoryName: data.categoryName,
            accountName: data.accountName,
            specificDay: data.specificDay,
            signal: data.value < 0 ? "-" : "+",
            repeat: stateformEdit.endDate === '0000-00-00' ? 0 : 1,
            id_data: data.id,
          });
          ModEdiEventSate();
        })
      );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      stateform.startDate === "" ||
      stateform.account === "" ||
      stateform.value === "" ||
      stateform.category === ""
    ) {
      setSateAlert({ visible: true, code: 1 });
      setTimeout(() => {
        setSateAlert({ visible: false, code: 0 });
      }, 2000);
    } else {
      API.post("add_data", {
        id: 9,
        idu: localStorage.getItem("IdUser"),
        value: stateform.value,
        badge: stateform.badge,
        account: stateform.account,
        category: stateform.category,
        startDate: stateform.startDate,
        frequency: stateform.frequency,
        recurrency: stateform.recurrency,
        specificDay: stateform.specificDay,
        endDate: stateform.endDate,
        description: stateform.description,
      }).then((response) => {
        //alert(response.data);
        ModNewPlannedSate();
        setrefreshData(!refreshData);
        setSignal({ Signal: "+" });
        setSateAlert({ visible: true, code: response.data });
        setform({frequency: '0', repeat: '0'})
        setTimeout(() => {
          setSateAlert({ visible: false, code: 0 });
        }, 2000);
      });
    }
  };

  const handleContextMenu = (event, data) => {
    event.preventDefault();

    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            onClickEdit: (event) => {
              OpenModalEdit(event, data);
            },
          }
        : null
    );
  };
  const handleClose = () => {
    setContextMenu(null);
  };
  const ChangeSignal = (event) => {
    setSignal({ Signal: event.target.value !== "+" ? "+" : "-" });
  };
  const VerifySignal = (event, idSigno) => {
    if (event.target.value < 0) {
      if (idSigno !== "") {
        setSignal({ Signal: "-" });
      }
      event.target.value = event.target.value * -1;
      setform({ ...stateform, [event.target.name]: event.target.value * -1 });
    } else {
      setform({
        ...stateform,
        [event.target.name]:
          stateSignal.Signal === "+"
            ? event.target.value
            : event.target.value * -1,
      });
    }
  };

  const renderRecursion = (listCategories) => {
    return listCategories.map((category) => (
      <>
        <option
          key={category.id + category.name}
          className={
            category.lvl === 1 || category.subCategories?.length > 0
              ? "font-weight-bold"
              : ""
          }
          value={category.id}
          dangerouslySetInnerHTML={{__html: '&nbsp;'.repeat(category.lvl - 1) + category.name}}
        />
        {category.subCategories?.length > 0 &&
          renderRecursion(category.subCategories)}
      </>
    ));
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          {state
            ? state.map((data, index) => (
                <Card
                  className="shadow col-md-12 col-lg-5 mr-2 ml-2 mb-3 arrow c-categorie px-0"
                  key={index}
                  onContextMenu={(e) => handleContextMenu(e, data)}
                >
                  <CardBody
                    className="py-3 rounded px-0"
                    onClick={(e) => OpenModalEdit(e, data)}
                  >
                    <div className="col-10 mt-1 px-0">
                      <h3 className="card-title col-md-9 col-lg-9 col-xl-9 text-dark m-0">
                        {data.categoryName}
                        {" - "}
                        {data.accountName}
                        {data.active === "0" && (
                          <span className="text-gray text-sm float-right">
                            inactive
                          </span>
                        )}
                      </h3>
                      <div className="row px-3">
                        <h4 className="card-title col-12 col-md-6 col-xl-6 text-muted m-0">
                          Amount:{" "}
                          <span className="text-dark ml-1">
                            <NumberFormat
                              className={
                                data.value >= 0 ? `text-success` : `text-danger`
                              }
                              value={data.value ? data.value : 0}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          </span>
                        </h4>
                        <h4 className="card-title col-12 col-md-6 col-xl-6 text-muted m-0">
                          Frequency:{" "}
                          <span className="text-dark ml-1">
                            {data.fequency == "0"
                              ? "One time"
                              : translateRecu[data.recurrency]}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </CardBody>
                  <div
                    onClick={(e) => handleContextMenu(e, data)}
                    className="position-absolute right-4 top-4"
                  >
                    <i className="fa fa-ellipsis-v"></i>
                  </div>
                </Card>
              ))
            : ""}
          <ContextMenuCustom
            contextMenu={contextMenu}
            handleClose={handleClose}
          />
          <Card
            className="shadow col-md-12 col-lg-5 mr-2 ml-2 mb-3 arrow c-categorie px-0"
            onClick={(e) => OpenModalNew(e)}
          >
            <CardBody className="rounded px-0">
              <div className="col px-0">
                <h3 className="card-title col-md-9 col-lg-9 col-xl-9 text-muted m-0">
                  <i className="fas fa-plus mr-2"></i>New Planned Payment
                </h3>
              </div>
            </CardBody>
          </Card>
        </Row>
        <div>
          <Alert visible={stateAlert.visible} code={stateAlert.code} />
          <Modal show={showNewMod} id="ModalAdd" onHide={ModNewPlannedSate}>
            <Modal.Header closeButton>
              <Modal.Title>Creator of planned payment</Modal.Title>
            </Modal.Header>
            <Form role="form" onSubmit={handleSubmit}>
              <Modal.Body>
                <FormGroup>
                  <Row>
                    <div className="col-md-8">
                      <Label>Value</Label>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <Button
                            value={stateSignal.Signal}
                            type="button"
                            id="signo_move"
                            className={`btn ${
                              stateSignal.Signal === "+"
                                ? "btn-outline-success"
                                : "btn-outline-danger"
                            }`}
                            onClick={ChangeSignal}
                          >
                            {stateSignal.Signal}
                          </Button>
                        </InputGroup.Prepend>
                        <Form.Control
                          pattern="[0-9]{0,5}"
                          type="number"
                          name="value"
                          id="value"
                          step={0.01}
                          aria-describedby="SignalAppend"
                          required
                          onChange={(e) => VerifySignal(e, "signo_move")}
                        ></Form.Control>
                      </InputGroup>
                    </div>
                    <div className="col-md-3">
                      <Form.Control
                        as="select"
                        className="mt-4"
                        name="badge"
                        onChange={handleChange}
                      >
                        <option>COP</option>
                        <option>USD</option>
                      </Form.Control>
                    </div>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Label>Acount</Label>
                  <Form.Control
                    as="select"
                    name="account"
                    onChange={handleChange}
                  >
                    <option></option>
                    {stateAcount.id !== -1000 && stateAcount.length > 0
                      ? stateAcount.map((data, index) => {
                          return (
                            <option
                              key={index}
                              className="font-weight-bold"
                              value={data.id}
                            >
                              {data.nombre}
                            </option>
                          );
                        })
                      : ""}
                  </Form.Control>
                </FormGroup>
                <FormGroup>
                  <Label>Category</Label>
                  <Form.Control
                    as="select"
                    name="category"
                    onChange={handleChange}
                  >
                    <option></option>
                    {stateCatego.id !== -1000
                  ? renderRecursion(stateCatego): ""}
                  </Form.Control>
                </FormGroup>
                <FormGroup>
                  <Label>Description</Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows="3"
                    onChange={handleChange}
                  ></Form.Control>
                </FormGroup>
                <FormGroup>
                  <Label>Frequency</Label>
                  <Form.Control
                    as="select"
                    name="frequency"
                    onChange={handleChange}
                  >
                    <option value="0">One time</option>
                    <option value="1">Recurrent payment</option>
                  </Form.Control>
                </FormGroup>
                <FormGroup>
                  <Label>
                    {stateform.frequency === "0" ? "Date" : "Start date"}
                  </Label>
                  <Input
                    type="date"
                    name="startDate"
                    defaultValue={stateform.startDate}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup hidden={stateform.frequency === "0"}>
                  <Label>Recurrency</Label>
                  <Form.Control
                    as="select"
                    name="recurrency"
                    onChange={handleChange}
                    defaultValue={stateform.recurrency}
                  >
                    <option value="" hidden>
                      Set recurrence
                    </option>
                    <option value="-1.00">specific day</option>
                    <option value="0.1">Daily</option>
                    <option value="0.7">Weekly</option>
                    <option value="0.15">Biweekly</option>
                    <option value="1.00">Monthly</option>
                    <option value="2.00">Bimonthly</option>
                    <option value="3.00">Trimestraly</option>
                    <option value="4.00">Quarterly</option>
                    <option value="6.00">Biannual</option>
                    <option value="12.00">Yearly</option>
                  </Form.Control>
                </FormGroup>
                <FormGroup hidden={stateform.recurrency !== "-1.00"}>
                  <Label>Choose a day</Label>
                  <Form.Control
                    as="select"
                    name="specificDay"
                    onChange={handleChange}
                    defaultValue={stateform.specificDay}
                  >
                    <option value="" hidden>
                      Select a day
                    </option>
                    {Array.from(Array(31), (e, i) => {
                      return <option key={i+1}>{i+1}</option>
                    })
                    }
                  </Form.Control>
                </FormGroup>
                <FormGroup hidden={stateform.frequency === "0"}>
                  <Label>Repeat</Label>
                  <Form.Control
                    as="select"
                    name="repeat"
                    onChange={handleChange}
                  >
                    <option value="0">Forever</option>
                    <option value="1">Until a date</option>
                  </Form.Control>
                </FormGroup>
                <FormGroup hidden={!stateform.repeat || stateform.repeat === "0"}>
                  <Label>End Date</Label>
                  <Input type="date" name="endDate" onChange={handleChange} />
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button color="danger" onClick={ModNewPlannedSate}>
                  Close
                </Button>
                <Button type="submit" color="success">
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
          <Modaldelete
            action="planned"
            title="Delete planned payment"
            message={
              "Are you sure delete the planned payment " +
              stateformEdit.categoryName +
              " - " +
              stateformEdit.accountName +
              "?"
            }
            refreshData={refreshData}
            setrefreshData={setrefreshData}
            state={stateformEdit}
            showDelMod={showDelMod}
            setshowDelMod={setshowDelMod}
            setSateAlert={setSateAlert}
          />
          <Modaledit
            title="Edit planned payment"
            refreshData={refreshData}
            setrefreshData={setrefreshData}
            stateformEdit={stateformEdit}
            stateAcount={stateAcount}
            stateCatego={stateCatego}
            setformEdit={setformEdit}
            showEdiMod={showEdiMod}
            setshowEdiMod={setshowEdiMod}
            setSateAlert={setSateAlert}
            handle={handleChangeEdit}
            OpenModalDelete={OpenModalDelete}
          />
        </div>
      </Container>
    </>
  );
};

export default Catego;
