import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "./containers/notFound";
import AppliedRoute from "./components/appliedRoute";

import Home from "./containers/home";
import Login from "./containers/login";
import SignUp from "./containers/signUp";
import Profile from "./containers/profile";
import ProfileEdit from "./containers/profileEdit";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/signup" exact component={SignUp} appProps={appProps} />
      <AppliedRoute path="/profile" exact component={Profile} appProps={appProps} />
      <AppliedRoute path="/profile/edit" exact component={ProfileEdit} appProps={appProps} />
      <Route component={NotFound} />
    </Switch>
  );
}