import React from "react";
import NumberFormat from "react-number-format";

// Components
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
import useComponents from "views/components";

import "assets/styles/components/Catego.scss";

// Controllers
import useControllers from "controllers";

const Planned = () => {
  // Components
  const { Headers, Alert, Modals, ContextMenuCustom } = useComponents();
  const { Header } = Headers();
  const { Modaldelete, Modaledit } = Modals();

  const { useScreenHooks } = useControllers();
  const { usePlanned } = useScreenHooks();
  const {
    state,
    handleContextMenu,
    OpenModalEdit,
    translateRecu,
    contextMenu,
    handleClose,
    OpenModalNew,
    stateAlert,
    showNewMod,
    ModNewPlannedSate,
    handleSubmit,
    stateSignal,
    ChangeSignal,
    VerifySignal,
    stateAcount,
    handleChange,
    stateCatego,
    renderRecursion,
    stateform,
    stateformEdit,
    refreshData,
    setrefreshData,
    showDelMod,
    setshowDelMod,
    setSateAlert,
    showEdiMod,
    setshowEdiMod,
    handleChangeEdit,
    OpenModalDelete,
    setformEdit,
  } = usePlanned();
  return (
    <>
      <Header />
      <Container className="mt--7 pb-150" fluid>
        <Row className="justify-content-around">
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
                            {data.fequency === "0"
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
                      ? renderRecursion(stateCatego)
                      : ""}
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
                      return <option key={i + 1}>{i + 1}</option>;
                    })}
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
                <FormGroup
                  hidden={!stateform.repeat || stateform.repeat === "0"}
                >
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

export default Planned;
