//Packages
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const useMovementProviders = () => {
  const listMovementProvider = () => {
    const request = axios({
      method: 'GET',
      url: `movements`,
    });

    return trackPromise(request);
  };

  const createMovementProvider = (data) => {
    const request = axios({
      method: 'POST',
      url: `movements`,
      data,
    });

    return trackPromise(request);
  };

  const updateMovementProvider = (id, data) => {
    const request = axios({
      method: 'PUT',
      url: `movements/${id}`,
      data,
    });

    return trackPromise(request);
  };

  const deleteMovementProvider = (id) => {
    const request = axios({
      method: 'DELETE',
      url: `movements/${id}`,
    });

    return trackPromise(request);
  };

  const detailMovementProvider = (id) => {
    const request = axios({
      method: 'GET',
      url: `movements/${id}`,
    });

    return trackPromise(request);
  };

  return {
    listMovementProvider,
    createMovementProvider,
    updateMovementProvider,
    deleteMovementProvider,
    detailMovementProvider,
  };
};

export default useMovementProviders;
