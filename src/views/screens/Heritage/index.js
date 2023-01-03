import React from "react";
import { Link } from "react-router-dom";
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

// Controllers
import useControllers from "controllers";

const Heritage = () => {
  // Components
  const { Headers, Alert } = useComponents();
  const { Header } = Headers();

  const { useScreenHooks } = useControllers();
  const { useHeritages } = useScreenHooks();
  const {
    listHeritage,
    stateAlert,
    showNewMod,
    ModNewHeritageSate,
    handleSubmit,
    handleChange,
    stateform,
  } = useHeritages();

  return (
    <>
      <Header />
      <Container className="mt--7 pb-150" fluid>
        <Row>
          {listHeritage.map((data, index) => (
            <Card
              className="shadow col-md-12 col-lg-5 mr-2 ml-2 mb-3 arrow c-categorie px-0"
              key={index}
            >
              <Link to={`/admin/heritages/${data.year}`}>
                <CardBody className="py-3 rounded px-0">
                  <div className="col-12 mt-1">
                    <h3 className="card-title text-dark m-0">
                      Heritage - {data.year}
                    </h3>
                    <h4 className="card-title text-muted m-0">
                      Legal
                      <span className="float-right">Comercial</span>
                    </h4>
                    <h4 className="card-title text-muted m-0">
                      <NumberFormat
                        className={
                          data.legal_heritage >= 0
                            ? `text-success`
                            : `text-danger`
                        }
                        value={data.legal_heritage ? data.legal_heritage : 0}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                      <span className="text-dark float-right">
                        <NumberFormat
                          className={
                            data.comercial_heritage >= 0
                              ? `text-success`
                              : `text-danger`
                          }
                          value={
                            data.comercial_heritage
                              ? data.comercial_heritage
                              : 0
                          }
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </span>
                    </h4>
                  </div>
                </CardBody>
              </Link>
            </Card>
          ))}

          <Card
            className="shadow col-md-12 col-lg-5 mr-2 ml-2 mb-3 arrow c-categorie px-0"
            onClick={ModNewHeritageSate}
          >
            <CardBody className="rounded px-0">
              <div className="col">
                <h3 className="card-title col-md-9 col-lg-9 col-xl-9 text-muted m-0">
                  <i className="fas fa-plus mr-2"></i>New Heritage
                </h3>
              </div>
            </CardBody>
          </Card>
        </Row>
        <div>
          <Alert visible={stateAlert.visible} code={stateAlert.code} />
          <Modal show={showNewMod} id="ModalAdd" onHide={ModNewHeritageSate}>
            <Modal.Header closeButton>
              <Modal.Title>Creator of heritage</Modal.Title>
            </Modal.Header>
            <Form role="form" onSubmit={handleSubmit}>
              <Modal.Body>
                <FormGroup>
                  <Label>
                    Year<span className="text-danger">*</span>
                  </Label>
                  <Form.Control
                    type="number"
                    name="year"
                    min="1900"
                    max={new Date().getFullYear()}
                    step="1"
                    required
                    onChange={handleChange}
                  ></Form.Control>
                </FormGroup>
                <FormGroup>
                  <Label>
                    Badge<span className="text-danger">*</span>
                  </Label>
                  <Form.Control
                    as="select"
                    name="badge"
                    required
                    onChange={handleChange}
                  >
                    <option>COP</option>
                    <option>USD</option>
                  </Form.Control>
                </FormGroup>
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
        </div>
      </Container>
    </>
  );
};

export default Heritage;
