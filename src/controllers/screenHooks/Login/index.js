import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import store from "config/redux/store";
import { return_user } from "config/redux/actions/Login";

import API from "variables/API";

const useLogin = () => {
    const [key, setKey] = useState(false);

    /* ...state para que no se modifique */
    const handleChange = (event) => {
      //setState({ ...state, [event.target.name]: event.target.value });
  
      store.dispatch(return_user(event.target.name, event.target.value));
    };
  
    const handleSubmit = (event) => {
      /*console.log(
        store.getState().login_reducer.user + " = " + store.getState().password
      );*/
      event.preventDefault();
      if (
        store.getState().login_reducer.password === "" ||
        store.getState().login_reducer.user === ""
      ) {
        document.getElementById("mensaje").innerHTML =
          "<div class='alert alert-danger' role='alert'>" +
          "Enter username and password</div>";
      } else {
        API.post("validar", {
          user: store.getState().login_reducer.user,
          passwd: store.getState().login_reducer.password,
        }).then((res) => {
          //console.log(res.data);
          if (res.data.data === 400) {
            document.getElementById("mensaje").innerHTML =
              "<div class='alert alert-danger' role='alert'>" +
              "User does not exist!</div>";
          } else if (res.data.data === 450) {
            document.getElementById("mensaje").innerHTML =
              "<div class='alert alert-danger' role='alert'>" +
              "Incorrect user or password!</div>";
          } else if (res.data.data === 200) {
            localStorage.setItem("Name", res.data.name);
            localStorage.setItem("LastName", res.data.lastname);
            localStorage.setItem("Email", res.data.email);
            localStorage.setItem("IdUser", res.data.idUser);
            localStorage.setItem("Divisa", res.data.divisa);
            //window.location = "/admin/Acount";
            setKey(true);
          }
        });
      }
    };
    useEffect(()=>{
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      if(urlParams.get('reset')){
        document.getElementById("mensaje").innerHTML =
              "<div class='alert alert-success' role='alert'>we send you a message, check your email and junk email.</div>";
      }
    },[])
  
    const Login_success = () => {
      if (key || (localStorage.getItem("IdUser") !== '' && localStorage.getItem("IdUser") !== null)) {
        return <Redirect to="/admin/Account" />;
      }
    };
    return {
        handleChange,
        handleSubmit,
        Login_success,
        store,
    }
}

export default useLogin