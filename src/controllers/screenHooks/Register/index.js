import { useState } from "react";
import AdminLayout from "views/layouts/PrivateContent";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import API from "variables/API";

const useRegister = () => {
  // envio de informacion
  const [stateform, setform] = useState({
    FirstName: "",
    LastName: "",
    Badge: "",
    Email: "",
    Password: "",
  });
  const [statePass, setPass] = useState({ style: "", text: "" });
  /* ...state para que no se modifique */
  const handleChange = (event) => {
    setform({ ...stateform, [event.target.name]: event.target.value });
    if (event.target.name === "Password") {
      event.target.value.length < 6
        ? setPass({ style: "text-danger", text: "easy" })
        : event.target.value.length >= 6 && event.target.value.length < 8
        ? setPass({ style: "text-warning", text: "medium" })
        : setPass({ style: "text-success", text: "strong" });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(state + " - " + state.password);
    if (
      stateform.Email === "" ||
      stateform.Password === "" ||
      stateform.Badge === "" ||
      stateform.FirstName === "" ||
      stateform.LastName === "" ||
      stateform.Password.length < 6
    ) {
      stateform.Password.length < 6
        ? (document.getElementById("mensaje").innerHTML =
            "<div class='alert alert-warning' role='alert'>" +
            "the password must be longer than 6 characters</div>")
        : (document.getElementById("mensaje").innerHTML =
            "<div class='alert alert-danger' role='alert'>" +
            "fill all the fields</div>");
    } else {
      API.post("Register", {
        FirstName: stateform.FirstName,
        LastName: stateform.LastName,
        Badge: stateform.Badge,
        Email: stateform.Email,
        Password: stateform.Password,
      }).then((res) => {
        //console.log(res.data);
        if (res.data.data === 400) {
          document.getElementById("mensaje").innerHTML =
            "<div class='alert alert-danger' role='alert'>" +
            "Could not create user!</div>";
        } else if (res.data.data === 200) {
          localStorage.setItem("Name", stateform.FirstName);
          localStorage.setItem("LastName", stateform.LastName);
          localStorage.setItem("Email", stateform.Email);
          localStorage.setItem("IdUser", res.data.idUser);
          localStorage.setItem("Divisa", stateform.Badge);
          ReactDOM.render(
            <BrowserRouter>
              <Switch>
                <Route
                  path="/admin"
                  render={(props) => <AdminLayout {...props} />}
                />
                <Redirect from="/" to="/admin/Dash" />
              </Switch>
            </BrowserRouter>,
            document.getElementById("root")
          );
        }
      });
    }
  };
  return {
    handleChange,
    handleSubmit,
    statePass,
  };
};

export default useRegister;
