import React, { useState, useEffect } from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

import 'assets/styles/components/HeaderUser.scss';

const UserHeader = () => {
  /* Declaracion de variables */
  const [state, setState] = useState({ first_name: "", last_name: "" });

  useEffect(() => {
    const Name = localStorage.getItem("Name");
    const LastName = localStorage.getItem("LastName");
    setState({ first_name: Name, last_name: LastName });
  }, []);
  return (
    <>
      <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center">
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">
                {"Hello " + state.first_name}
              </h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can see the progress you've made
                with your work and manage your projects or assigned tasks
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
