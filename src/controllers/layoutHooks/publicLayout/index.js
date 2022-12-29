import { useEffect } from "react";
import { Route } from "react-router-dom";


import useRoute from "routes";

const useLayoutPublic = () => {

    const { routes } = useRoute()

    const getRoutes = () => {
        return routes.map((prop, key) => {
          if (prop.layout === "/auth" || prop.layout === "/admin") {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          } else {
            return null;
          }
        });
      };
      useEffect(()=>{
        document.body.classList.add("bg-default");
      },[])
    return {
        getRoutes
    }
};

export default useLayoutPublic;
