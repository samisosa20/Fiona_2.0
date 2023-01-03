import { useState } from "react";

import store from "config/redux/store";

import API from "variables/API";

const useForgot = () => {
  const [email, setEmail] = useState(null)

  const handleChange = (event) => {
    setEmail(event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      document.getElementById("mensaje").innerHTML =
        "<div class='alert alert-danger' role='alert'>Please, enter you email.</div>";
    } else {
      API.post("forgot", {
        email: email,
      }).then((res) => {
        if (res.data === 500) {
          document.getElementById("mensaje").innerHTML =
            "<div class='alert alert-danger' role='alert'>The user doesn't exist!</div>";
        } else if (res.data === 400) {
          document.getElementById("mensaje").innerHTML =
            "<div class='alert alert-warning' role='alert'>We have a problem to reset your password, try again.</div>";
        } else if (res.data === 200) {
          window.location = "/auth/login?reset=true";
        }
      });
    }
  };
    return {
        handleChange,
        handleSubmit,
        store,
    }
}

export default useForgot