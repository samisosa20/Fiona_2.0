import useLogin from "./Login";
import useRegister from "./Register";
import useForgot from "./Forgot";
import useAccounts from "./Accounts";
import useCategories from "./Categories"
import useBudget from "./Budget"
import useBudgetCreate from "./Budget/Create"
import useBudgetView from "./Budget/View"
import useBudgetReport from "./Budget/Report"

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
    };
  };
  
  export default useScreenHooks;
  