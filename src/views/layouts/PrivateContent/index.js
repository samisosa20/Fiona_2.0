import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { Container } from "reactstrap";

// components
import useComponents from "views/components";
import AdminNavbar from "views/components/Navbars/AdminNavbar.js";

import imgLogo from "assets/img/brand/argon-react.png";

// Controllers
import useControllers from "controllers";

const Admin = (props) => {
  // Controllers
  const { useLayoutHooks } = useControllers();
  const { useLayoutPrivate } = useLayoutHooks();
  const { getRoutes, getBrandText, routes } = useLayoutPrivate();

  // Components
  const {Footers, Sidebar} = useComponents()
  const {AdminFooter} = Footers()

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/Acount",
          imgSrc: imgLogo,
          imgAlt: "...",
        }}
      />
      <div className="main-content" /* ref="mainContent" */>
        <AdminNavbar
          {...props}
          brandText={getBrandText()}
        />
        <Switch>
          {getRoutes()}
          <Redirect from="*" to="/admin/Acount" />
        </Switch>

        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
