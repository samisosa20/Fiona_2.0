//Packages
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const useReportProviders = () => {
  const listReportProvider = (params  ) => {
    const request = axios({
      method: 'GET',
      url: `reports`,
      params,
    });

    return trackPromise(request);
  };

  return {
    listReportProvider,
  };
};

export default useReportProviders;
