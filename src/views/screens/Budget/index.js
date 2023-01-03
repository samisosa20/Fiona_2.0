import React from "react";
import { Link } from "react-router-dom";

// Components
import { Card, CardBody, CardHeader, Button, Row, Container } from "reactstrap";
import { Modal } from "react-bootstrap";
import useComponents from "views/components";

// Controllers
import useControllers from "controllers";

const Budget = () => {
  // Components
  const { Headers, Alert, ContextMenuCustom } = useComponents();
  const { Header } = Headers();

  const { useScreenHooks } = useControllers();
  const { useBudget } = useScreenHooks();
  const {
    state,
    contextMenu,
    handleClose,
    showDelMod,
    ModDelCateSate,
    showCopyMod,
    ModCopyBudgetSate,
    stateAlert,
    stateDelete,
    handleDelete,
    setYearPaste,
    year,
    handleCopy,
    yearPaste,
    handleContextMenu
  } = useBudget();

  return (
    <>
      <Header />
      <Container className="mt--7 pb-150" fluid>
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
};

export default Budget;
