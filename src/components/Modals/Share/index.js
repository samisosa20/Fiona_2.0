import React, { useState } from "react";
// reactstrap components
import { Button, Input, FormGroup, Label } from "reactstrap";
import { Modal } from "react-bootstrap";

import API from "../../../variables/API";


const ModalshareAccount = (props) => {
  const {showShareMod, setshowShareMod, title, message, refreshData, setrefreshData, state, setSateAlert} = props;
  const ModShareAccount = () => setshowShareMod(!showShareMod);
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value)
  }
  const handleShare = (e, refreshData, setrefreshData, state) => {
    e.preventDefault();
    if (email === ""){
        document.querySelector("#emailShare").classList.add("is-invalid")
    } else {
        document.getElementById("btn_share_account").disabled = true;
        document.getElementById("btn_share_account").innerHTML =
        "<span className='spinner-border spinner-border-sm mr-1'" +
        "role='status' aria-hidden='true'></span>Loading...";
        document.querySelector("#emailShare").classList.remove("is-invalid")
        const idc = localStorage.getItem("IdUser");
        const fullName = localStorage.getItem("Name") + " " + localStorage.getItem("LastName");
        const data = {id: 7,
            idu: idc,
            email: email,
            account: state.id_data,
            fullName: fullName
        }
        API.post("add_data", 
        data
        ).then((response) => {
            //console.log(response.data);
            ModShareAccount();
            document.getElementById("btn_share_account").innerHTML = "Share";
            document.getElementById("btn_share_account").disabled = false;
            setrefreshData(!refreshData);
            setSateAlert({visible: true, code: response.data})
            setTimeout(() => {
            setSateAlert({visible: false, code: 0})
            }, 2000);
        }, (error) => { console.log(error) });
    }
  }

  return(
  <Modal show={showShareMod} id="ModalshareAccount" onHide={ModShareAccount}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {message}
      <br/>
      <p>Share the accounts with one or more people to have a common account.
        The person will be able to add, edit and delete account movements
      </p>
      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          name="emailShare"
          id="emailShare"
          placeholder="email@email.com"
          onChange={handleChange}
        ></Input>
      </FormGroup>
    </Modal.Body>
    <Modal.Footer>
      <Button color="secundary" onClick={ModShareAccount}>
        Cancel
      </Button>
      <Button
        type="submit"
        color="success"
        id="btn_share_account"
        onClick={(e) => handleShare(e, refreshData, setrefreshData, state)}
      >
        Share
      </Button>
    </Modal.Footer>
  </Modal>
  )
}
export default ModalshareAccount;
