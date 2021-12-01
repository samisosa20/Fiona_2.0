import React from "react";
import { Link } from "react-router-dom";

import { Card, CardBody, CardHeader, Button, Row } from "reactstrap";

import ContextMenuCustom from "../ContextMenu";

const AcountAdd = (props) => {
  const [contextMenu, setContextMenu] = React.useState(null);
  const {
    state,
    OpenModalNew,
    OpenModalEdit,
    OpenModalDelete,
    OpenModalShare,
  } = props;
  const idc = localStorage.getItem("IdUser");
  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null
    );
  };
  const handleClose = () => {
    setContextMenu(null);
  };
  return (
    <>
      <Row className="col-12 justify-content-between p-0 m-0">
        {state
          ? state.map((data, index) => (
              <Card
                className="col-12 px-2 col-md-6 mb-3 cursor-pointer hover:shadow"
                key={index}
              >
                <Link
                  to={"/admin/move?acount=" + data.id + "&naco=" + data.nombre}
                  className=" text-decoration-none"
                >
                  <CardHeader
                    className="border-0 rounded"
                    onContextMenu={handleContextMenu}
                  >
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
                      <div className="col p-0 text-dark">
                        Badge: {data.divisa}
                      </div>
                      <div className="col p-0 text-muted">
                        {data.cuenta_ahorro === "1"
                          ? "Saving Acount"
                          : data.propietario &&
                            data.propietario !== idc && (
                              <div className="text-danger">Shared Account</div>
                            )}
                      </div>
                    </Row>
                  </CardHeader>
                </Link>
                <div
                  onClick={handleContextMenu}
                  className="position-absolute right-4 top-4"
                >
                  <i className="fa fa-ellipsis-v"></i>
                </div>

                <ContextMenuCustom
                  contextMenu={contextMenu}
                  handleClose={handleClose}
                  onClickShare={(e) => OpenModalShare(e, data.id, data.nombre)}
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
            ))
          : ""}
        <Card
          className="col-12 px-2 col-md-6 mb-3 cursor-pointer hover:shadow"
          onClick={(e) => OpenModalNew(e)}
        >
          <CardBody>
            <h3 className="card-title col-md-11 col-lg-11 col-xl-11 text-muted m-0">
              <i className="fas fa-plus mr-2"></i>New Account
            </h3>
          </CardBody>
        </Card>
      </Row>
    </>
  );
};

export default AcountAdd;
