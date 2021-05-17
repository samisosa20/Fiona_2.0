import React from "react";

import { Card, CardBody, CardHeader, Button, Row } from "reactstrap";
import { Link } from "react-router-dom";

const AcountAdd = props => {
  const {
    state,
    OpenModalNew,
    OpenModalEdit,
    OpenModalDelete,
    OpenModalShare
  } = props;
  const idc = sessionStorage.getItem("IdUser");
  return (
    <>
      <Row>
        {state
          ? state.map((data, index) => (
              <Card className="shadow col-md-5 mr-2 ml-2 mb-3" key={index}>
                <CardHeader className="border-0">
                  <Row>
                    <div className="col">
                      <h3 className="mb-0">{data.nombre}</h3>
                    </div>
                    {data.cantidad_int < 0 ? (
                      <div className="col justify-content-end text-danger">
                        $ {data.cantidad}
                      </div>
                    ) : (
                      <div className="col justify-content-end text-success">
                        $ {data.cantidad}
                      </div>
                    )}
                  </Row>
                  <Row>
                    <div className="col">Badge: {data.divisa}</div>
                    <div className="col">
                      {data.cuenta_ahorro === "1"
                        ? "Saving Acount"
                        : data.propietario &&
                          data.propietario !== idc && (
                            <div className="text-danger">Shared Account</div>
                          )}
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className="mt--4">
                  <Row className="col m-0 justify-content-md-start justify-content-around">
                    <Link
                      to={
                        "/admin/move?acount=" + data.id + "&naco=" + data.nombre
                      }
                    >
                      <Button
                        className="shadow btn-circle mr-md-2"
                        color="success"
                        size="sm"
                        title="come in"
                      >
                        <i className="fas fa-sign-in-alt"></i>
                      </Button>
                    </Link>
                    {data.propietario === idc || data.propietario === null ? (
                      <Button
                        className="shadow btn-circle"
                        color="info"
                        size="sm"
                        title="edit"
                        onClick={e =>
                          OpenModalEdit(
                            e,
                            data.id,
                            data.nombre,
                            data.descripcion,
                            data.divisa,
                            data.monto_inicial,
                            data.cuenta_ahorro
                          )
                        }
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </Button>
                    ) : (
                      ""
                    )}
                    {data.propietario === idc || data.propietario === null ? (
                      <Button
                        className="shadow btn-circle"
                        color="danger"
                        size="sm"
                        title="Delete"
                        onClick={e => OpenModalDelete(e, data.id, data.nombre)}
                      >
                        <i className="far fa-trash-alt white"></i>
                      </Button>
                    ) : (
                      ""
                    )}
                    {data.propietario === idc || data.propietario === null ? (
                      <Button
                        className="shadow btn-circle"
                        color="warning"
                        size="sm"
                        title="Share"
                        onClick={e => OpenModalShare(e, data.id, data.nombre)}
                      >
                        <i className="fas fa-share"></i>
                      </Button>
                    ) : (
                      ""
                    )}
                  </Row>
                </CardBody>
              </Card>
            ))
          : ""}
        <Card
          className="shadow col-md-5 mr-2 ml-2 mb-3"
          onClick={e => OpenModalNew(e)}
        >
          <CardBody style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <Row>
              <div className="col" style={{ marginTop: 20 }}>
                <h3 className="card-title col-md-11 col-lg-11 col-xl-11 text-muted pt-3">
                  <i className="fas fa-plus mr-2"></i>New Account
                </h3>
              </div>
              <div className="col pt-3">
                <i className="fas fa-chevron-right float-right mt-3 ml-2 fa-2x"></i>
              </div>
            </Row>
          </CardBody>
        </Card>
      </Row>
    </>
  );
};

export default AcountAdd;
