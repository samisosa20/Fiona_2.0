import React, {useState}  from "react";

// reactstrap components
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
  Col
} from "reactstrap";
import API from '../../variables/API';
import { Form, option } from 'react-bootstrap';
import AdminLayout from "layouts/Admin.js";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom"; 
function Register(props){
   // envio de informacion
   const [stateform, setform] = useState({
    FirstName: "",
    LastName: "",
    Badge: "",
    Email: "",
    Password: ""
  })
  const [statePass, setPass] = useState({style: "", text: ""})
  /* ...state para que no se modifique */
  const handleChange = (event) => {
    setform({ ...stateform, [event.target.name]: event.target.value })
    if (event.target.name === "Password")
    {
      event.target.value.length < 6 ? setPass({style: "text-danger", text: "easy"}) : event.target.value.length >= 6 && 
      event.target.value.length < 8 ? setPass({style: "text-warning", text: "medium"}) 
      : setPass({style: "text-success", text: "strong"})
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(state + " - " + state.password);
    if (stateform.Email === "" || stateform.Password === "" || stateform.Badge === ""
              || stateform.FirstName === "" || stateform.LastName === "" || stateform.Password.length < 6){
      stateform.Password.length < 6 ?
        document.getElementById("mensaje").innerHTML = "<div class='alert alert-warning' role='alert'>" +
                  "the password must be longer than 6 characters</div>"
      :
        document.getElementById("mensaje").innerHTML = "<div class='alert alert-danger' role='alert'>" +
                  "fill all the fields</div>"
    } else{
      API.post('Register', {
        FirstName: stateform.FirstName,
        LastName: stateform.LastName,
        Badge: stateform.Badge,
        Email: stateform.Email,
        Password: stateform.Password})
      .then(res => {
        //console.log(res.data);
        if (res.data.data === 400){
          document.getElementById("mensaje").innerHTML = "<div class='alert alert-danger' role='alert'>" +
                  "Could not create user!</div>";
        } else if (res.data.data === 200){
          localStorage.setItem("Name", stateform.FirstName);
          localStorage.setItem("LastName", stateform.LastName);
          localStorage.setItem("Email", stateform.Email);
          localStorage.setItem("IdUser", res.data.idUser);
          localStorage.setItem("Divisa", stateform.Badge);
          ReactDOM.render(
            <BrowserRouter>
              <Switch>
                <Route path="/admin" render={props => <AdminLayout {...props} />} />
                <Redirect from="/" to="/admin/Dash" />
              </Switch>
            </BrowserRouter>,
            document.getElementById("root")
          );
        }
      })
    }
  }
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Do you have account?</small>
              </div>
              <div className="text-center">
                <Link
                to="/auth/login">
                  <Button
                    className="btn-neutral btn-icon mr-4"
                    color="default"
                  >
                    <span className="btn-inner--icon">
                      <img
                        alt="..."
                        src={require("assets/img/icons/common/github.svg")}
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
                    <Input placeholder="First Name" onChange={handleChange} name="FirstName" type="text" required/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Last Name" onChange={handleChange} name="LastName" type="text" required/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-money-coins" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Form.Control as="select" onChange={handleChange} name="Badge"  required>
                      <option value="0" disabled selected>Badge default</option>
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
                    <Input placeholder="Email" onChange={handleChange} name="Email" type="email" autoComplete="new-email" required/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" onChange={handleChange} name="Password" type="password" autoComplete="new-password" required/>
                  </InputGroup>
                </FormGroup>
                <div className="text-muted font-italic">
                  <small>
                    password strength:{" "}
                    <span className={statePass.style + " font-weight-700"}>{statePass.text}</span>
                  </small>
                </div>
                {/*<Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>*/}
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
}

export default Register;
