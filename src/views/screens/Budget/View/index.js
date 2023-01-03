import React from "react";

// Components
import {
  Card,
  CardBody,
  Button,
  Label,
  ModalFooter,
  Table,
  Container,
  CardTitle,
  FormGroup,
} from "reactstrap";
import { Form, Modal } from "react-bootstrap";

import useComponents from "views/components";

// Controllers
import useControllers from "controllers";

const ViewBudget = () => {
  // Components
  const { Headers, Alert, Modals } = useComponents();
  const { Header } = Headers();
  const { Modaldelete } = Modals();

  const { useScreenHooks } = useControllers();
  const { useBudgetView } = useScreenHooks();
  const {
    state,
    OpenModalListMounth,
    year,
    formatter,
    showDelMod,
    setshowDelMod,
    ModDelCateSate,
    refreshData,
    setrefreshData,
    stateBudget,
    ModMounthSate,
    setSateAlert,
    showEditMod,
    ModEditSate,
    stateAlert,
    showMounthMod,
    OpenModalEdit,
    OpenModalDelete,
    handleSubmitEdit,
    stateEdit,
    handleChange,
  } = useBudgetView();
  let {acumulado, utilidad, aux_cat_print, acumulado_print, aux_catego} = useBudgetView()

  return (
    <>
      <Header />
      <Container className="mt--7 pb-150" fluid>
        <Card>
          <CardBody>
            <Table hover>
              <thead>
                <tr className="text-dark">
                  <th>Category</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {state
                  ? state.map((data, index) => {
                      if (data.categoria !== aux_catego && aux_catego !== "") {
                        if (data.grupo === "6") {
                          utilidad =
                            parseFloat(utilidad) + parseFloat(data.cantidad);
                        } else {
                          utilidad =
                            parseFloat(utilidad) - parseFloat(data.cantidad);
                        }
                        aux_cat_print = aux_catego;
                        acumulado_print = acumulado;
                        aux_catego = data.categoria;
                        acumulado = 0;
                        acumulado =
                          parseFloat(acumulado) + parseFloat(data.cantidad);
                        if (data.sub_categoria === null) {
                          return [
                            <tr
                              className="table-dark text-dark cursor-pointer"
                              key={index}
                            >
                              <td className="font-weight-bold">
                                {aux_cat_print}
                              </td>
                              <td>{formatter.format(acumulado_print)}</td>
                            </tr>,
                            <tr
                              onClick={(e) =>
                                OpenModalListMounth(
                                  e,
                                  data.categoria,
                                  data.nro_catego,
                                  year
                                )
                              }
                              key={index * 100}
                            >
                              <td>{data.categoria}</td>
                              <td>{formatter.format(data.cantidad)}</td>
                            </tr>,
                          ];
                        } else {
                          return [
                            <tr className="table-dark text-dark" key={index}>
                              <td className="font-weight-bold">
                                {aux_cat_print}
                              </td>
                              <td>{formatter.format(acumulado_print)}</td>
                            </tr>,
                            <tr
                              onClick={(e) =>
                                OpenModalListMounth(
                                  e,
                                  data.sub_categoria,
                                  data.nro_catego,
                                  year
                                )
                              }
                              key={index * 100}
                              className="cursor-pointer"
                            >
                              <td>{data.sub_categoria}</td>
                              <td>{formatter.format(data.cantidad)}</td>
                            </tr>,
                          ];
                        }
                      } else {
                        if (data.grupo === "4") {
                          utilidad =
                            parseFloat(utilidad) + parseFloat(data.cantidad);
                        } else {
                          utilidad =
                            parseFloat(utilidad) - parseFloat(data.cantidad);
                        }
                        if (data.sub_categoria === null) {
                          aux_catego = data.categoria;
                          acumulado =
                            parseFloat(acumulado) + parseFloat(data.cantidad);
                          return (
                            <tr
                              onClick={(e) =>
                                OpenModalListMounth(
                                  e,
                                  data.categoria,
                                  data.nro_catego,
                                  year
                                )
                              }
                              key={index}
                              className="cursor-pointer"
                            >
                              <td>{data.categoria}</td>
                              <td>{formatter.format(data.cantidad)}</td>
                            </tr>
                          );
                        } else {
                          aux_catego = data.categoria;
                          acumulado =
                            parseFloat(acumulado) + parseFloat(data.cantidad);
                          return (
                            <tr
                              key={index}
                              onClick={(e) =>
                                OpenModalListMounth(
                                  e,
                                  data.sub_categoria,
                                  data.nro_catego,
                                  year
                                )
                              }
                              className="cursor-pointer"
                            >
                              <td>{data.sub_categoria}</td>
                              <td>{formatter.format(data.cantidad)}</td>
                            </tr>
                          );
                        }
                      }
                    })
                  : ""}
                <tr className="table-dark text-dark">
                  <td className="font-weight-bold">{aux_catego}</td>
                  <td>{formatter.format(acumulado)}</td>
                </tr>
                {utilidad >= 0 ? (
                  <tr className="table-success text-dark">
                    <td className="font-weight-bold">Utility</td>
                    <td>{formatter.format(utilidad)}</td>
                  </tr>
                ) : (
                  <tr className="table-danger text-dark">
                    <td className="font-weight-bold">Utility</td>
                    <td>{formatter.format(utilidad)}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </CardBody>
        </Card>
        <div
          className="alert bg-success-lighten-20 fixed-bottom mx-auto col-3 mb-2 text-dark d-none"
          id="alert-200"
          role="alert"
        >
          <i className="far fa-check-circle mr-5"></i>
          Data save success!
        </div>
        <div
          className="alert bg-wrong-darken-10 fixed-bottom mx-auto col-3 mb-2 text-dark d-none"
          id="alert-400"
          role="alert"
        >
          <i className="far fa-times-circle mr-5"></i>
          Data doens't save!
        </div>
        <Modal
          show={showMounthMod}
          id="ModalMounth"
          onHide={ModMounthSate}
          scrollable
        >
          <Modal.Header closeButton>
            <Modal.Title>Budget {stateBudget.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ overflowY: "scroll", maxHeight: "25rem" }}>
              {stateBudget.data
                ? stateBudget.data.map((data, index) => (
                    <Card
                      key={index}
                      onClick={(e) =>
                        OpenModalEdit(
                          e,
                          data.id,
                          data.mes,
                          data.mes_name,
                          data.year,
                          data.valor
                        )
                      }
                    >
                      <CardTitle className="col-md-12 text-muted mt-2">
                        <h4>{data.mes_name}</h4>
                        <h6 id={"value_mounth_" + data.id}>
                          {formatter.format(data.valor)}
                        </h6>
                      </CardTitle>
                    </Card>
                  ))
                : ""}
            </div>
          </Modal.Body>
          <ModalFooter>
            <Button color="secundary" onClick={ModMounthSate}>
              Close
            </Button>
            <Button color="danger" onClick={(e) => OpenModalDelete(e)}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
        <Modaldelete
          showDelMod={showDelMod}
          setshowDelMod={setshowDelMod}
          ModDelCateSate={ModDelCateSate}
          title="Delete budget"
          message="Are you sure to delete the entry of this budget?"
          refreshData={refreshData}
          setrefreshData={setrefreshData}
          state={stateBudget}
          year={year}
          extraModal={ModMounthSate}
          setSateAlert={setSateAlert}
        />
        <Modal show={showEditMod} id="ModalEditBudget" onHide={ModEditSate}>
          <Modal.Header closeButton>
            <Modal.Title>Category Editor</Modal.Title>
          </Modal.Header>
          <Form role="form" onSubmit={handleSubmitEdit}>
            <Modal.Body>
              {stateEdit.pass === 0 ? (
                <p>
                  This month has already passed, therefore it cannot be modified
                </p>
              ) : (
                <FormGroup>
                  <Label>Mounth</Label>
                  <Form.Control
                    type="text"
                    name="mounth"
                    id="mounth"
                    readOnly
                    defaultValue={stateEdit.mounth}
                    required
                  ></Form.Control>
                  <Label>Value</Label>
                  <Form.Control
                    pattern="[0-9]{0,5}"
                    type="number"
                    name="value"
                    id="value"
                    step={0.01}
                    defaultValue={stateEdit.value}
                    onChange={handleChange}
                    required
                  ></Form.Control>
                </FormGroup>
              )}
            </Modal.Body>
            <ModalFooter>
              <Button color="secundary" onClick={ModEditSate}>
                Close
              </Button>
              {stateEdit.pass === 1 ? (
                <Button type="submit" color="success" id="btn_save_budget">
                  Save Changes
                </Button>
              ) : (
                ""
              )}
            </ModalFooter>
          </Form>
        </Modal>
      </Container>
      <Alert visible={stateAlert.visible} code={stateAlert.code} />
    </>
  );
};

export default ViewBudget;
