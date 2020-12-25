import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Button, Row, Container } from "reactstrap";
import { Modal } from "react-bootstrap";
// core components
import { Header } from "components/Headers/Header.js";
import API from "../../variables/API";
import { Link } from "react-router-dom"; // para navegar entre paginas

function Budget() {
  const [state, setState] = useState([]);
  const [stateDelete, setStateDelete] = useState([]);
  const [showDelMod, setDelMod] = useState(false);
  const [refreshData, setrefreshData] = useState(false);

  useEffect(() => {
    var idc = sessionStorage.getItem("IdUser");
    API.post("acount", {
      id: 9,
      idc: idc,
    }).then((response) => setState(response.data));
  }, [refreshData]);

  // Funcion para cambiar de estado de los modals
  const ModDelCateSate = () => setDelMod(!showDelMod);

  const OpenModalDelete = (e, id, year) => {
    e.preventDefault();
    setStateDelete({
      year: year,
      id_data: id,
    });
    ModDelCateSate();
  };

  // Eliminar data
  const handleDelete = (e, year) => {
    e.preventDefault();
    let idc = sessionStorage.getItem("IdUser");
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
      ModDelCateSate();
      setrefreshData(!refreshData);
    });
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          {state
            ? state.map((data, index) => (
                <Card className="shadow col-md-5 mr-2 ml-2 mb-3" key={index}>
                  <CardHeader className="border-0">
                    <Row>
                      <div className="col-12">
                        <h3 className="mb-0">Budget - {data.year}</h3>
                      </div>
                      <div className="col-sm-12 col-md-6 justify-content-end text-success">
                        Income: <br></br>$ {data.ingreso}
                      </div>
                      <div className="col-sm-12 col-md-6 justify-content-end text-danger">
                        Expenses: <br></br>$ {data.egreso}
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody className="mt--4">
                    <Row>
                      <Link to={"/admin/ViewBudget/" + data.year}>
                        <Button
                          className="mr-4 shadow btn-circle"
                          color="success"
                          size="sm"
                        >
                          <i className="ni ni-curved-next"></i>
                        </Button>
                      </Link>
                      <Link
                        to={{
                          pathname: "/admin/ViewBudget",
                          state: { year: data.year },
                        }}
                      >
                        <Button
                          className="mr-4 shadow btn-circle"
                          color="danger"
                          size="sm"
                          onClick={(e) =>
                            OpenModalDelete(e, data.id, data.year)
                          }
                        >
                          <i className="far fa-trash-alt"></i>
                        </Button>
                      </Link>
                    </Row>
                  </CardBody>
                </Card>
              ))
            : ""}
          <Link className="col-md-5 mr-2 ml-2 mb-3" to={"/admin/NewBudget/"}>
            <Card className="shadow">
              <CardBody style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <Row>
                  <div className="col" style={{ marginTop: 20 }}>
                    <h3 className="card-title col-md-12 col-lg-12 col-xl-12 text-muted">
                      <i className="fas fa-plus mr-2"></i>New Budget
                    </h3>
                  </div>
                  <div className="col">
                    <i className="fas fa-chevron-right float-right mt-3 ml-2 fa-2x"></i>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Link>
        </Row>
        <Modal show={showDelMod} id="ModalDelete" onHide={ModDelCateSate}>
          <Modal.Header closeButton>
            <Modal.Title>Delete movement</Modal.Title>
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
      </Container>
    </>
  );
}

export default Budget;
