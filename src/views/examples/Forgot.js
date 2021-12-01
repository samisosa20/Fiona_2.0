import React, { useState } from "react";
import API from "../../variables/API";
import { Link } from "react-router-dom";
import store from "../../redux/store";
import { Provider } from "react-redux";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

function Login(props) {
  const [email, setEmail] = useState(null)

  /* ...state para que no se modifique */
  const handleChange = (event) => {
    setEmail(event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      document.getElementById("mensaje").innerHTML =
        "<div class='alert alert-danger' role='alert'>Please, enter you email.</div>";
    } else {
      API.post("forgot", {
        email: email,
      }).then((res) => {
        if (res.data === 500) {
          document.getElementById("mensaje").innerHTML =
            "<div class='alert alert-danger' role='alert'>The user doesn't exist!</div>";
        } else if (res.data === 400) {
          document.getElementById("mensaje").innerHTML =
            "<div class='alert alert-warning' role='alert'>We have a problem to reset your password, try again.</div>";
        } else if (res.data === 200) {
          window.location = "/auth/login?reset=true";
        }
      });
    }
  };

  return (
    <Provider store={store}>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Type your email to send a new password</small>!
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="user"
                    onChange={handleChange}
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Restore Password
                </Button>
              </div>
              <div id="mensaje"></div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <Link className="text-light" to="/auth/login">
              <small>Sign in</small>
            </Link>
          </Col>
          <Col className="text-right" xs="6">
            <Link className="text-light" to="/auth/register">
              <small>Sign up</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </Provider>
  );
}

export default Login;
