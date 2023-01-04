import React from "react";

// Components
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  FormGroup,
  Label,
  ModalFooter,
} from "reactstrap";
import { Form, InputGroup, Modal } from "react-bootstrap";
import useComponents from "views/components";

// Controllers
import useControllers from "controllers";

const Movements = () => {
  // Components
  const { Headers, Alert, Modals } = useComponents();
  const { Header } = Headers();
  const { Modaldelete } = Modals();

  const { useScreenHooks } = useControllers();
  const { useMovements } = useScreenHooks();
  const {
    handleChangeAccount,
    acount,
    listAccount,
    OpenModalTrans,
    state,
    searchMove,
    OpenModalEdit,
    OpenModalMovi,
    OpenModalEditTras,
    stateAlert,
    showNewMod,
    ModNewMoviSate,
    handleSubmit,
    stateSignal,
    ChangeSignal,
    stateform,
    VerifySignal,
    handleChange,
    stateCatego,
    renderRecursion,
    showAdvanceOption,
    showOption,
    stateEvent,
    showNewTransMod,
    ModNewTransSate,
    handleSubmit_trans,
    stateformtrans,
    handleChangeTrans,
    showEditsMod,
    ModEditSate,
    handleSubmitEdit,
    stateformEdit,
    handleChangeEdit,
    OpenModalDelete,
    refreshData,
    setrefreshData,
    showDelMod,
    setshowDelMod,
    ModEditTransSate,
    setSateAlert,
    showEditsTransMod,
    handleSubmitEditTrans,
    stateformEditTrans,
    handleChangeEditTrans,
  } = useMovements();

  return (
    <>
      <Header refreshData={refreshData}/>
      {/* Page content */}
      <Container className="mt--7 pb-150" fluid>
        {/* Table */}
        <Row className="mb-2">
          <div className="col">
            <Form.Control
              as="select"
              name="account"
              onChange={handleChangeAccount}
              value={acount.toString()}
            >
              {listAccount
                .filter((v) => parseInt(v.show))
                .map((v, i) => (
                  <option key={i} value={v.id}>
                    {v.nombre}
                  </option>
                ))}
            </Form.Control>
          </div>
          <div className="col justify-content-end row">
            <Button className="btn-info mb-3" onClick={(e) => OpenModalMovi(e)}>
              <i className="fas fa-plus mr-2"></i>
              Move
            </Button>
            <Button
              className="mr-3 mb-3 btn-success"
              onClick={(e) => OpenModalTrans(e)}
            >
              <i className="fas fa-exchange-alt mr-2"></i>
              Transfer
            </Button>
          </div>
        </Row>
        <Card className="shadow col-md-12 mb-3">
          <CardHeader className="border-0 pt-3 px-2">
            <div className="d-md-flex">
              <div className="col p-0">
                <h3 className="mb-0 text-bold">
                  Description:
                  <span className="font-weight-normal ml-1">
                    {state.Descripcion}
                  </span>
                </h3>
              </div>
              <div className="col justify-content-end my-2 my-md-0 p-0">
                <h3 className="mb-0">
                  Balance:
                  <span className="font-weight-normal ml-1">
                    {state.Balance + " " + state.Divisa}
                  </span>
                </h3>
              </div>
              <FormGroup className="col p-0 m-0">
                <Form.Control
                  type="text"
                  name="search"
                  placeholder="Search"
                  onKeyUp={(e) => searchMove(e)}
                ></Form.Control>
              </FormGroup>
            </div>
          </CardHeader>
        </Card>
        <ListGroup
          className="shadow col-md-12 mb-3 p-0"
          style={{ maxHeight: "500px", overflow: "auto" }}
        >
          {state.json_movi ? (
            state.json_movi.map((data, index) => (
              <ListGroupItem
              className="cursor-pointer"
                key={index}
                onClick={
                  data.categoria !== "Transferencia"
                    ? (e) =>
                        OpenModalEdit(
                          e,
                          data.id,
                          data.valor_int,
                          data.divisa,
                          data.descripcion,
                          data.fecha,
                          data.nro_cate,
                          data.evento
                        )
                    : (e) =>
                        OpenModalEditTras(
                          e,
                          data.id,
                          data.valor_int,
                          data.divisa,
                          data.descripcion,
                          data.fecha,
                          data.id_transfe,
                          data.trm
                        )
                }
              >
                <Row>
                  <div className="col">
                    <h3 className="mb-0">{data.categoria}</h3>
                  </div>
                  <div className="col justify-content-end">
                    {data.valor_int < 0 ? (
                      <h3 className="mb-0 text-danger">
                        {"$ " + data.valor + " " + data.divisa}
                      </h3>
                    ) : (
                      <h3 className="mb-0 text-success">
                        {"$ " + data.valor + " " + data.divisa}
                      </h3>
                    )}
                  </div>
                </Row>
                <div className="col">Date: {data.fecha}</div>
              </ListGroupItem>
            ))
          ) : (
            <ListGroupItem>
              <Row>
                <div className="col">
                  <h3 className="mb-0 text-center">Without Movement</h3>
                </div>
              </Row>
            </ListGroupItem>
          )}
        </ListGroup>
        <Alert visible={stateAlert.visible} code={stateAlert.code} />
        <Modal show={showNewMod} id="ModalAdd" onHide={ModNewMoviSate}>
          <Modal.Header closeButton>
            <Modal.Title>Add Movement</Modal.Title>
          </Modal.Header>
          <Form role="form" onSubmit={handleSubmit}>
            <Modal.Body>
              <FormGroup>
                <Row className="align-items-end">
                  <div className="col-md-8">
                    <Label>Value</Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <Button
                          value={stateSignal.Signal}
                          type="button"
                          id="signo_move"
                          className="btn btn-outline-success"
                          onClick={ChangeSignal}
                        >
                          {stateSignal.Signal}
                        </Button>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="number"
                        id="monto"
                        name="monto"
                        placeholder=" Please enter a value"
                        value={stateform.monto}
                        required
                        step={0.01}
                        className="form-control"
                        onChange={(e) => VerifySignal(e, "signo_move")}
                      />
                    </InputGroup>
                  </div>
                  <div className="col-md-3">
                    <Form.Control
                      as="select"
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
                <Label>Category</Label>
                <Form.Control as="select" name="catego" onChange={handleChange} required>
                  <option value="" hidden>
                    Choose a category
                  </option>
                  {renderRecursion(stateCatego)}
                </Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Form.Control
                  as="textarea"
                  name="descrip"
                  rows="3"
                  onChange={handleChange}
                ></Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>Date</Label>
                <Form.Control
                  type="datetime-local"
                  defaultValue={`${new Date().getFullYear()}-${`${
                    new Date().getMonth() + 1
                  }`.padStart(2, 0)}-${`${new Date().getDate()}`.padStart(
                    2,
                    0
                  )}T${`${new Date().getHours()}`.padStart(
                    2,
                    0
                  )}:${`${new Date().getMinutes()}`.padStart(2, 0)}`}
                  name="datetime"
                  onChange={handleChange}
                ></Form.Control>
              </FormGroup>
              <p
                className="text-sm text-info"
                onClick={() => showAdvanceOption()}
              >
                Advanced Options
                <i
                  className={`fas ${
                    showOption ? "fa-chevron-up" : "fa-chevron-down"
                  } ml-2`}
                ></i>
              </p>
              {showOption && (
                <FormGroup>
                  <Label>Event</Label>
                  <Form.Control
                    as="select"
                    name="event"
                    onChange={handleChange}
                  >
                    <option value="" hidden>
                      Choose an event
                    </option>
                    {stateEvent.length > 0
                      ? stateEvent.map((data, index) => {
                          if (data.activo === "1") {
                            return (
                              <option key={index} value={data.id}>
                                {data.nombre}
                              </option>
                            );
                          }
                          return null
                        })
                      : ""}
                  </Form.Control>
                </FormGroup>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button color="danger" onClick={ModNewMoviSate}>
                Close
              </Button>
              <Button type="submit" color="success" id="btn_new_move_move">
                Add
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal show={showNewTransMod} id="ModalTrans" onHide={ModNewTransSate}>
          <Modal.Header closeButton>
            <Modal.Title>Add Transfer</Modal.Title>
          </Modal.Header>
          <Form role="form" onSubmit={handleSubmit_trans}>
            <Modal.Body>
              <FormGroup>
                <Row className="align-items-end">
                  <div className="col-md-8">
                    <Label>Value</Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <Button
                          value={stateSignal.Signal}
                          type="button"
                          className="btn btn-outline-success"
                        >
                          +
                        </Button>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="number"
                        id="monto"
                        name="monto"
                        placeholder=" Please enter a value"
                        value={stateformtrans?.monto}
                        required
                        step={0.01}
                        className="form-control"
                        onChange={(e) => VerifySignal(e, "")}
                      />
                    </InputGroup>
                  </div>
                  <div className="col-md-3">
                    <Form.Control
                      as="select"
                      name="badge"
                      onChange={handleChangeTrans}
                    >
                      <option>COP</option>
                      <option>USD</option>
                    </Form.Control>
                  </div>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label>Out Account</Label>
                <Form.Control
                  as="select"
                  id="account_ini"
                  name="account_ini"
                  required
                  onChange={handleChangeTrans}
                  defaultValue={acount}
                >
                  <option value="" hidden>
                    Choose an account
                  </option>
                  {stateCatego.map((data, index) => {
                          return (
                            <option key={index} value={data.id}>
                              {data.nombre}
                            </option>
                          );
                      })
                  }
                </Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>In Account</Label>
                <Form.Control
                  as="select"
                  name="account_fin"
                  required
                  onChange={handleChangeTrans}
                >
                  <option value="" hidden>
                    Choose an account
                  </option>
                  {stateCatego.map((data, index) => {
                        return (
                          <option key={index} value={data.id}>
                            {data.nombre}
                          </option>
                        );
                      })}
                </Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Form.Control
                  as="textarea"
                  name="descrip"
                  rows="3"
                  onChange={handleChangeTrans}
                ></Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>Date</Label>
                <Form.Control
                  type="datetime-local"
                  name="datetime"
                  defaultValue={`${new Date().getFullYear()}-${`${
                    new Date().getMonth() + 1
                  }`.padStart(2, 0)}-${`${new Date().getDate()}`.padStart(
                    2,
                    0
                  )}T${`${new Date().getHours()}`.padStart(
                    2,
                    0
                  )}:${`${new Date().getMinutes()}`.padStart(2, 0)}`}
                  onChange={handleChangeTrans}
                ></Form.Control>
              </FormGroup>
              <p
                className="text-sm text-info"
                onClick={() => showAdvanceOption()}
              >
                Advanced Options
                <i
                  className={`fas ${
                    showOption ? "fa-chevron-up" : "fa-chevron-down"
                  } ml-2`}
                ></i>
              </p>
              {showOption && (
                <FormGroup>
                  <Row className="align-items-end">
                    <div className="col-md-8">
                      <Label>TRM</Label>
                      <Form.Control
                        pattern="[0-9]{0,5}"
                        type="number"
                        name="trm"
                        id="trm"
                        step={0.01}
                        required
                        disabled
                        key={
                          stateformtrans.monto +
                          stateformtrans.inBadge +
                          stateformtrans.badge +
                          stateformtrans.trm
                        }
                        defaultValue={stateformtrans.trm}
                        onChange={handleChangeTrans}
                      ></Form.Control>
                    </div>
                    <div className="col-md-3">
                      <Label>In Badge</Label>
                      <Form.Control
                        as="select"
                        name="inBadge"
                        onChange={handleChangeTrans}
                      >
                        <option>COP</option>
                        <option>USD</option>
                      </Form.Control>
                    </div>
                  </Row>
                </FormGroup>
              )}
              {showOption && (
                <FormGroup>
                  <Label>Custom deposit amount</Label>
                  <Form.Control
                    pattern="[0-9]{0,5}"
                    type="number"
                    name="customDeposit"
                    id="customDeposit"
                    step={0.01}
                    required
                    key={
                      stateformtrans.monto +
                      stateformtrans.badge +
                      stateformtrans.inBadge
                    }
                    defaultValue={stateformtrans.customDeposit}
                    onChange={handleChangeTrans}
                  ></Form.Control>
                </FormGroup>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button color="danger" onClick={ModNewTransSate}>
                Close
              </Button>
              <Button type="submit" color="success" id="btn_new_trans_move">
                Add
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal show={showEditsMod} id="ModalEdit" onHide={ModEditSate}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Movement</Modal.Title>
          </Modal.Header>
          <Form role="form" onSubmit={handleSubmitEdit}>
            <Modal.Body>
              <FormGroup>
                <Row className="align-items-end">
                  <div className="col-md-8">
                    <Label>Value</Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <Button
                          value={stateSignal.Signal}
                          type="button"
                          id="signo_move_edit"
                          name="Signal"
                          className={
                            stateSignal.Signal === "+"
                              ? "btn btn-outline-success"
                              : "btn btn-outline-danger"
                          }
                          onClick={ChangeSignal}
                        >
                          {stateSignal.Signal}
                        </Button>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="number"
                        id="monto_edit"
                        name="monto"
                        placeholder=" Please enter a value"
                        defaultValue={stateformEdit.monto}
                        required
                        step={0.01}
                        className="form-control"
                        onChange={(e) => VerifySignal(e, "signo_move_edit")}
                      />
                    </InputGroup>
                  </div>
                  <div className="col-md-3">
                    <Form.Control
                      as="select"
                      name="badge"
                      onChange={handleChangeEdit}
                    >
                      <option>COP</option>
                      <option>USD</option>
                    </Form.Control>
                  </div>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label>Category</Label>
                <Form.Control
                  as="select"
                  name="catego"
                  required
                  onChange={handleChangeEdit}
                  value={stateformEdit.catego}
                >
                  <option></option>
                  {stateCatego.id !== -1000 ? renderRecursion(stateCatego) : ""}
                </Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Form.Control
                  as="textarea"
                  defaultValue={stateformEdit.descrip}
                  name="descrip"
                  rows="3"
                  onChange={handleChangeEdit}
                ></Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>Date</Label>
                <Form.Control
                  type="datetime-local"
                  defaultValue={stateformEdit.datetime}
                  name="datetime"
                  onChange={handleChangeEdit}
                ></Form.Control>
              </FormGroup>
              <p
                className="text-sm text-info"
                onClick={() => showAdvanceOption()}
              >
                Advanced Options
                <i
                  className={`fas ${
                    showOption ? "fa-chevron-up" : "fa-chevron-down"
                  } ml-2`}
                ></i>
              </p>
              {showOption && (
                <FormGroup>
                  <Label>Event</Label>
                  <Form.Control
                    as="select"
                    name="event"
                    onChange={handleChangeEdit}
                    value={stateformEdit.event ? stateformEdit.event : ""}
                  >
                    <option value="" hidden>
                      Choose an event
                    </option>
                    {stateEvent.length > 0
                      ? stateEvent.map((data, index) => {
                          if (data.activo === "1") {
                            return (
                              <option key={index} value={data.id}>
                                {data.nombre}
                              </option>
                            );
                          }
                          return null
                        })
                      : ""}
                  </Form.Control>
                </FormGroup>
              )}
            </Modal.Body>
            <ModalFooter>
              <Button
                color="danger"
                onClick={(e) =>
                  OpenModalDelete(
                    e,
                    stateformEdit.id_data,
                    stateformEdit.datetime,
                    "move"
                  )
                }
              >
                Delete
              </Button>
              <Button type="submit" color="success" id="btn_edit_move_move">
                Save Changes
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Modaldelete
          action="movement"
          title="Delete movement"
          message="Are you sure to delete the movement of this account?"
          refreshData={refreshData}
          setrefreshData={setrefreshData}
          state={stateformEdit}
          showDelMod={showDelMod}
          setshowDelMod={setshowDelMod}
          extraModal={
            stateformEdit.Modal === "move" ? ModEditSate : ModEditTransSate
          }
          setSateAlert={setSateAlert}
        />
        <Modal
          show={showEditsTransMod}
          id="ModalEditTrans"
          onHide={ModEditTransSate}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Transfer</Modal.Title>
          </Modal.Header>
          <Form role="form" onSubmit={handleSubmitEditTrans}>
            <Modal.Body>
              <FormGroup>
                <Row className="align-items-end">
                  <div className="col-md-8">
                    <Label>Value</Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <Button
                          defaultValue={stateSignal.Signal}
                          type="button"
                          id="signo_trans_edit"
                          className={
                            stateSignal.Signal === "+"
                              ? "btn btn-outline-success"
                              : "btn btn-outline-danger"
                          }
                          onClick={ChangeSignal}
                        >
                          {stateSignal.Signal}
                        </Button>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="number"
                        id="monto_edit"
                        name="monto"
                        placeholder=" Please enter a value"
                        defaultValue={stateformEditTrans.monto}
                        required
                        step={0.01}
                        className="form-control"
                        onChange={(e) => VerifySignal(e, "signo_trans_edit")}
                      />
                    </InputGroup>
                  </div>
                  <div className="col-md-3">
                    <Form.Control
                      as="select"
                      name="badge"
                      onChange={handleChangeEditTrans}
                    >
                      <option>COP</option>
                      <option>USD</option>
                    </Form.Control>
                  </div>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label>In Account</Label>
                <Form.Control
                  as="select"
                  name="account_ini"
                  onChange={handleChangeEditTrans}
                >
                  <option></option>
                  {stateCatego.id !== -1000
                    ? stateCatego.map((data, index) => {
                        if (data.id === stateformEditTrans.account_ini) {
                          return (
                            <option
                              key={index}
                              selected
                              className="font-weight-bold"
                              value={data.id}
                            >
                              {data.nombre}
                            </option>
                          );
                        } else {
                          return (
                            <option key={index} value={data.id}>
                              {data.nombre}
                            </option>
                          );
                        }
                      })
                    : ""}
                </Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>Out Account</Label>
                <Form.Control
                  as="select"
                  name="account_fin"
                  onChange={handleChangeEditTrans}
                >
                  <option></option>
                  {stateCatego.id !== -1000
                    ? stateCatego.map((data, index) => {
                        if (data.id === stateformEditTrans.account_fin) {
                          return (
                            <option
                              key={index}
                              selected
                              className="font-weight-bold"
                              value={data.id}
                            >
                              {data.nombre}
                            </option>
                          );
                        } else {
                          return (
                            <option key={index} value={data.id}>
                              {data.nombre}
                            </option>
                          );
                        }
                      })
                    : ""}
                </Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Form.Control
                  as="textarea"
                  defaultValue={stateformEditTrans.descrip}
                  name="descrip"
                  rows="3"
                  onChange={handleChangeEditTrans}
                ></Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>Date</Label>
                <Form.Control
                  type="datetime-local"
                  defaultValue={stateformEditTrans.datetime}
                  name="datetime"
                  onChange={handleChangeEditTrans}
                ></Form.Control>
              </FormGroup>
              <p
                className="text-sm text-info"
                onClick={() => showAdvanceOption()}
              >
                Advanced Options
                <i
                  className={`fas ${
                    showOption ? "fa-chevron-up" : "fa-chevron-down"
                  } ml-2`}
                ></i>
              </p>
              {showOption && (
                <FormGroup>
                  <Row className="align-items-end">
                    <div className="col-md-8">
                      <Label>TRM</Label>
                      <Form.Control
                        pattern="[0-9]{0,2}"
                        type="number"
                        name="trm"
                        id="trm"
                        step={0.01}
                        required
                        disabled
                        key={
                          stateformEditTrans.monto +
                          stateformEditTrans.editInBadge +
                          stateformEditTrans.badge +
                          stateformEditTrans.trm
                        }
                        defaultValue={stateformEditTrans.trm}
                        onChange={handleChangeEditTrans}
                      ></Form.Control>
                    </div>
                    <div className="col-md-3">
                      <Label>In Badge</Label>
                      <Form.Control
                        as="select"
                        name="editInBadge"
                        defaultValue={stateformEditTrans.editInBadge}
                        onChange={handleChangeEditTrans}
                      >
                        <option>COP</option>
                        <option>USD</option>
                      </Form.Control>
                    </div>
                  </Row>
                </FormGroup>
              )}
              {showOption && (
                <FormGroup>
                  <Label>Custom deposit amount</Label>
                  <Form.Control
                    pattern="[0-9]{0,2}"
                    type="number"
                    name="customDeposit"
                    id="customDeposit"
                    step={0.01}
                    required
                    key={
                      stateformEditTrans.monto +
                      stateformEditTrans.badge +
                      stateformEditTrans.editInBadge
                    }
                    defaultValue={stateformEditTrans.customDeposit}
                    onChange={handleChangeEditTrans}
                  ></Form.Control>
                </FormGroup>
              )}
            </Modal.Body>
            <ModalFooter>
              <Button
                color="danger"
                onClick={(e) =>
                  OpenModalDelete(
                    e,
                    stateformEditTrans.id_data,
                    stateformEditTrans.datetime,
                    "transfer"
                  )
                }
              >
                Delete
              </Button>
              <Button type="submit" id="btn_edit_trans_move" color="success">
                Save Changes
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Container>
    </>
  );
};

export default Movements;
