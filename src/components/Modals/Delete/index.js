import React, { useState } from "react";
// reactstrap components
import { Button } from "reactstrap";
import { Modal } from "react-bootstrap";
import API from "../../../variables/API";

const Modaldelete = props => {
  const {
    action,
    showDelMod,
    setshowDelMod,
    title,
    message,
    refreshData,
    setrefreshData,
    state,
    year,
    extraModal,
    setSateAlert
  } = props;
  const ModDelCateSate = () => setshowDelMod(!showDelMod);

  const handleDelete = (
    e,
    action,
    refreshData,
    setrefreshData,
    state,
    year
  ) => {
    e.preventDefault();
    document.getElementById("btn_dele_move_move").disabled = true;
    document.getElementById("btn_dele_move_move").innerHTML =
      "<span className='spinner-border spinner-border-sm mr-1'" +
      "role='status' aria-hidden='true'></span>Loading...";
    let idc = sessionStorage.getItem("IdUser");
    let data;
    if (action === "catego") {
      data = { id: 1, idu: idc, id_data: state.id_data };
    } else if (action === "account") {
      data = { id: 2, idu: idc, id_data: state.id_data };
    } else if (action === "movement") {
      data = {
        id: 3,
        idu: idc,
        id_data: state.id_data,
        date: state.datetime
      };
    } else if (action === "event") {
      data = {
        id: 6,
        idu: idc,
        id_data: state.id_data
      };
    } else {
      data = { id: 5, idu: idc, year: year, category: state.number };
    }
    API.post("delete_data", data).then(response => {
      //console.log(response.data);
      ModDelCateSate();
      if (extraModal) {
        extraModal();
      }
      document.getElementById("btn_dele_move_move").innerHTML = "Delete";
      document.getElementById("btn_dele_move_move").disabled = false;
      setrefreshData(!refreshData);
      setSateAlert({ visible: true, code: response.data });
      setTimeout(() => {
        setSateAlert({ visible: false, code: 0 });
      }, 2000);
    });
  };

  return (
    <Modal show={showDelMod} id="ModalDelete" onHide={ModDelCateSate}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button color="secundary" onClick={ModDelCateSate}>
          Cancel
        </Button>
        <Button
          type="submit"
          color="danger"
          id="btn_dele_move_move"
          onClick={e =>
            handleDelete(
              e,
              action,
              refreshData,
              setrefreshData,
              state,
              year,
              extraModal
            )
          }
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default Modaldelete;
