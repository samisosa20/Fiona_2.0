import React from 'react';
import { Link } from 'react-router-dom';

import { Card, CardBody, CardHeader, Row, Table } from 'reactstrap';

import ContextMenuCustom from 'views/components/ContextMenu';

const AcountAdd = (props) => {
  const [contextMenu, setContextMenu] = React.useState(null);
  const {
    state,
    OpenModalNew,
    OpenModalEdit,
    OpenModalDelete,
    OpenModalShare,
  } = props;

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
    <div class="d-flex bg-white p-4 rounded position-relative">
      <Table striped>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Balance</th>
            <th>Tipo</th>
            <th>Moneda</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {state.map((account, i) => (
            <tr key={account.name + i}>
              <td>{account.name}</td>
              <td className={`font-weight-600 ${account.init_amount + account.balance < 0 ? "text-danger" : "text-success"}`}>{account.init_amount + account.balance}</td>
              <td>{account.type}</td>
              <td>{account.currency.code}</td>
              <td>
                <div onClick={(event) => OpenModalEdit(
                event,
                account
              )}>
                  <i className="fas fa-pencil-alt cursor-pointer text-blue"></i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* <Row className="justify-content-around">
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
                        <h3 className="mb-0">{data.name}</h3>
                      </div>
                        <div className={`col justify-content-end  ${data.init_amount + data.balance < 0 ? "text-danger" : "text-success"}`}>
                          {data.init_amount + data.balance}
                        </div>
                    </Row>
                    <Row>
                      <div className="col p-0 text-dark">
                        Badge: {data.currency.code}
                      </div>
                      <div className="col p-0 text-muted">
                        {data.type}
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
      </Row> */}
    </div>
  );
};

export default AcountAdd;
