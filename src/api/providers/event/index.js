//Packages
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const useEventProviders = () => {
  const listActiveEventProvider = () => {
    const request = axios({
      method: 'GET',
      url: `active/events`,
    });

    return trackPromise(request);
  };

  const listEventProvider = () => {
    const request = axios({
      method: 'GET',
      url: `events`,
    });

    return trackPromise(request);
  };

  const createEventProvider = (data) => {
    const request = axios({
      method: 'POST',
      url: `events`,
      data,
    });

    return trackPromise(request);
  };

  const updateEventProvider = (id, data) => {
    const request = axios({
      method: 'PUT',
      url: `events/${id}`,
      data,
    });

    return trackPromise(request);
  };

  const hiddenEventProvider = (id) => {
    const request = axios({
      method: 'DELETE',
      url: `events/${id}`,
    });

    return trackPromise(request);
  };

  const detailEventProvider = (id) => {
    const request = axios({
      method: 'GET',
      url: `events/${id}`,
    });

    return trackPromise(request);
  };

  return {
    listActiveEventProvider,
    listEventProvider,
    createEventProvider,
    updateEventProvider,
    hiddenEventProvider,
    detailEventProvider,
  };
};

export default useEventProviders;
