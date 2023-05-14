//Packages
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const useAccountProviders = () => {
  const listAccountProvider = () => {
    const request = axios({
      method: 'GET',
      url: `accounts`,
    });

    return trackPromise(request);
  };

  const createAccountProvider = (data) => {
    const request = axios({
      method: 'POST',
      url: `accounts`,
      data,
    });

    return trackPromise(request);
  };

  const updateAccountProvider = (id, data) => {
    const request = axios({
      method: 'PUT',
      url: `accounts/${id}`,
      data,
    });

    return trackPromise(request);
  };

  const hiddenAccountProvider = (id) => {
    const request = axios({
      method: 'DELETE',
      url: `accounts/${id}`,
    });

    return trackPromise(request);
  };
  
  const activateAccountProvider = (id) => {
    const request = axios({
      method: 'POST',
      url: `accounts/${id}/restore`,
    });

    return trackPromise(request);
  };

  const detailAccountProvider = (id) => {
    const request = axios({
      method: 'GET',
      url: `accounts/${id}`,
    });

    return trackPromise(request);
  };

  const movementByAccountProvider = (id) => {
    const request = axios({
      method: 'GET',
      url: `accounts/${id}/movements`,
    });

    return trackPromise(request);
  };
  
  const balanceProvider = (params  ) => {
    const request = axios({
      method: 'GET',
      url: `balance`,
      params
    });

    return trackPromise(request);
  };
  
  const balanceMonthYearProvider = (params  ) => {
    const request = axios({
      method: 'GET',
      url: `balance/month-year`,
      params
    });

    return trackPromise(request);
  };

  return {
    listAccountProvider,
    createAccountProvider,
    updateAccountProvider,
    hiddenAccountProvider,
    detailAccountProvider,
    movementByAccountProvider,
    activateAccountProvider,
    balanceProvider,
    balanceMonthYearProvider,
  };
};

export default useAccountProviders;
