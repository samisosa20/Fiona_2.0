import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useParams,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AdminLayout from "views/layouts/PrivateContent";
import AuthLayout from "views/layouts/PublicContent";

import useComponents from "views/components";

// Configuration
import useConfig from "./config";

function ValidPath() {
  const { ValidShareAccount } = useComponents();
  const { idUser, account, owner } = useParams();

  return (
    <ValidShareAccount idUSer={idUser} owner={owner} idAccount={account} />
  );
}

const App = () => {
  // Config
  const { useStoreConfig, useInterceptor } = useConfig();
  const { store, persistor } = useStoreConfig();
  useInterceptor(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          limit={10}
          pauseOnHover
          theme="colored"
        />
        <BrowserRouter>
          <Switch>
            <Route
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
            <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
            <Route path="/valid/:idUser/:account/:owner" exact>
              <ValidPath />
            </Route>
            <Redirect from="/" exact to="/auth" />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
