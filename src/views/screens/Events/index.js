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
} from "reactstrap";
import { Form, Modal } from "react-bootstrap";
import useComponents from "views/components";


import "assets/styles/components/Catego.scss";

// Controllers
import useControllers from "controllers";

const Events = () => {
  // Components
  const { Headers, Alert, Modals, ContextMenuCustom } = useComponents();
  const { Header } = Headers();
  const { Modaldelete, Modaledit } = Modals();

  const { useScreenHooks } = useControllers();
  const { useEvent } = useScreenHooks();
  const { 
    state,
    handleContextMenu,
    openListModal,
    contextMenu,
    handleClose,
    OpenModalNew,
    stateAlert,
    showNewMod,
    handleSubmit,
    handleChange,
    stateformEdit,
    refreshData,
    setrefreshData,
    showDelMod,
    setshowDelMod,
    setSateAlert,
    setformEdit,
    showEdiMod,
    setshowEdiMod,
    handleChangeEdit,
    OpenModalDelete,
    showListMove,
    ModListMove,
    listMove,
    ModNewEventSate,
   } = useEvent();

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
                    onClick={() => openListModal(data.id)}
                  >
                    <div className="col-10 mt-1">
                      <h3 className="card-title col-md-9 col-lg-9 col-xl-9 text-dark m-0">
                        {data.nombre}{" "}
                        {data.activo === "0" && (
                          <span className="text-gray text-sm float-right">
                            inactive
                          </span>
                        )}
                      </h3>
                      <h4 className="card-title col-md-9 col-lg-9 col-xl-9 text-muted m-0">
                        Spent{" "}
                        <span className="text-dark float-right">
                          <NumberFormat
                            className={
                              data.valor >= 0 ? `text-success` : `text-danger`
                            }
                            value={data.valor ? data.valor : 0}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </span>
                      </h4>
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
              <div className="col">
                <h3 className="card-title col-md-9 col-lg-9 col-xl-9 text-muted m-0">
                  <i className="fas fa-plus mr-2"></i>New Event
                </h3>
              </div>
            </CardBody>
          </Card>
        </Row>
        <div>
          <Alert visible={stateAlert.visible} code={stateAlert.code} />
          <Modal show={showNewMod} id="ModalAdd" onHide={ModNewEventSate}>
            <Modal.Header closeButton>
              <Modal.Title>Creator of event</Modal.Title>
            </Modal.Header>
            <Form role="form" onSubmit={handleSubmit}>
              <Modal.Body>
                <FormGroup>
                  <Label>Name</Label>
                  <Form.Control
                    type="text"
                    name="namevent"
                    required
                    onChange={handleChange}
                  ></Form.Control>
                </FormGroup>
                <FormGroup>
                  <Label>Ending date</Label>
                  <Form.Control
                    type="date"
                    name="endingdate"
                    onChange={handleChange}
                  ></Form.Control>
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button color="danger" onClick={ModNewEventSate}>
                  Close
                </Button>
                <Button type="submit" color="success">
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
          <Modaldelete
            action="event"
            title="Delete event"
            message={
              "Are you sure delete the event " +
              stateformEdit.edit_categor +
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
            title="Edit event"
            refreshData={refreshData}
            setrefreshData={setrefreshData}
            stateformEdit={stateformEdit}
            setformEdit={setformEdit}
            showEdiMod={showEdiMod}
            setshowEdiMod={setshowEdiMod}
            setSateAlert={setSateAlert}
            handle={handleChangeEdit}
            OpenModalDelete={OpenModalDelete}
          />
          <Modal show={showListMove} onHide={ModListMove}>
            <Modal.Header closeButton>
              <Modal.Title>movement list</Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-2">
              {listMove.length > 0 ? (
                listMove.map((v, i) => (
                  <Card className="p-3 mb-2" key={i}>
                    <h3>
                      {v.categoria}
                      <span className="float-right">{v.cuenta}</span>
                    </h3>
                    <h4>
                      <NumberFormat
                        value={v.valor}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                      <span className="float-right">{v.fecha}</span>
                    </h4>
                    <h5 className="m-0">Description:</h5>
                    <p>{v.descripcion}</p>
                  </Card>
                ))
              ) : (
                <h3 className="mb-0 text-center">Without Movement</h3>
              )}
            </Modal.Body>
          </Modal>
        </div>
      </Container>
    </>
  );
};

export default Events;
