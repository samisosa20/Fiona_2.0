import React, { useState, useEffect } from "react";
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
// core components
import { Header } from "components/Headers/Header.js";
import API from "../../variables/API";

function ViewBudget() {
  const [state, setState] = useState([]);
  const [showDelMod, setshowDelMod] = useState(false);
  const [stateBudget, setstateBudget] = useState({ number: 0, name: "", data: [] });
  const [stateEdit, setstateEdit] = useState({
    pass: 0,
    mounth: "",
    value: 0.0,
    id_data: 0,
  });
  let url = window.location.href;
  let div = url.split("/");
  let year = div[5];
  let aux_catego = "";
  let aux_cat_print = "";
  let acumulado_print = 0.0;
  let acumulado = 0.0;
  let utilidad = 0.0;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  /* Declaracion de estados de los modals */
  const [showMounthMod, setshowMounthMod] = useState(false);
  const [showEditMod, setEditMod] = useState(false);
  const [refreshData, setrefreshData] = useState(false);

  // Funcion para cambiar de estado de los modals
  const ModMounthSate = () => setshowMounthMod(!showMounthMod);
  const ModEditSate = () => setEditMod(!showEditMod);
  const ModDelCateSate = () => setshowDelMod(!showDelMod);

  useEffect(() => {
    var idc = sessionStorage.getItem("IdUser");
    API.post("acount", {
      id: 10,
      idc: idc,
      year: year,
    }).then((response) => setState(response.data));
  }, [refreshData]);

  const handleChange = (event) => {
    setstateEdit({ ...stateEdit, [event.target.name]: event.target.value });
  };
  // Accion al abrir los modals
  const OpenModalListMounth = (e, name_catego, number_cate, year) => {
    e.preventDefault();
    var idc = sessionStorage.getItem("IdUser");
    API.post("acount", {
      id: 11,
      idc: idc,
      cate: number_cate,
      year: year,
    }).then((response) =>
      setstateBudget({ number: number_cate, name: name_catego, data: response.data })
    );
    ModMounthSate();
  };

  const OpenModalEdit = (e, id, nro_mes, mes, year, value) => {
    e.preventDefault();
    let mounth = new Date().getMonth() + 1;
    let year_now = new Date().getFullYear();
    ModEditSate();
    if (nro_mes < mounth && parseInt(year) === year_now) {
      setstateEdit({ pass: 0, mounth: mes, value: value });
    } else {
      setstateEdit({ pass: 1, mounth: mes, value: value, id_data: id });
    }
  };
  const OpenModalDelete = (e) => {
    e.preventDefault();
    ModDelCateSate();
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    if (stateEdit.value < 0 || stateEdit.value === "") {
      alert("Value has to positive");
    } else {
      document.getElementById("btn_save_budget").disabled = true;
      document.getElementById("btn_save_budget").innerHTML =
        "<span class='spinner-border spinner-border-sm mr-1'" +
        "role='status' aria-hidden='true'></span>Loading...";
      let idc = sessionStorage.getItem("IdUser");
      API.post("edit_data", {
        id: 6,
        idu: idc,
        mounth: stateEdit.mounth,
        id_data: stateEdit.id_data,
        value: stateEdit.value,
      }).then((response) => {
        //alert (response.data);
        ModEditSate();
        document.getElementById(
          "value_mounth_" + stateEdit.id_data
        ).innerHTML = formatter.format(stateEdit.value);
        document.getElementById("btn_save_budget").innerHTML = "Save Changes";
        document.getElementById("btn_save_budget").disabled = false;
        setrefreshData(!refreshData);
        let idAlert;
        if (response.data === 200) {
          idAlert = "alert-200";
        } else {
          idAlert = "alert-400";
        }
        document.querySelector(`#${idAlert}`).classList.remove("d-none");
          setTimeout(() => {
          document.querySelector(`#${idAlert}`).classList.add("d-none");
          }, 2000)
      });
    }
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    document.getElementById("btn_dele_move_move").disabled = true;
    document.getElementById("btn_dele_move_move").innerHTML =
      "<span className='spinner-border spinner-border-sm mr-1'" +
      "role='status' aria-hidden='true'></span>Loading...";
    let idc = sessionStorage.getItem("IdUser");
    API.post("delete_data", {
      id: 5,
      idu: idc,
      year: year,
      category: stateBudget.number,
    }).then((response) => {
      //alert (response.data);
      ModDelCateSate();
      document.getElementById("btn_dele_move_move").innerHTML = "Delete";
      document.getElementById("btn_dele_move_move").disabled = false;
      setrefreshData(!refreshData);
      let idAlert;
        if (response.data === 200) {
          idAlert = "alert-200";
        } else {
          idAlert = "alert-400";
        }
        document.querySelector(`#${idAlert}`).classList.remove("d-none");
          setTimeout(() => {
          document.querySelector(`#${idAlert}`).classList.add("d-none");
          }, 2000)
    });
  }

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
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
                            <tr key={index}
                              onClick={(e) =>
                                OpenModalListMounth(
                                  e,
                                  data.sub_categoria,
                                  data.nro_catego,
                                  year
                                )
                              }
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
        <div className="alert bg-success-lighten-20 fixed-bottom mx-auto col-3 mb-2 text-dark d-none" id="alert-200" role="alert">
          <i className="far fa-check-circle mr-5"></i>
          Data save success!
        </div>
        <div className="alert bg-wrong-darken-10 fixed-bottom mx-auto col-3 mb-2 text-dark d-none" id="alert-400" role="alert">
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
            <div style={{overflowY: 'scroll', maxHeight: '25rem'}}>
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
            <Button color="danger" onClick={(e) =>
                  OpenModalDelete(
                    e
                  )
                }>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
        <Modal show={showDelMod} id="ModalDelete" onHide={ModDelCateSate}>
          <Modal.Header closeButton>
            <Modal.Title>Delete budget</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {"Are you sure to delete the entry of this budget?"}
          </Modal.Body>
          <Modal.Footer>
            <Button color="secundary" onClick={ModDelCateSate}>
              Cancel
            </Button>
            <Button
              type="submit"
              color="danger"
              id="btn_dele_move_move"
              onClick={(e) => handleDelete(e, stateEdit.id_data)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
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
    </>
  );
}

export default ViewBudget;
