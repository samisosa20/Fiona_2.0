//Packages
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const useHeritageProviders = () => {
  const listHeritageProvider = (year) => {
    const request = axios({
      method: 'GET',
      url: `heritages`,
      params: {
        year,
      },
    });

    return trackPromise(request);
  };

  const createHeritageProvider = (data) => {
    const request = axios({
      method: 'POST',
      url: `heritages`,
      data,
    });

    return trackPromise(request);
  };

  const updateHeritageProvider = (id, data) => {
    const request = axios({
      method: 'PUT',
      url: `heritages/${id}`,
      data,
    });

    return trackPromise(request);
  };

  const hiddenHeritageProvider = (id) => {
    const request = axios({
      method: 'DELETE',
      url: `heritages/${id}`,
    });

    return trackPromise(request);
  };

  const detailHeritageProvider = (id) => {
    const request = axios({
      method: 'GET',
      url: `heritages/${id}`,
    });

    return trackPromise(request);
  };
  
  const consolidateHeritageProvider = () => {
    const request = axios({
      method: 'GET',
      url: `consolidate/heritages`,
    });

    return trackPromise(request);
  };

  return {
    listHeritageProvider,
    createHeritageProvider,
    updateHeritageProvider,
    hiddenHeritageProvider,
    detailHeritageProvider,
    consolidateHeritageProvider,
  };
};

export default useHeritageProviders;
