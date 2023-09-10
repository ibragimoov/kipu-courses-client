import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

import store from "store";
import { Provider } from "react-redux";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <Route path={`/auth`} component={AuthLayout} />
                <Route path={`/admin`} component={AdminLayout} />
                <Route path={`/rtl`} component={RTLLayout} />
                <Redirect from={`/`} to="/admin/dashboard" />
            </Switch>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
