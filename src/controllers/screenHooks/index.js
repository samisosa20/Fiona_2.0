import useLogin from "./Login";
import useRegister from "./Register";
import useForgot from "./Forgot";

const useScreenHooks = () => {
    return {
      useLogin,
      useRegister,
      useForgot,
    };
  };
  
  export default useScreenHooks;
  