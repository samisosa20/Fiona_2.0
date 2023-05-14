// Provider
import useProviders from '../../providers';

const usePaymentActions = () => {
  // Providers
  const { usePaymentProviders } = useProviders();
  const {
    listPaymentProvider,
    createPaymentProvider,
    updatePaymentProvider,
    hiddenPaymentProvider,
    detailPaymentProvider,
  } = usePaymentProviders();

  const actGetListPayment = async (
    onSuccess,
    onError,
  ) => {
    try {
      const response = await listPaymentProvider();
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actGetDetailPayment = async (id,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await detailPaymentProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };

  const actCreatePayment = async (data  ,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await createPaymentProvider(data);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actEditPayment = async (id, data  ,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await updatePaymentProvider(id, data);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };

  const actDeletePayment = async (id,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await hiddenPaymentProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };

  return {
    actGetListPayment,
    actGetDetailPayment,
    actCreatePayment,
    actEditPayment,
    actDeletePayment,
  };
};

export default usePaymentActions;
