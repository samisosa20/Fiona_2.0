import React from "react";

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

import useComponents from "views/components";

// Controllers
import useControllers from "controllers";

const CreateBudget = () => {
  // Components
  const { Headers, Alert } = useComponents();
  const { Header } = Headers();

  const { useScreenHooks } = useControllers();
  const { useBudgetCreate } = useScreenHooks();
  const {
    handleChange,
    year,
    OpenModalStep1,
    ShowStep1,
    ModStep1,
    stateCatego,
    renderRecursion,
    OpenModalStep2,
    ShowStep2,
    ModStep2,
    handleSubmit,
    stateForm,
    stateAlert,
  } = useBudgetCreate();

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
                {stateCatego.id !== -1000 ? renderRecursion(stateCatego) : ""}
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
};

export default CreateBudget;
