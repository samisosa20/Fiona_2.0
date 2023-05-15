import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import useHelpers from "../../helpers";

const useInterceptor = (store) => {
  const history = useHistory();
  // Helpers
  const { useQuickFunctions } = useHelpers();
  const { useToast } = useQuickFunctions();
  const { error } = useToast();

  const handleRequestSuccess = (request) => {
    store.dispatch({ type: "LOADER_ON" });
    const { getState } = store;
    const { auth } = getState();
    const { auth_token } = auth;

    if (auth_token) request.headers.authorization = `Bearer ${auth_token}`;
    request.headers["Content-Type"] = "application/json";
    request.headers["accept"] = "application/json";
    request.headers["time-zone"] = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return request;
  };
  const handleRequestError = (error) => {
    store.dispatch({ type: "LOADER_OFF" });
    console.log(`REQUEST ERROR! => ${error}`);
  };

  const handleResponseSuccess = (response) => {
    store.dispatch({ type: "LOADER_OFF" });
    return response;
  };

  const callErrorToast = (text = "") => {
    error(text);
  };

  const handleResponseError = (error) => {
    store.dispatch({ type: "LOADER_OFF" });
    switch (error.response.status) {
      case "401":
        callErrorToast(error.response.data.message);
        store.dispatch({ type: "LOGOUT" });
        history.push("/");
        break;
      case 400:
        callErrorToast(error.response.data.message);
        return error.response;
      default:
        callErrorToast(error.response.data.message);
        return;
    }
  };

  useEffect(() => {
    axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}api/v1/`;
    axios.defaults.params = {};
    axios.interceptors.request.use(handleRequestSuccess, handleRequestError);
    axios.interceptors.response.use(handleResponseSuccess, handleResponseError);
  }, []);
};

export default useInterceptor;
