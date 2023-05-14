//Packages
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const useCategoryProviders = () => {
  const listCategoryProvider = (params  ) => {
    const request = axios({
      method: 'GET',
      url: `categories`,
      params
    });

    return trackPromise(request);
  };

  const createCategoryProvider = (data) => {
    const request = axios({
      method: 'POST',
      url: `categories`,
      data,
    });

    return trackPromise(request);
  };

  const updateCategoryProvider = (id, data) => {
    const request = axios({
      method: 'PUT',
      url: `categories/${id}`,
      data,
    });

    return trackPromise(request);
  };

  const hiddenCategoryProvider = (id) => {
    const request = axios({
      method: 'DELETE',
      url: `categories/${id}`,
    });

    return trackPromise(request);
  };

  const detailCategoryProvider = (id) => {
    const request = axios({
      method: 'GET',
      url: `categories/${id}`,
    });

    return trackPromise(request);
  };
  
  const listFieldCategoryProvider = () => {
    const request = axios({
      method: 'GET',
      url: `list/categories`,
    });

    return trackPromise(request);
  };

  const activateCategoryProvider = (id) => {
    const request = axios({
      method: 'POST',
      url: `categories/${id}/restore`,
    });

    return trackPromise(request);
  };

  return {
    listCategoryProvider,
    createCategoryProvider,
    updateCategoryProvider,
    hiddenCategoryProvider,
    detailCategoryProvider,
    activateCategoryProvider,
    listFieldCategoryProvider,
  };
};

export default useCategoryProviders;
