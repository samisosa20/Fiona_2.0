// Provider
import useProviders from '../../providers';

const useAccountActions = () => {
  // Providers
  const { useAccountProviders } = useProviders();
  const {
    listAccountProvider,
    createAccountProvider,
    updateAccountProvider,
    hiddenAccountProvider,
    detailAccountProvider,
    movementByAccountProvider,
    activateAccountProvider,
    balanceProvider,
    balanceMonthYearProvider,
  } = useAccountProviders();

  const actGetListAccount = async (
    onSuccess,
    onError,
  ) => {
    try {
      const response = await listAccountProvider();
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actGetDetailAccount = async (id,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await detailAccountProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actGetMovementAccount = async (id,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await movementByAccountProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };

  const actCreateAccount = async (data  ,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await createAccountProvider(data);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actEditAccount = async (id, data  ,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await updateAccountProvider(id, data);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };

  const actHiddenAccount = async (id,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await hiddenAccountProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };

  const actRecoverAccount = async (id,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await activateAccountProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actGetBalanceAccount = async (params  ,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await balanceProvider(params);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actGetBalanceMonthYearAccount = async (params  ,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await balanceMonthYearProvider(params);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };

  return {
    actGetListAccount,
    actGetDetailAccount,
    actGetMovementAccount,
    actCreateAccount,
    actEditAccount,
    actHiddenAccount,
    actRecoverAccount,
    actGetBalanceAccount,
    actGetBalanceMonthYearAccount,
  };
};

export default useAccountActions;
