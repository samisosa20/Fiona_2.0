import { useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import { matchPath } from "react-router"

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
    const currentRoute = routes.find(
      route => matchPath({path: route.layout + route.path}, location.pathname)
      )
    return currentRoute.name;
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
