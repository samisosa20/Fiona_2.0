import useLogin from "./Login";
import useRegister from "./Register";
import useForgot from "./Forgot";
import useAccounts from "./Accounts";
import useCategories from "./Categories";
import useBudget from "./Budget";
import useBudgetCreate from "./Budget/Create";
import useBudgetView from "./Budget/View";
import useBudgetReport from "./Budget/Report";
import useMovements from "./Movements";
import useReport from "./Report";
import useEvent from "./Events";
import usePlanned from "./Planned";
import useProfile from "./Profile";
import useHeritages from "./Heritages";
import useHeritagesDetail from "./Heritages/Detail";

const useScreenHooks = () => {
  return {
    useLogin,
    useRegister,
    useForgot,
    useAccounts,
    useCategories,
    useBudget,
    useBudgetCreate,
    useBudgetView,
    useBudgetReport,
    useMovements,
    useReport,
    useEvent,
    usePlanned,
    useProfile,
    useHeritages,
    useHeritagesDetail,
  };
};

export default useScreenHooks;
