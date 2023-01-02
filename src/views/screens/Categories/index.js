import React from "react";
import { Link } from "react-router-dom";

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

// Controllers
import useControllers from "controllers";

import "assets/styles/components/Catego.scss";

const Catego = () => {
  // Components
  const { Headers, Alert, Modals, ContextMenuCustom } = useComponents();
  const { Header } = Headers();
  const { Modaledit, Modaldelete } = Modals();

  const { useScreenHooks } = useControllers();
  const { useCategories } = useScreenHooks();
  const {
    state,
    setrefreshData,
    refreshData,
    handleContextMenu,
    contextMenu,
    handleClose,
    OpenModalNew,
    stateAlert,
    showNewMod,
    ModNewCateSate,
    handleSubmit,
    handleChange,
    stateformEdit,
    showDelMod,
    setshowDelMod,
    setSateAlert,
    setformEdit,
    showEdiMod,
    setshowEdiMod,
    handleChangeEdit,
  } = useCategories();

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          {state.lvl !== undefined ? (
            <Card className="shadow col-md-5 mr-2 ml-2 mb-3 arrow c-categorie">
              <Link
                to={"/admin/catego"}
                onClick={() => setrefreshData(!refreshData)}
              >
                <CardBody className="card-body">
                  <h3 className="card-title col-md-9 col-lg-9 col-xl-9 text-muted m-0">
                    <i className="fas fa-arrow-left mr-2"></i> Back
                  </h3>
                </CardBody>
              </Link>
            </Card>
          ) : (
            ""
          )}
          {state.jsonCatego.id !== -1000
            ? state.jsonCatego.map((data, index) => (
                <Card
                  className="shadow col-md-5 mr-2 ml-2 mb-3 arrow c-categorie"
                  key={index}
                >
                  <Link
                    to={"/admin/catego#" + data.id}
                    onClick={() => setrefreshData(!refreshData)}
                    onContextMenu={(e) => handleContextMenu(e, data)}
                  >
                    <CardBody className="card-body">
                      <h3 className="card-title col-md-9 col-lg-9 col-xl-9 m-0">
                        {data.categoria}
                      </h3>
                    </CardBody>
                  </Link>
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
            className="shadow col-md-5 mr-2 ml-2 mb-3 arrow c-categorie"
            onClick={(e) => OpenModalNew(e)}
          >
            <CardBody className="card-body">
              <h3 className="card-title col-md-9 col-lg-9 col-xl-9 text-muted m-0">
                <i className="fas fa-plus mr-2"></i>New Category
              </h3>
            </CardBody>
          </Card>
        </Row>
        <div>
          <Alert visible={stateAlert.visible} code={stateAlert.code} />
          <Modal show={showNewMod} id="ModalAdd" onHide={ModNewCateSate}>
            <Modal.Header closeButton>
              <Modal.Title>Creator of category</Modal.Title>
            </Modal.Header>
            <Form role="form" onSubmit={handleSubmit}>
              <Modal.Body>
                <FormGroup>
                  <Label>Name</Label>
                  <Form.Control
                    type="text"
                    name="catego"
                    required
                    onChange={handleChange}
                  ></Form.Control>
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
                  <Label>Group</Label>
                  <Form.Control
                    as="select"
                    name="group"
                    required
                    onChange={handleChange}
                    defaultValue="0"
                  >
                    <option value="0" disabled>
                      Select one option
                    </option>
                    <option value="1">Fixed costs</option>
                    <option value="2">Personal expenses</option>
                    <option value="3">Savings</option>
                    <option value="4">Income</option>
                  </Form.Control>
                </FormGroup>
                <FormGroup>
                  <Label>Include inside other category</Label>
                  <Form.Control
                    as="select"
                    name="include"
                    onChange={handleChange}
                  >
                    <option></option>
                    {state.jsonCatego.id !== -1000
                      ? state.jsonCatego.map((data, index) => (
                          <option key={index} value={data.id}>
                            {data.categoria}
                          </option>
                        ))
                      : ""}
                  </Form.Control>
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button color="danger" onClick={ModNewCateSate}>
                  Close
                </Button>
                <Button type="submit" color="success">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
          <Modaldelete
            action="catego"
            title="Delete category"
            message={
              "Are you sure delete the category " +
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
            title="Edit category"
            refreshData={refreshData}
            setrefreshData={setrefreshData}
            stateformEdit={stateformEdit}
            setformEdit={setformEdit}
            showEdiMod={showEdiMod}
            setshowEdiMod={setshowEdiMod}
            setSateAlert={setSateAlert}
            handle={handleChangeEdit}
            listCategorie={state}
          />
        </div>
      </Container>
    </>
  );
};

export default Catego;
