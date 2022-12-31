import useLogin from "./Login";
import useRegister from "./Register";
import useForgot from "./Forgot";
import useAccounts from "./Accounts";

const useScreenHooks = () => {
    return {
      useLogin,
      useRegister,
      useForgot,
      useAccounts,
    };
  };
  
  export default useScreenHooks;
  