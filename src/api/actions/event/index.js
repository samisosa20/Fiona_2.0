// Provider
import useProviders from '../../providers';

const useEventActions = () => {
  // Providers
  const { useEventProviders } = useProviders();
  const {
    listActiveEventProvider,
    listEventProvider,
    createEventProvider,
    updateEventProvider,
    hiddenEventProvider,
    detailEventProvider,
  } = useEventProviders();

  const actGetListEvent = async (
    onSuccess,
    onError,
  ) => {
    try {
      const response = await listEventProvider();
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actGetDetailEvent = async (id,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await detailEventProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };

  const actCreateEvent = async (data  ,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await createEventProvider(data);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actEditEvent = async (id, data  ,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await updateEventProvider(id, data);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };

  const actDeleteEvent = async (id,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await hiddenEventProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };

  const actGetListActiveEvent = async (
    onSuccess,
    onError,
  ) => {
    try {
      const response = await listActiveEventProvider();
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };

  return {
    actGetListEvent,
    actGetDetailEvent,
    actCreateEvent,
    actEditEvent,
    actDeleteEvent,
    actGetListActiveEvent,
  };
};

export default useEventActions;
