import React from "react";

// Components
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const AdminFooter = () => {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2022{" "}
              <a
                className="font-weight-bold ml-1"
                href="https://github.com/samisosa20"
                rel="noopener noreferrer"
                target="_blank"
              >
                Sammy Guttman
              </a>
            </div>
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem>
                <NavLink
                  href="https://www.linkedin.com/in/samgutlon/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Sammy Guttman
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  MIT License
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    );
}

export default AdminFooter;
