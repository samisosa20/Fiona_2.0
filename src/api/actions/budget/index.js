// Provider
import useProviders from '../../providers';

const useBudgetActions = () => {
  // Providers
  const { useBudgetProviders } = useProviders();
  const {
    listBudgetProvider,
    createBudgetProvider,
    updateBudgetProvider,
    hiddenBudgetProvider,
    detailBudgetProvider,
  } = useBudgetProviders();

  const actGetListBudget = async (
    onSuccess,
    onError,
  ) => {
    try {
      const response = await listBudgetProvider();
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actGetDetailBudget = async (id,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await detailBudgetProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };

  const actCreateBudget = async (data  ,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await createBudgetProvider(data);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actEditBudget = async (id, data  ,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await updateBudgetProvider(id, data);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };

  const actDeleteBudget = async (id,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await hiddenBudgetProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };

  return {
    actGetListBudget,
    actGetDetailBudget,
    actCreateBudget,
    actEditBudget,
    actDeleteBudget,
  };
};

export default useBudgetActions;
