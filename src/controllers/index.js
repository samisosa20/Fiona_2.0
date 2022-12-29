import useScreenHooks from "./screenHooks";
import useComponentHooks from "./componentHooks"
import useGeneralHooks from "./generalHooks"
import useLayoutHooks from "./layoutHooks"

const useControllers = () => {
  return {
    useComponentHooks,
    useScreenHooks,
    useGeneralHooks,
    useLayoutHooks,
  };
};

export default useControllers;