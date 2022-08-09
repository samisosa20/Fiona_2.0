import React, { useState } from "react";

import { FormGroup, Label, Button, Input, Row } from "reactstrap";
import { Form, InputGroup } from "react-bootstrap";

import API from "../../../variables/API";

const FormEditor = (props) => {
  const {
    ModEdiCateSate,
    setSateAlert,
    stateformEdit,
    setformEdit,
    refreshData,
    setrefreshData,
    OpenModalDelete,
    stateCatego,
    stateAcount,
  } = props;

  const [stateSignal, setSignal] = useState({ Signal: stateformEdit.signal });

  const ChangeSignal = (event) => {
    setSignal({ Signal: event.target.value !== "+" ? "+" : "-" });
  };
  const VerifySignal = (event, idSigno) => {
    if (event.target.value < 0) {
      if (idSigno !== "") {
        setSignal({ Signal: "-" });
      }
      event.target.value = event.target.value * -1;
      setformEdit({
        ...stateformEdit,
        [event.target.name]: event.target.value * -1,
      });
    } else {
      setformEdit({
        ...stateformEdit,
        [event.target.name]:
          stateSignal.Signal === "+"
            ? event.target.value
            : event.target.value * -1,
      });
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "repeat" && event.target.value === "0") {
      setformEdit({
        ...stateformEdit,
        endDate: "",
        [event.target.name]: event.target.value,
      });
    } else {
      setformEdit({
        ...stateformEdit,
        [event.target.name]: event.target.value,
      });
    }
  };
  const renderRecursion = (listCategories) => {
    return listCategories.map((category) => (
      <>
        <option
          key={category.id + category.name}
          className={
            category.lvl === 1 || category.subCategories?.length > 0
              ? "font-weight-bold"
              : ""
          }
          value={category.id}
          dangerouslySetInnerHTML={{__html: '&nbsp;'.repeat(category.lvl - 1) + category.name}}
        />
        {category.subCategories?.length > 0 &&
          renderRecursion(category.subCategories)}
      </>
    ));
  };
  const handleSubmitEdit = (event) => {
    event.preventDefault();
    if (
      stateformEdit.startDate === "" ||
      stateformEdit.account === "" ||
      stateformEdit.value === "" ||
      stateformEdit.category === ""
    ) {
    } else {
      API.post("edit_data", {
        id: 9,
        idu: localStorage.getItem("IdUser"),
        id_data: stateformEdit.id_data,
        value: stateformEdit.value,
        badge: stateformEdit.badge,
        account: stateformEdit.account,
        category: stateformEdit.category,
        startDate: stateformEdit.startDate,
        frequency: stateformEdit.frequency,
        recurrency: stateformEdit.recurrency,
        endDate: stateformEdit.endDate,
        specificDay: stateformEdit.specificDay,
        description: stateformEdit.description,
      }).then((response) => {
        ModEdiCateSate();
        setrefreshData(!refreshData);
        document.getElementById("signo_move").className =
          "btn btn-outline-success";
        setSignal({ Signal: "+" });
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
        <Row>
          <div className="col-md-8">
            <Label>Value</Label>
            <InputGroup>
              <InputGroup.Prepend>
                <Button
                  value={stateSignal.Signal}
                  type="button"
                  id="signo_move"
                  className={`btn ${
                    stateSignal.Signal === "+"
                      ? "btn-outline-success"
                      : "btn-outline-danger"
                  }`}
                  onClick={ChangeSignal}
                >
                  {stateSignal.Signal}
                </Button>
              </InputGroup.Prepend>
              <Form.Control
                pattern="[0-9]{0,5}"
                type="number"
                name="value"
                id="value"
                step={0.01}
                aria-describedby="SignalAppend"
                required
                defaultValue={stateformEdit.value}
                onChange={(e) => VerifySignal(e, "signo_move")}
              ></Form.Control>
            </InputGroup>
          </div>
          <div className="col-md-3">
            <Form.Control
              as="select"
              className="mt-4"
              name="badge"
              defaultValue={stateformEdit.badge}
              onChange={handleChange}
            >
              <option>COP</option>
              <option>USD</option>
            </Form.Control>
          </div>
        </Row>
      </FormGroup>
      <FormGroup>
        <Label>Acount</Label>
        <Form.Control
          as="select"
          name="account"
          onChange={handleChange}
          defaultValue={stateformEdit.account}
        >
          <option></option>
          {stateAcount.id !== -1000 && stateAcount.length > 0
            ? stateAcount.map((data, index) => {
                return (
                  <option
                    key={index}
                    className="font-weight-bold"
                    value={data.id}
                  >
                    {data.nombre}
                  </option>
                );
              })
            : ""}
        </Form.Control>
      </FormGroup>
      <FormGroup>
        <Label>Category</Label>
        <Form.Control
          as="select"
          name="category"
          onChange={handleChange}
          defaultValue={stateformEdit.category}
        >
          <option></option>
          {stateCatego.id !== -1000
                  ? renderRecursion(stateCatego): ""}
        </Form.Control>
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <Form.Control
          as="textarea"
          name="description"
          rows="3"
          defaultValue={stateformEdit.description}
          onChange={handleChange}
        ></Form.Control>
      </FormGroup>
      <FormGroup>
        <Label>Frequency</Label>
        <Form.Control
          as="select"
          name="frequency"
          onChange={handleChange}
          defaultValue={stateformEdit.frequency}
        >
          <option value="0">One time</option>
          <option value="1">Recurrent payment</option>
        </Form.Control>
      </FormGroup>
      <FormGroup>
        <Label>{stateformEdit.frequency === "0" ? "Date" : "Start date"}</Label>
        <Input
          type="date"
          name="startDate"
          defaultValue={stateformEdit.startDate}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup hidden={stateformEdit.frequency === "0"}>
        <Label>Recurrency</Label>
        <Form.Control
          as="select"
          name="recurrency"
          onChange={handleChange}
          defaultValue={stateformEdit.recurrency}
        >
          <option value="" hidden>
            Set recurrence
          </option>
          <option value="-1.00">specific day</option>
          <option value="0.10">Daily</option>
          <option value="0.70">Weekly</option>
          <option value="0.15">Biweekly</option>
          <option value="1.00">Monthly</option>
          <option value="2.00">Bimonthly</option>
          <option value="3.00">Trimestraly</option>
          <option value="4.00">Quarterly</option>
          <option value="6.00">Biannual</option>
          <option value="12.00">Yearly</option>
        </Form.Control>
      </FormGroup>
      <FormGroup hidden={stateformEdit.recurrency !== "-1.00"}>
        <Label>Choose a day</Label>
        <Form.Control
          as="select"
          name="specificDay"
          onChange={handleChange}
          defaultValue={stateformEdit.specificDay}
        >
          <option value="" hidden>
            Select a day
          </option>
          {Array.from(Array(31), (e, i) => {
            return <option key={i + 1}>{i + 1}</option>;
          })}
        </Form.Control>
      </FormGroup>
      <FormGroup hidden={stateformEdit.frequency === "0"}>
        <Label>Repeat</Label>
        <Form.Control
          as="select"
          name="repeat"
          onChange={handleChange}
          defaultValue={stateformEdit.repeat}
        >
          <option value="0">Forever</option>
          <option value="1">Until a date</option>
        </Form.Control>
      </FormGroup>
      <FormGroup hidden={!stateformEdit.repeat || stateformEdit.repeat === "0"}>
        <Label>End Date</Label>
        <Input
          type="date"
          name="endDate"
          onChange={handleChange}
          defaultValue={stateformEdit.endDate}
        />
      </FormGroup>
      <div className="float-right">
        <Button
          color="danger"
          onClick={(e) =>
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
