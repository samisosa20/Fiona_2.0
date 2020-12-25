import React from "react";

import { Button, Card } from "reactstrap";
const HeaderInfo = (props) => {
  const {
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
    <Modal show={ModViewMovi} id="ModalMovi" onHide={ModViewMoviState}>
      <Modal.Header closeButton>
        <Modal.Title>Activity By Account</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "500px", overflow: "auto" }}>
        {stateViewMovi.data
          ? stateViewMovi.title === 1
            ? stateViewMovi.data.map((data, index) => (
                <Card
                  key={index}
                  onClick={
                    stateViewMovi.lvl === 0
                      ? (e) => OpenViewMovilvl(e, 1, data.nombre)
                      : stateViewMovi.lvl === 1
                      ? (e) => OpenViewMovilvlMonth(e, 1, data.nombre, data.mes)
                      : ""
                  }
                >
                  <h4 className="card-title col-md-12 text-muted mt-2">
                    {stateViewMovi.lvl === 0
                      ? data.nombre
                      : stateViewMovi.lvl === 1
                      ? data.mes + " - " + data.nombre
                      : data.categoria}
                  </h4>
                  <h6 className="card-title ml-3 row col-md-12 text-muted font-weight-bold">
                    <p className="text-success">
                      {stateViewMovi.lvl === 0
                        ? formatter.format(data.ingreso)
                        : formatter.format(data.cantidad)}
                    </p>
                  </h6>
                </Card>
              ))
            : stateViewMovi.data.map((data, index) => (
                <Card
                  key={index}
                  onClick={
                    stateViewMovi.lvl === 0
                      ? (e) => OpenViewMovilvl(e, 2, data.nombre)
                      : stateViewMovi.lvl === 1
                      ? (e) => OpenViewMovilvlMonth(e, 2, data.nombre, data.mes)
                      : ""
                  }
                >
                  <h4 className="card-title col-md-12 text-muted mt-2">
                    {stateViewMovi.lvl === 0
                      ? data.nombre
                      : stateViewMovi.lvl === 1
                      ? data.mes + " - " + data.nombre
                      : data.categoria}
                  </h4>
                  <h6 className="card-title ml-3 row col-md-12 text-muted font-weight-bold">
                    <p className="text-danger">
                      {stateViewMovi.lvl === 0
                        ? formatter.format(data.egreso)
                        : formatter.format(data.cantidad)}
                    </p>
                  </h6>
                </Card>
              ))
          : "Out of moves"}
      </Modal.Body>
      <Modal.Footer>
        {stateViewMovi.lvl === 0 ? (
          <Button color="danger" onClick={ModViewMoviState}>
            Close
          </Button>
        ) : (
          <Button color="primary" onClick={(e) => BackViewMovi(e)}>
            Back
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default HeaderInfo;
