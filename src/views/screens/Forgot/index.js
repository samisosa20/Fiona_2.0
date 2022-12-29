import React from "react";
import { Link } from "react-router-dom";
import { Provider } from "react-redux";

// Components
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

// Controllers
import useControllers from "controllers";

const Forgot = () => {
  const { useScreenHooks } = useControllers();
  const { useForgot } = useScreenHooks();
  const { handleChange,
    handleSubmit,
    store, } = useForgot();

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

export default Forgot;
