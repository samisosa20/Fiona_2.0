// Provider
import useProviders from '../../providers';

const useReportActions = () => {
  // Providers
  const { useReportProviders } = useProviders();
  const {
    listReportProvider,
  } = useReportProviders();

  const actGetReport = async (params,
    onSuccess,
    onError,
  ) => {
    try {
      const response = await listReportProvider(params);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };

  return {
    actGetReport,
  };
};

export default useReportActions;
