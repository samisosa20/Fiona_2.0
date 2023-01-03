import React from "react";

// Styles
import 'assets/styles/components/Header.scss';

// Components
import HeaderInfo from "../../Modals/HeaderInfo";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";


const ContainsHeader = (props) => {
  const {
    OpenViewMovi,
    state,
    Modal,
    ModViewMovi,
    ModViewMoviState,
    stateViewMovi,
    OpenViewMovilvl,
    OpenViewMovilvlMonth,
    formatter,
    BackViewMovi,
  } = props;

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card
                  className="status card-stats mb-4 mb-xl-0"
                  onClick={(e) => OpenViewMovi(e, 1)}
                >
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Annual Income
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0 text-success">
                          {state.ingresos}
                        </span>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card
                  className="status card-stats mb-4 mb-xl-0"
                  onClick={(e) => OpenViewMovi(e, 2)}
                >
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Annual Expenses
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0 text-danger">
                          {state.egresos}
                        </span>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Annual Savings
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {state.ahorros}
                        </span>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Annual Utility
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {state.utilidad}
                        </span>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
          <HeaderInfo
            Modal={Modal}
            ModViewMovi={ModViewMovi}
            ModViewMoviState={ModViewMoviState}
            stateViewMovi={stateViewMovi}
            OpenViewMovilvl={OpenViewMovilvl}
            OpenViewMovilvlMonth={OpenViewMovilvlMonth}
            formatter={formatter}
            BackViewMovi={BackViewMovi}
          />
        </Container>
      </div>
    </>
  );
};

export default ContainsHeader;
