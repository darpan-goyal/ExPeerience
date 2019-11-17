import React from "react";
import { Route, Switch } from "react-router-dom";

import AppliedRoute from "./appliedRoute";

import NotFound from "../webpages/notFound";

import Home from "../webpages/home";
import Login from "../webpages/login";
import SignUp from "../webpages/signUp";
import Profile from "../webpages/profile/profile";
import ProfileEdit from "../webpages/profile/profileEdit";
import Projects from "../webpages/projects/projects";
import ProjectsEdit from "../webpages/projects/projectsEdit";
import ProjectsCreate from "../webpages/projects/projectsCreate";
import Browse from "../webpages/browse/browse";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/signup" exact component={SignUp} appProps={appProps} />
      <AppliedRoute path="/profile/:userID" exact component={Profile} appProps={appProps} />
      <AppliedRoute path="/profile/edit/:userID" exact component={ProfileEdit} appProps={appProps} />
      <AppliedRoute path="/projects" exact component={Projects} appProps={appProps} />
      <AppliedRoute path="/projects/edit" exact component = {ProjectsEdit} appProps={appProps} />
      <AppliedRoute path="/projects/create" exact component = {ProjectsCreate} appProps={appProps} />
      <AppliedRoute path="/browse" exact component = {Browse} appProps={appProps} />
      <Route component={NotFound} />
    </Switch>
  );
}
