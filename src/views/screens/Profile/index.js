import React from "react";

// Components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Form } from "react-bootstrap";

// Assets
import iconProfile from "assets/img/profile/newuser.jpg";

import useComponents from "views/components";

// Controllers
import useControllers from "controllers";

const Profile = () => {
  // Components
  const { Headers } = useComponents();
  const { HeaderProfile } = Headers();

  const { useScreenHooks } = useControllers();
  const { useProfile } = useScreenHooks();
  const { SaveChange, ChangeDataProfile, state, val_pass_1, val_pass_2 } =
    useProfile();

  return (
    <>
      <HeaderProfile />
      {/* Page content */}
      <Container className="mt--7 pb-150" fluid>
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
                  <Button className="mr-4" color="info" href="#pablo" size="sm">
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
                        <label className="form-control-label" htmlFor="Name">
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
                        <label className="form-control-label" htmlFor="divisa">
                          Badge
                        </label>
                        <Form.Control
                          as="select"
                          className="form-control-alternative"
                          defaultValue={state.divisa}
                          onChange={ChangeDataProfile}
                          id="divisa"
                          name="divisa"
                        >
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
                        <label className="form-control-label" htmlFor="email">
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
                        <label className="form-control-label" htmlFor="pass_1">
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
                        <label className="form-control-label" htmlFor="pass_2">
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
};

export default Profile;
