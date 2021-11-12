import React, {useState, useEffect} from "react";
import API from '../../variables/API';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import { Form } from 'react-bootstrap';
// core components
import UserHeader from "components/Headers/UserHeader.js";

// Assets
import iconProfile from "../../assets/img/profile/newuser.jpg"

function Profile() {
  /* Declaracion de variables */
  const [state, setState] = useState({first_name: "", last_name: "", email: "", divisa: "", password: ""});

  useEffect(() =>{
    
    let Email = localStorage.getItem("Email");
    let Name = localStorage.getItem("Name");
    let LastName = localStorage.getItem("LastName");
    let Divisa = localStorage.getItem("Divisa");
    document.getElementById("SaveProfile").disabled=true;
    setState({first_name: Name, last_name: LastName, email: Email, divisa: Divisa, password: ""})
  }, [])
  /* ...state para que no se modifique */
  const ChangeDataProfile = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
    document.getElementById("SaveProfile").disabled=false
  }

  const SaveChange = (event) => {
    event.preventDefault();
      document.getElementById("SaveProfile").disabled=true
      document.getElementById("SaveProfile").innerHTML="<span className='spinner-border spinner-border-sm mr-1'"+
      "role='status' aria-hidden='true'></span>Loading..."
      let idc = localStorage.getItem("IdUser")
      API.post('edit_data',{
        id: 5,
        idu: idc,
        FirstName: state.first_name,
        LastName: state.last_name,
        Divi: state.divisa,
        Password: state.password,
      })
      .then(response => {
          //console.log(response.data)
          document.getElementById("SaveProfile").innerHTML="Save"
          if (response.data === "200"){
            localStorage.setItem("Name", state.first_name);
            localStorage.setItem("LastName", state.last_name);
            localStorage.setItem("Divisa", state.divisa);
          }
          document.getElementById("pass_2").value = ""
          document.getElementById("pass_1").value = ""
          document.getElementById("pass_2").className = "form-control-alternative form-control"
          document.getElementById("pass_1").className = "form-control-alternative form-control"
      });
  }
  const val_pass_1 = (event) => {
		let pass = document.getElementById("pass_1").value
		if (pass.length < 6) {
			document.getElementById("pass_1").className = "form-control is-invalid"
		} else {
			document.getElementById("pass_1").className = "form-control is-valid"
		}
	}

	const val_pass_2 = (event) => {
		let pass2 = document.getElementById("pass_2").value
		let pass1 = document.getElementById("pass_1").value
		if (pass1 !== pass2) {
			document.getElementById("pass_2").className = "form-control is-invalid"
		} else {
      document.getElementById("pass_2").className = "form-control is-valid"
      setState({ ...state, password: pass2 })
      document.getElementById("SaveProfile").disabled=false
		}
	}
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo">
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={iconProfile}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      size="sm"
                    >
                      change
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        id="SaveProfile"
                        size="sm"
                        onClick={SaveChange}
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                    <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="Name"
                            >
                              First name
                            </label>
                            <Form.Control
                              type="text"
                              className="form-control-alternative"
                              onChange={ChangeDataProfile}
                              defaultValue={state.first_name}
                              name="first_name"
                              id="Name"
                              placeholder="First name"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="last_name"
                            >
                              Last name
                            </label>
                            <Form.Control
                              className="form-control-alternative"
                              defaultValue={state.last_name}
                              onChange={ChangeDataProfile}
                              id="last_name"
                              name="last_name"
                              placeholder="Last name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="divisa"
                            >
                              Badge
                            </label>
                            <Form.Control as="select" 
                              className="form-control-alternative"
                             defaultValue={state.divisa}
                             onChange={ChangeDataProfile}
                             id="divisa"
                             name="divisa">
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
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="email"
                            >
                              Email address
                            </label>
                            <Form.Control
                              className="form-control-alternative"
                              id="email"
                              name="email"
                              placeholder="jesse@example.com"
                              type="email"
                              readOnly
                              defaultValue={state.email}
                              onChange={ChangeDataProfile}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Change Password
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="pass_1"
                            >
                              New Password
                            </label>
                            <Form.Control
                              className="form-control-alternative"
                              id="pass_1"
                              onChange={val_pass_1}
                              placeholder="Password"
                              type="password"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="pass_2"
                            >
                              Confirm Password
                            </label>
                            <Form.Control
                              className="form-control-alternative"
                              id="pass_2"
                              onChange={val_pass_2}
                              placeholder="Password"
                              type="password"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
}

export default Profile;
