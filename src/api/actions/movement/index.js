// Provider
import useProviders from '../../providers';

const useMovementActions = () => {
  // Providers
  const { useMovementProviders } = useProviders();
  const {
    listMovementProvider,
    createMovementProvider,
    updateMovementProvider,
    deleteMovementProvider,
    detailMovementProvider,
  } = useMovementProviders();

  const actGetListMovement = async (
    onSuccess,
    onError,
  ) => {
    try {
      const response = await listMovementProvider();
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actGetDetailMovement = async (id,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await detailMovementProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actDeleteMovement = async (id,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await deleteMovementProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actCreateMovement = async (data  ,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await createMovementProvider(data);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actEditMovement = async (id, data  ,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await updateMovementProvider(id, data);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };

  return {
    actGetListMovement,
    actGetDetailMovement,
    actCreateMovement,
    actEditMovement,
    actDeleteMovement,
  };
};

export default useMovementActions;
