import React from "react";

import { FormGroup, Label, Button } from "reactstrap";
import { Form } from "react-bootstrap";

import API from "variables/API";

const FormEditor = props => {
  const {
    ModEdiCateSate,
    setSateAlert,
    stateformEdit,
    setformEdit,
    refreshData,
    setrefreshData,
    OpenModalDelete
  } = props;

  const handleChange = event => {
    setformEdit({ ...stateformEdit, [event.target.name]: event.target.value });
  };
  const handleSubmitEdit = event => {
    event.preventDefault();
    if (
      stateformEdit.edit_namevent === "" ||
      stateformEdit.edit_endingdate === ""
    ) {
    } else {
      let idc = localStorage.getItem("IdUser");
      API.post("edit_data", {
        id: 7,
        idu: idc,
        id_data: stateformEdit.id_data,
        prevName: stateformEdit.prevName,
        newName: stateformEdit.edit_namevent,
        date: stateformEdit.edit_endingdate
      }).then(response => {
        ModEdiCateSate();
        setrefreshData(!refreshData);
        setSateAlert({ visible: true, code: response.data });
        setTimeout(() => {
          setSateAlert({ visible: false, code: 0 });
        }, 2000);
      });
    }
  };
  return (
    <Form role="form" onSubmit={handleSubmitEdit}>
      <FormGroup>
        <Label>Name</Label>
        <Form.Control
          type="text"
          name="edit_namevent"
          defaultValue={stateformEdit.edit_namevent}
          required
          onChange={handleChange}
        ></Form.Control>
      </FormGroup>
      <FormGroup>
        <Label>Ending date</Label>
        <Form.Control
          type="date"
          name="edit_endingdate"
          defaultValue={stateformEdit.edit_endingdate}
          onChange={handleChange}
        ></Form.Control>
      </FormGroup>
      <div className="float-right">
        <Button
          color="danger"
          onClick={e =>
            OpenModalDelete(e, stateformEdit.id_data, stateformEdit.prevName)
          }
        >
          Delete
        </Button>
        <Button type="submit" color="success">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default FormEditor;
