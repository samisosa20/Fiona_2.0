import useLayoutPublic from "./publicLayout"
import useLayoutPrivate from "./privateLayout"

const useLayoutHooks = () => {
    return {
      useLayoutPublic,
      useLayoutPrivate,
    };
  };
  
  export default useLayoutHooks;
  