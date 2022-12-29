import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

// Components
import useComponents from "views/components";

// Controllers
import useControllers from "controllers";

const PublicContentLayout = () => {

  // Controllers
  const { useLayoutHooks } = useControllers();
  const { useLayoutPublic } = useLayoutHooks();
  const { getRoutes } = useLayoutPublic();

  // Components
  const {Footers} = useComponents()
  const {AuthFooter} = Footers()

  return (
    <>
      <div className="main-content">
        <div className="header bg-gradient-info py-6 py-lg-6">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Welcome to Fiona APP!</h1>
                  <p className="text-lead text-light">
                    Use these awesome forms to login or create new account in
                    your project for free.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <Container className="mt--9 pb-8">
          <Row className="justify-content-center">
            <Switch>
              {getRoutes()}
              <Redirect from="*" to="/auth/login" />
            </Switch>
          </Row>
        </Container>
      </div>
      <AuthFooter />
    </>
  );
};

export default PublicContentLayout;
