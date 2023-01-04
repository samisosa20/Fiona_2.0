import React from "react";
import { Link } from "react-router-dom";

import { Card, CardBody, CardHeader, Row } from "reactstrap";

import ContextMenuCustom from "views/components/ContextMenu";

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
  const handleContextMenu = (event, data) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            onClickEdit: (event) => {
              OpenModalEdit(
                event,
                data.id,
                data.nombre,
                data.descripcion,
                data.divisa,
                data.monto_inicial,
                data.cuenta_ahorro,
                data.show
              );
            },
            onClickDelete: (e) => {
              OpenModalDelete(e, data.id, data.nombre);
            },
            onClickShare: (e) => OpenModalShare(e, data.id, data.nombre),
          }
        : null
    );
  };
  const handleClose = () => {
    setContextMenu(null);
  };
  return (
    <>
      <Row className="justify-content-around">
        {state
          ? state.map((data, index) => (
              <Card
                className="col-12 px-2 col-md-6 mb-3 cursor-pointer hover:shadow flex-row align-items-center"
                key={index}
              >
                <CardHeader
                  className="border-0 rounded col-10"
                  onContextMenu={(e) => handleContextMenu(e, data)}
                >
                  <Link
                    to={"/admin/move/" + data.id}
                    className=" text-decoration-none"
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
                  </Link>
                </CardHeader>
                <div
                  onClick={(e) => handleContextMenu(e, data)}
                  className="col-2 text-center"
                >
                  <i className="fa fa-ellipsis-v"></i>
                </div>
              </Card>
            ))
          : ""}
        <ContextMenuCustom
          contextMenu={contextMenu}
          handleClose={handleClose}
        />
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
