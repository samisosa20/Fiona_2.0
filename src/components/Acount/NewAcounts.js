import React from "react";
import { ContextMenuTrigger } from "react-contextmenu";
import { Link } from "react-router-dom";

import { Card, CardBody, CardHeader, Button, Row } from "reactstrap";

import ContextMenuCustom from "../ContextMenu";

const AcountAdd = (props) => {
  const {
    state,
    OpenModalNew,
    OpenModalEdit,
    OpenModalDelete,
    OpenModalShare,
  } = props;
  const idc = localStorage.getItem("IdUser");
  return (
    <>
      <Row className="col-12 justify-content-between p-0 m-0">
        {state
          ? state.map((data, index) => (
              <Link
                to={"/admin/move?acount=" + data.id + "&naco=" + data.nombre}
                className="col-md-6 mb-3 text-decoration-none"
              >
                <Card
                  className="col-12 cursor-pointer hover:shadow"
                  key={index}
                >
                  <ContextMenuTrigger id={`context-account-${index}`}>
                    <CardHeader className="border-0">
                      <Row>
                        <div className="col p-0">
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
                        <div className="col p-0 text-dark">Badge: {data.divisa}</div>
                        <div className="col p-0 text-muted">
                          {data.cuenta_ahorro === "1"
                            ? "Saving Acount"
                            : data.propietario &&
                              data.propietario !== idc && (
                                <div className="text-danger">
                                  Shared Account
                                </div>
                              )}
                        </div>
                      </Row>
                    </CardHeader>
                  </ContextMenuTrigger>
                  <ContextMenuCustom
                    idContext={`context-account-${index}`}
                    onClickShare={(e) =>
                      OpenModalShare(e, data.id, data.nombre)
                    }
                    onClickEdit={(e) =>
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
                    onClickDelete={(e) =>
                      OpenModalDelete(e, data.id, data.nombre)
                    }
                  />
                </Card>
              </Link>
            ))
          : ""}
        <Card className="shadow col-md-6 mb-3" onClick={(e) => OpenModalNew(e)}>
          <CardBody style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <Row>
              <div className="col-10">
                <h3 className="card-title col-md-11 col-lg-11 col-xl-11 text-muted pt-3">
                  <i className="fas fa-plus mr-2"></i>New Account
                </h3>
              </div>
              <div className="col-2">
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
