import { useEffect } from "react";
import { Route, useLocation } from "react-router-dom";

import useRoute from "routes";

const useLayoutPrivate = () => {
  const { routes } = useRoute();
  const location = useLocation()

  const getRoutes = () => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            exact
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
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (
        location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    //this.refs.mainContent.scrollTop = 0;
  }, []);
  return {
    getRoutes,
    getBrandText,
    routes,
    location,
  };
};

export default useLayoutPrivate;
