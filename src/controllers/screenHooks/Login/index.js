import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

// Helper
import useHelpers from "helpers";

// actions
import useApi from "../../../api";

const useLogin = () => {
  const history = useHistory();

  const { useValidators } = useHelpers();
  const { loginValidator } = useValidators();

  const { useActions } = useApi();
  const { useAuthActions, dispatch } = useActions();
  const { actLogin } = useAuthActions();

  // Form State
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginValidator),
    mode: "all",
  });

  const onSubmit = (data) => {
    const onSucces = () => {
      history.push("/admin/Account");
    };
    const onError = () => {
    };
    dispatch(actLogin(data, onSucces, onError));
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get("reset")) {
      document.getElementById("mensaje").innerHTML =
        "<div class='alert alert-success' role='alert'>we send you a message, check your email and junk email.</div>";
    }
  }, []);

  return {
    onSubmit,
    handleSubmit,
    control,
    errors,
  };
};

export default useLogin;
