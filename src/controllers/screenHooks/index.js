import useLogin from "./Login";
import useRegister from "./Register";
import useForgot from "./Forgot";
import useAccounts from "./Accounts";
import useCategories from "./Categories"

const useScreenHooks = () => {
    return {
      useLogin,
      useRegister,
      useForgot,
      useAccounts,
      useCategories,
    };
  };
  
  export default useScreenHooks;
  