import React, { useState } from "react";
import API from "../../variables/API";
import { Redirect, Link } from "react-router-dom"; // para navegar entre paginas
import store from "../../redux/store";
import { return_user } from "../../redux/actions/Login";
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
  const [key, setKey] = useState(false);

  /* ...state para que no se modifique */
  const handleChange = (event) => {
    //setState({ ...state, [event.target.name]: event.target.value });

    store.dispatch(return_user(event.target.name, event.target.value));
  };

  const handleSubmit = (event) => {
    /*console.log(
      store.getState().login_reducer.user + " = " + store.getState().password
    );*/
    event.preventDefault();
    if (
      store.getState().login_reducer.password === "" ||
      store.getState().login_reducer.user === ""
    ) {
      document.getElementById("mensaje").innerHTML =
        "<div class='alert alert-danger' role='alert'>" +
        "Enter username and password</div>";
    } else {
      API.post("validar", {
        user: store.getState().login_reducer.user,
        passwd: store.getState().login_reducer.password,
      }).then((res) => {
        //console.log(res.data);
        if (res.data.data === 400) {
          document.getElementById("mensaje").innerHTML =
            "<div class='alert alert-danger' role='alert'>" +
            "User does not exist!</div>";
        } else if (res.data.data === 450) {
          document.getElementById("mensaje").innerHTML =
            "<div class='alert alert-danger' role='alert'>" +
            "Incorrect user or password!</div>";
        } else if (res.data.data === 200) {
          sessionStorage.setItem("Name", res.data.name);
          sessionStorage.setItem("LastName", res.data.lastname);
          sessionStorage.setItem("Email", res.data.email);
          sessionStorage.setItem("IdUser", res.data.idUser);
          sessionStorage.setItem("Divisa", res.data.divisa);
          //window.location = "/admin/Acount";
          setKey(true);
        }
      });
    }
  };

  const Login_success = () => {
    if (key) {
      return <Redirect to="/admin/Acount" />;
    }
  };
  return (
    <Provider store={store}>
      {Login_success()}
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
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
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
              <div id="mensaje"></div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <Link className="text-light" to="/auth/register">
              <small>Forgot password?</small>
            </Link>
          </Col>
          <Col className="text-right" xs="6">
            <Link className="text-light" to="/auth/register">
              <small>Create new account</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </Provider>
  );
}

export default Login;
