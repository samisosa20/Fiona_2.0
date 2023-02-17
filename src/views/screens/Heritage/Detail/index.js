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
import { Form, Modal } from "react-bootstrap";
import useComponents from "views/components";

// Controllers
import useControllers from "controllers";

const DetailHeritage = () => {
  // Components
  const { Headers, Alert, Modals } = useComponents();
  const { Header } = Headers();
  const { Modaldelete } = Modals();

  const { useScreenHooks } = useControllers();
  const { useHeritagesDetail } = useScreenHooks();
  const {
    listHeritage,
    stateAlert,
    showNewMod,
    ModNewHeritageSate,
    handleSubmit,
    handleChange,
    stateform,
    handleChangeYear,
    ModDelHeritageSate,
    listHeritageDetail,
    year,
    dollarString,
    showDelMod,
    setshowDelMod,
    setSateAlert,
    showEdiMod,
    ModEdiHeritageSate,
    handleSubmitEdit,
    stateformEdit,
    handleChangeEdit,
    handleEditHeritage,
    refreshData,
    setrefreshData,
  } = useHeritagesDetail();

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7 pb-150" fluid>
        {/* Table */}
        <Row className="mb-2">
          <div className="col">
            <Form.Control
              as="select"
              name="account"
              onChange={handleChangeYear}
              value={year}
            >
              {listHeritage.map((v, i) => (
                <option key={i} value={v.year}>
                  {v.year}
                </option>
              ))}
            </Form.Control>
          </div>
          <div className="col justify-content-end row">
            <Button
              className="mr-3 mb-3 btn-success"
              onClick={ModNewHeritageSate}
            >
              <i className="fas fa-plus mr-2"></i>
              Create
            </Button>
          </div>
        </Row>
        <Card className="shadow col-md-12 mb-3">
          <CardHeader className="border-0 pt-3 px-2">
            <div className="d-md-flex">
              <div className="col p-0">
                <h3 className="mb-0 text-bold">
                  Legal:
                  <span className="font-weight-normal ml-1">
                    {dollarString.format(
                      listHeritage?.find((v) => v.year === year)?.legal_heritage
                    )}
                  </span>
                </h3>
              </div>
              <div className="col justify-content-end my-2 my-md-0 p-0">
                <h3 className="mb-0">
                  Comercial:
                  <span className="font-weight-normal ml-1">
                    {dollarString.format(
                      listHeritage?.find((v) => v.year === year)
                        ?.comercial_heritage
                    )}
                  </span>
                </h3>
              </div>
              <div className="col justify-content-end my-2 my-md-0 p-0">
                <h3 className="mb-0">
                  Cash:
                  <span className="font-weight-normal ml-1">
                    {dollarString.format(
                      listHeritage?.find((v) => v.year === year)
                        ?.value_move
                    )}
                  </span>
                </h3>
              </div>
            </div>
          </CardHeader>
        </Card>
        <ListGroup
          className="shadow col-md-12 mb-3 p-0"
          style={{ maxHeight: "500px", overflow: "auto" }}
        >
          {listHeritageDetail.length > 0 ? (
            listHeritageDetail.map((data, index) => (
              <ListGroupItem
                className="cursor-pointer"
                key={index}
                onClick={() => handleEditHeritage(data)}
              >
                <Row>
                  <div className="col">
                    <h3 className="mb-0">{data.element}</h3>
                  </div>
                  <div className="col justify-content-end">{data.badge}</div>
                </Row>
                <Row>
                  <div className="col">
                    <h3 className="mb-0">Legal</h3>
                  </div>
                  <div className="col">
                    <h3 className="mb-0">Comercial</h3>
                  </div>
                </Row>
                <Row>
                  <div className="col">
                    <h3 className={`mb-0 ${data.legal_value < 0 ? 'text-danger' : 'text-success'}`}>
                        {dollarString.format(data.legal_value)}
                      </h3>
                  </div>
                  <div className="col">
                      <h3 className={`mb-0 ${data.comercial_value < 0 ? 'text-danger' : 'text-success'}`}>
                        {dollarString.format(data.comercial_value)}
                      </h3>
                  </div>
                </Row>
              </ListGroupItem>
            ))
          ) : (
            <ListGroupItem>
              <Row>
                <div className="col">
                  <h3 className="mb-0 text-center">Without Heritages</h3>
                </div>
              </Row>
            </ListGroupItem>
          )}
        </ListGroup>
        <Alert visible={stateAlert.visible} code={stateAlert.code} />
        <Modal show={showNewMod} id="ModalAdd" onHide={ModNewHeritageSate}>
          <Modal.Header closeButton>
            <Modal.Title>Creator of heritage</Modal.Title>
          </Modal.Header>
          <Form role="form" onSubmit={handleSubmit}>
            <Modal.Body>
              <FormGroup>
                <Label>
                  Name of element<span className="text-danger">*</span>
                </Label>
                <Form.Control
                  type="text"
                  name="element"
                  required
                  onChange={handleChange}
                ></Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>
                  Legal value<span className="text-danger">*</span>
                </Label>
                <Form.Control
                  type="number"
                  name="legal_value"
                  step="0.01"
                  required
                  onChange={handleChange}
                ></Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>
                  Comercial value<span className="text-danger">*</span>
                </Label>
                <Form.Control
                  type="number"
                  name="comercial_value"
                  min={stateform.legal_value}
                  value={stateform.comercial_value}
                  step="0.01"
                  required
                  onChange={handleChange}
                ></Form.Control>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button color="danger" onClick={ModNewHeritageSate}>
                Close
              </Button>
              <Button type="submit" color="success">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Modal show={showEdiMod} id="ModalEdit" onHide={ModEdiHeritageSate}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Heritage</Modal.Title>
          </Modal.Header>
          <Form role="form" onSubmit={handleSubmitEdit}>
            <Modal.Body>
              <FormGroup>
                <Label>
                  Name of element<span className="text-danger">*</span>
                </Label>
                <Form.Control
                  type="text"
                  name="element"
                  required
                  defaultValue={stateformEdit.element}
                  onChange={handleChangeEdit}
                ></Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>
                  Legal value<span className="text-danger">*</span>
                </Label>
                <Form.Control
                  type="number"
                  name="legal_value"
                  defaultValue={stateformEdit.legal_value}
                  step="0.01"
                  required
                  onChange={handleChangeEdit}
                ></Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>
                  Comercial value<span className="text-danger">*</span>
                </Label>
                <Form.Control
                  type="number"
                  name="comercial_value"
                  min={stateformEdit.legal_value}
                  value={stateformEdit.comercial_value}
                  step="0.01"
                  required
                  onChange={handleChangeEdit}
                ></Form.Control>
              </FormGroup>
            </Modal.Body>
            <ModalFooter>
              <Button color="danger" onClick={ModDelHeritageSate}>
                Delete
              </Button>
              <Button type="submit" color="success">
                Save Changes
              </Button>
            </ModalFooter>
          </Form>
        </Modal>

        <Modaldelete
          action="heritage"
          title="Delete heritage"
          message="Are you sure to delete the heritage? all data will be delete"
          state={stateformEdit}
          showDelMod={showDelMod}
          setshowDelMod={setshowDelMod}
          setSateAlert={setSateAlert}
          refreshData={refreshData}
          setrefreshData={setrefreshData}
          extraModal={ModEdiHeritageSate}
        />
      </Container>
    </>
  );
};

export default DetailHeritage;
