import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Button, Row, Container } from "reactstrap";
import { Modal } from "react-bootstrap";
// core components
import Header from "views/components/Headers/Default";
import API from "variables/API";
import { Link } from "react-router-dom";
import ContextMenuCustom from "../components/ContextMenu";
import Alert from "../components/Alert";

function Budget() {
  const [contextMenu, setContextMenu] = useState(null);
  const [yearPaste, setYearPaste] = useState(null);
  const [state, setState] = useState([]);
  const [stateDelete, setStateDelete] = useState([]);
  const [showDelMod, setDelMod] = useState(false);
  const [showCopyMod, setCopyMod] = useState(false);
  const [refreshData, setrefreshData] = useState(false);
  const [stateAlert, setSateAlert] = useState({ visible: false, code: 200 });
  let year = new Date().getFullYear();

  useEffect(() => {
    var idc = localStorage.getItem("IdUser");
    API.post("acount", {
      id: 9,
      idc: idc,
    }).then((response) => setState(response.data));
  }, [refreshData]);

  // Funcion para cambiar de estado de los modals
  const ModDelCateSate = () => setDelMod(!showDelMod);
  const ModCopyBudgetSate = () => setCopyMod(!showCopyMod);

  const OpenModalDelete = (e, id, year) => {
    e.preventDefault();
    setStateDelete({
      year: year,
      id_data: id,
    });
    ModDelCateSate();
  };
  const OpenModalCopy = (e, id, year) => {
    e.preventDefault();
    setStateDelete({
      year: year,
      id_data: id,
    });
    ModCopyBudgetSate();
  };

  // Eliminar data
  const handleDelete = (e, year) => {
    e.preventDefault();
    let idc = localStorage.getItem("IdUser");
    document.getElementById("btn_delete_budget_year").disabled = true;
    document.getElementById("btn_delete_budget_year").innerHTML =
      "<span class='spinner-border spinner-border-sm mr-1'" +
      "role='status' aria-hidden='true'></span>Loading...";
    API.post("delete_data", {
      id: 4,
      idu: idc,
      year: year,
    }).then((response) => {
      document.getElementById("btn_delete_budget_year").disabled = false;
      document.getElementById("btn_delete_budget_year").innerHTML = "Delete";
      setSateAlert({ visible: true, code: response.data });
      setTimeout(() => {
        setSateAlert({ visible: false, code: 0 });
      }, 2000);
      ModDelCateSate();
      setrefreshData(!refreshData);
    });
  };

  const handleCopy = (e) => {
    e.preventDefault();
    document.getElementById("btn_copy_budget_year").disabled = true;
    document.getElementById("btn_copy_budget_year").innerHTML =
      "<span class='spinner-border spinner-border-sm mr-1'" +
      "role='status' aria-hidden='true'></span>Loading...";
    API.post("add_data", {
      id: 8,
      idu: localStorage.getItem("IdUser"),
      yearCopy: stateDelete.year,
      yearPaste: yearPaste,
    }).then((response) => {
      document.getElementById("btn_copy_budget_year").disabled = false;
      document.getElementById("btn_copy_budget_year").innerHTML = "Confirm";
      setSateAlert({ visible: true, code: response.data });
      setTimeout(() => {
        setSateAlert({ visible: false, code: 0 });
      }, 2000);
      ModCopyBudgetSate();
      setrefreshData(!refreshData);
    });
  };

  const handleContextMenu = (event, data) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            onClickDelete: (e) => OpenModalDelete(e, data.id, data.year),
            onClickCopy: (e) => OpenModalCopy(e, data.id, data.year),
          }
        : null
    );
  };
  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          {state
            ? state.map((data, index) => (
                <Card
                  className=" hover:shadow col-md-5 mr-2 ml-2 mb-3"
                  key={index}
                >
                  <Link
                    to={"/admin/ViewBudget/" + data.year}
                    onContextMenu={(e) => handleContextMenu(e, data)}
                  >
                    <CardHeader className="border-0 row rounded">
                      <div className="col-12 p-0">
                        <h3 className="mb-0">Budget - {data.year}</h3>
                      </div>
                      <div className="col-sm-12 col-md-6 justify-content-end text-success p-0">
                        Income:
                        <br />$ {data.ingreso}
                      </div>
                      <div className="col-sm-12 col-md-6 justify-content-end text-danger p-0">
                        Expenses:
                        <br />$ {data.egreso}
                      </div>
                    </CardHeader>
                  </Link>
                  <div
                    onClick={(e) => handleContextMenu(e, data)}
                    className="position-absolute right-4 top-4"
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
          <Link
            className="col-md-5 mr-2 ml-2 mb-3 p-0 hover:shadow"
            to={"/admin/NewBudget/"}
          >
            <Card className="shadow">
              <CardBody style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <h3 className="card-title col-md-12 col-lg-12 col-xl-12 text-muted m-0">
                  <i className="fas fa-plus mr-2"></i>New Budget
                </h3>
              </CardBody>
            </Card>
          </Link>
        </Row>
        <Modal show={showDelMod} id="ModalDelete" onHide={ModDelCateSate}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Budget</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {"Are you sure delete the budget of year " + stateDelete.year + "?"}
          </Modal.Body>
          <Modal.Footer>
            <Button color="secundary" onClick={ModDelCateSate}>
              Cancel
            </Button>
            <Button
              color="danger"
              id="btn_delete_budget_year"
              onClick={(e) => handleDelete(e, stateDelete.year)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showCopyMod} id="ModalCopy" onHide={ModCopyBudgetSate}>
          <Modal.Header closeButton>
            <Modal.Title>Copy Budget</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="font-weight-semibold">
              Please, select which year the information is pasted
            </p>
            <select
              className="form-control"
              onChange={(e) => setYearPaste(e.target.value)}
              defaultValue="0"
            >
              <option value="0" hidden>
                Select a year
              </option>
              <option value={year + 1}>{year + 1}</option>
              <option value={year + 2}>{year + 2}</option>
              <option value={year + 3}>{year + 3}</option>
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button color="secundary" onClick={ModCopyBudgetSate}>
              Cancel
            </Button>
            <Button
              color="success"
              id="btn_copy_budget_year"
              onClick={(e) => handleCopy(e)}
              disabled={!yearPaste}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
        <Alert visible={stateAlert.visible} code={stateAlert.code} />
      </Container>
    </>
  );
}

export default Budget;
