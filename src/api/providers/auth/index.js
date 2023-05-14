//Packages
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const useLoginProviders = () => {
  const loginProvider = (data) => {
    const request = axios({
      method: 'POST',
      url: `login`,
      data,
    });

    return trackPromise(request);
  };

  const registerProvider = (data) => {
    const request = axios({
      method: 'POST',
      url: `register`,
      data,
    });

    return trackPromise(request);
  };

  const editProfileProvider = (data) => {
    const request = axios({
      method: 'PUT',
      url: `profile`,
      data,
    });

    return trackPromise(request);
  };

  const logoutProvider = () => {
    const request = axios({
      method: 'POST',
      url: `logout`,
    });

    return trackPromise(request);
  };

  return { loginProvider, registerProvider, logoutProvider, editProfileProvider };
};

export default useLoginProviders;
