import React from "react";
import { Link } from "react-router-dom";
import { Button, ListGroupItem } from "react-bootstrap";

export default function RequestItem(props) {
  function getProject() {
    const project = props.projectList.find(project => project._id === props.request.project);
    return project;
  }

  function getRequester() {
    const requester = props.userList.find(user => user._id === props.request.requester);
    return (
      <Link className = "link-profile" to={"/profile/" + requester._id} target="_blank">
        <b>{requester.firstName + " " + requester.lastName}</b>
      </Link>
    )
  }

  return (
    <>
      <ListGroupItem>
        <Button 
          className="btn-reject pull-right" 
          bsStyle="danger" 
          onClick={props.handleReject.bind(this, props.request)}
        >
          reject
        </Button>
        <Button 
          className="btn-accept pull-right" 
          bsStyle="success"
          onClick={props.handleAccept.bind(this, props.request)}
        >
          accept
        </Button>
        <div>{getRequester()}</div>
        {getProject().name}
      </ListGroupItem>
    </>
  );
}