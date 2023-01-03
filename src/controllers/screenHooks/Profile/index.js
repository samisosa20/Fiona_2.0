import { useState, useEffect } from "react";
import API from "variables/API";

const useProfile = () => {
  /* Declaracion de variables */
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    divisa: "",
    password: "",
  });

  useEffect(() => {
    let Email = localStorage.getItem("Email");
    let Name = localStorage.getItem("Name");
    let LastName = localStorage.getItem("LastName");
    let Divisa = localStorage.getItem("Divisa");
    document.getElementById("SaveProfile").disabled = true;
    setState({
      first_name: Name,
      last_name: LastName,
      email: Email,
      divisa: Divisa,
      password: "",
    });
  }, []);
  /* ...state para que no se modifique */
  const ChangeDataProfile = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
    document.getElementById("SaveProfile").disabled = false;
  };

  const SaveChange = (event) => {
    event.preventDefault();
    document.getElementById("SaveProfile").disabled = true;
    document.getElementById("SaveProfile").innerHTML =
      "<span className='spinner-border spinner-border-sm mr-1'" +
      "role='status' aria-hidden='true'></span>Loading...";
    let idc = localStorage.getItem("IdUser");
    API.post("edit_data", {
      id: 5,
      idu: idc,
      FirstName: state.first_name,
      LastName: state.last_name,
      Divi: state.divisa,
      Password: state.password,
    }).then((response) => {
      //console.log(response.data)
      document.getElementById("SaveProfile").innerHTML = "Save";
      if (response.data === "200") {
        localStorage.setItem("Name", state.first_name);
        localStorage.setItem("LastName", state.last_name);
        localStorage.setItem("Divisa", state.divisa);
      }
      document.getElementById("pass_2").value = "";
      document.getElementById("pass_1").value = "";
      document.getElementById("pass_2").className =
        "form-control-alternative form-control";
      document.getElementById("pass_1").className =
        "form-control-alternative form-control";
    });
  };
  const val_pass_1 = (event) => {
    let pass = document.getElementById("pass_1").value;
    if (pass.length < 6) {
      document.getElementById("pass_1").className = "form-control is-invalid";
    } else {
      document.getElementById("pass_1").className = "form-control is-valid";
    }
  };

  const val_pass_2 = (event) => {
    let pass2 = document.getElementById("pass_2").value;
    let pass1 = document.getElementById("pass_1").value;
    if (pass1 !== pass2) {
      document.getElementById("pass_2").className = "form-control is-invalid";
    } else {
      document.getElementById("pass_2").className = "form-control is-valid";
      setState({ ...state, password: pass2 });
      document.getElementById("SaveProfile").disabled = false;
    }
  };
  return { SaveChange, ChangeDataProfile, state, val_pass_1, val_pass_2 };
};

export default useProfile;
