import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect, useParams } from "react-router-dom"; // para navegar entre paginas

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/css/sammy-react.scss";
import "./index.css"

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import ValidShareAccount from "views/examples/ValidShare.js";
import Account from "views/examples/Acount";


function ValidPath() {
  // We can call useParams() here to get the params,
  // or in any child element as well!
  let { idUser, account, owner } = useParams()
  return <ValidShareAccount idUSer={idUser} owner={owner} idAccount={account} />
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/valid/:idUser/:account/:owner" exact>
        <ValidPath/>
      </Route>
      <Redirect from="/" exact to="/auth" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
