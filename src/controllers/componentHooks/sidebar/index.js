import { useState, useEffect } from "react";
import { NavLink as NavLinkRRD, Link, useLocation } from "react-router-dom";

// Components
import { NavItem, NavLink } from "reactstrap";

const useSidebar = (props) => {
  const { logo } = props;
  const location = useLocation();
  const [navbarBrandProps, setNavbarBrandProps] = useState(null);
  const [state, setState] = useState({
    collapseOpen: false,
  });

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  useEffect(() => {
    activeRoute("");
    if (logo && logo.innerLink) {
      setNavbarBrandProps({
        to: logo.innerLink,
        tag: Link,
      });
    } else if (logo && logo.outterLink) {
      setNavbarBrandProps({
        href: logo.outterLink,
        target: "_blank",
      });
    }
     
  }, [logo]);

  const toggleCollapse = () => {
    setState({
      collapseOpen: !state.collapseOpen,
    });
  };

  const closeCollapse = () => {
    setState({
      collapseOpen: false,
    });
  };

  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.sidebar === true) {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
              activeClassName="active"
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>
        );
      } else {
        return null;
      }
    });
  };
  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return {
    state,
    navbarBrandProps,
    logout,
    toggleCollapse,
    createLinks,
  };
};

export default useSidebar;
