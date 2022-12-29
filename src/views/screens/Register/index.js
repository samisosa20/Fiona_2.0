import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

// Components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";

// Controllers
import useControllers from "controllers";

// Assets
import iconGithub from "assets/img/icons/common/github.svg"

const Register = () => {
  const { useScreenHooks } = useControllers();
  const { useRegister } = useScreenHooks();
  const { handleChange, handleSubmit, statePass } = useRegister();

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Do you have account?</small>
            </div>
            <div className="text-center">
              <Link to="/auth/login">
                <Button className="btn-neutral btn-icon mr-4" color="default">
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={iconGithub}
                    />
                  </span>
                  <span className="btn-inner--text">Login</span>
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="First Name"
                    onChange={handleChange}
                    name="FirstName"
                    type="text"
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Last Name"
                    onChange={handleChange}
                    name="LastName"
                    type="text"
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-money-coins" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Form.Control
                    as="select"
                    onChange={handleChange}
                    name="Badge"
                    required
                  >
                    <option value="0" disabled selected>
                      Badge default
                    </option>
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
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    onChange={handleChange}
                    name="Email"
                    type="email"
                    autoComplete="new-email"
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    onChange={handleChange}
                    name="Password"
                    type="password"
                    autoComplete="new-password"
                    required
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className={statePass.style + " font-weight-700"}>
                    {statePass.text}
                  </span>
                </small>
              </div>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Sign Up
                </Button>
              </div>
              <div id="mensaje"></div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
