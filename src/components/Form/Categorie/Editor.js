import React from "react";

import {
    FormGroup,
    Label,
    Button
  } from "reactstrap";
import { Form } from "react-bootstrap";

import API from "../../../variables/API";

const FormEditor = (props) => {

    const {
        ModEdiCateSate,
        setSateAlert,
        stateformEdit,
        setformEdit,
        listCategorie,
        refreshData,
        setrefreshData
    } = props;

    
    const handleChange = (event, setformEdit) => {
        setformEdit({ ...stateformEdit, [event.target.name]: event.target.value });
    };
    const handleSubmitEdit = (event) => {
        event.preventDefault();
        if (stateformEdit.edit_group === 0) {
        } else {
            let idc = sessionStorage.getItem("IdUser");
            API.post("edit_data", {
                id: 1,
                idu: idc,
                id_data: stateformEdit.id_data,
                name: stateformEdit.edit_categor,
                descrip: stateformEdit.edit_descrip,
                group: stateformEdit.edit_group,
                sub_group: stateformEdit.edit_include,
            }).then((response) => {
                ModEdiCateSate();
                setrefreshData(!refreshData)
                setSateAlert({visible: true, code: response.data})
                setTimeout(() => {
                    setSateAlert({visible: false, code: 0})
                }, 2000);
                }
            );
        }
    };
  return (
    <Form role="form" onSubmit={handleSubmitEdit}>
        <FormGroup>
          <Label>Name</Label>
          <Form.Control
            type="text"
            name="edit_categor"
            defaultValue={stateformEdit.edit_categor}
            required
            onChange={(e) => handleChange(e, setformEdit)}
          ></Form.Control>
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <Form.Control
            as="textarea"
            name="edit_descrip"
            defaultValue={stateformEdit.edit_descrip}
            rows="3"
            onChange={(e) => handleChange(e, setformEdit)}
          ></Form.Control>
        </FormGroup>
        <FormGroup>
          <Label>Group</Label>
          <Form.Control
            as="select"
            name="edit_group"
            defaultValue={stateformEdit.edit_group}
            required
            onChange={(e) => handleChange(e, setformEdit)}
          >
            <option value="0" disabled>
              Select one option
            </option>
            <option value="1">Fixed costs</option>
            <option value="2">Personal expenses</option>
            <option value="3">Savings</option>
            <option value="4">Income</option>
          </Form.Control>
        </FormGroup>
        <FormGroup>
          <Label>Include inside other category</Label>
          <Form.Control
            as="select"
            name="edit_include"
            onChange={(e) => handleChange(e, setformEdit)}
            defaultValue={stateformEdit.edit_include}
          >
            <option></option>
            {listCategorie.jsonCatego.id !== -1000
              ? listCategorie.jsonCatego.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.categoria}
                  </option>
                ))
              : ""}
          </Form.Control>
        </FormGroup>
        <div className="float-right">
            <Button color="danger" onClick={ModEdiCateSate}>
                Close
            </Button>
            <Button type="submit" color="success">
                Save
            </Button>
        </div>
    </Form>
  )
}

export default FormEditor;