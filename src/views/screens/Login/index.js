import React from "react";
import { Link } from "react-router-dom";

// Components
import {
  Button,
  Card,
  CardBody,
  Form,
  Row,
  Col,
} from "reactstrap";

// Controllers
import useControllers from "controllers";

// Components
import useComponents from "views/components";

const Login = () => {
  const { useScreenHooks } = useControllers();
  const { useLogin } = useScreenHooks();
  const { onSubmit, handleSubmit, control, errors } = useLogin();

  const { InputControl } = useComponents();

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
            </div>
            <Form role="form" onSubmit={handleSubmit(onSubmit)}>
              <InputControl
                control={control}
                errors={errors}
                name="email"
                type="email"
                placeholder="Correo electronico"
                icon="ni-email-83"
              />
              <InputControl
                control={control}
                errors={errors}
                name="password"
                placeholder="Contraseña"
                type="password"
                icon="ni-lock-circle-open"
              />

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
                  Inicio sesion
                </Button>
              </div>
              <div id="mensaje"></div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <Link className="text-light" to="/auth/forgot">
              <small>Olvidaste tu contraseña?</small>
            </Link>
          </Col>
          <Col className="text-right" xs="6">
            <Link className="text-light" to="/auth/register">
              <small>Registrate</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
