import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import useHelpers from "../../helpers";

import useComponents from "../../views/components";

const useInterceptor = (store) => {
  const history = useHistory();
  // Helpers
  const { useQuickFunctions } = useHelpers();
  const { useToast } = useQuickFunctions();
  const { error } = useToast();

  // Components
  const { Toast } = useComponents();

  const handleRequestSuccess = (request) => {
    const state = store.getState();
    store.dispatch({ type: "LOADER_ON" });
    const { authToken } = state.session;
    // request.headers["token"] = token; // Example 1
    request.headers.authorization = `Bearer ${authToken}`; // Example 2
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

  const callErrorToast = (text = "", listOfErrors, id = "") => {
    error(<Toast text={text} listOfErrors={listOfErrors} state={"error"} />, {
      closeOnClick: true,
      toastId: id,
    });
  };

  const handleResponseError = (error) => {
    store.dispatch({ type: "LOADER_OFF" });
    switch (error.response.status) {
      case "401":
        callErrorToast(error.response.data.message, []);
        store.dispatch({ type: "LOGOUT" });
        history.push("/");
        break;
      case 400:
        return error.response;
      default:
        callErrorToast(error.response.data.message, []);
        return;
    }
  };

  useEffect(() => {
    axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}api/`;
    axios.defaults.params = {};
    axios.interceptors.request.use(handleRequestSuccess, handleRequestError);
    axios.interceptors.response.use(handleResponseSuccess, handleResponseError);
  }, []);
};

export default useInterceptor;
