import React from "react";
import { Link } from "react-router-dom";
import { ListGroupItem } from "react-bootstrap";

export default function RequestItem(props) {
  function getProject() {
    const project = props.projectList.find(project => project._id === props.request.project);
    return project;
  }

  function getRequester() {
    const requester = props.userList.find(user => user._id === props.request.requester);
    return (
      <Link className = "link-profile" to={"/profile/" + requester._id} target="_blank">
        <h3>{requester.firstName + " " + requester.lastName}</h3>
      </Link>
    )
  }

  return (
    <ListGroupItem
      header={getRequester()}
      onClick={props.onClick.bind(this, getProject())}
    >
      {getProject().name}
    </ListGroupItem>
  );
}