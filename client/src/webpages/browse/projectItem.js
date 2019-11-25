import React from "react";
import { Link } from "react-router-dom";
import { Button, ListGroupItem, PageHeader } from "react-bootstrap";

export default function ProjectItem(props) {
  function getCollegeName() {
    const college = props.collegeList.find(college => college._id === props.project.college);
    return (<div>{college.name}</div>);
  }

  function getMajorNames() {
    const majors = props.majorList.filter(major => props.project.majors.includes(major._id));
    return (majors.map(major => (<div>{major.name}</div>)));
  }

  function getSkillNames() {
    const skills = props.skillList.filter(skill => props.project.skills.includes(skill._id));
    return (skills.map(skill => (<div>{skill.name}</div>)));
  }

  function getCreatorName() {
    const creator = props.userList.find(user => user._id === props.project.creator);
    return (
      <div>
        <Link className="link-profile" to={"/profile/" + creator._id} target="_blank">
          <u>{creator.firstName + " " + creator.lastName}</u>
        </Link>
      </div>
    );
  }

  function getPeerNames() {
    const peers = props.userList.filter(user => props.project.peers.includes(user._id));
    return (peers.map(peer => (
      <div>
        <Link className="link-profile" to={"/profile/" + peer._id} target="_blank">
          <u>{peer.firstName + " " + peer.lastName}</u>
        </Link>
      </div>
    )));
  }

  function validate() {
    if (!props.loggedIn) {
      return true;
    }

    if (props.currentUser === props.project.creator) {
      return true;
    }

    const ownsProject = props.requestList.find(request => 
      request.project === props.project._id &&
      request.requester === props.currentUser
    );

    if (ownsProject) {
      return true;
    }

    return false;
  }

  return (
    <>
      <PageHeader className="page-header-project">
        {props.project.name}
        <Button 
          className="pull-right" 
          bsStyle="warning" 
          onClick={props.handleApply.bind(this)}
          disabled={validate()}
        >
          Apply
        </Button>
      </PageHeader>
      <ListGroupItem>
        <b>Description</b>
        <div>{props.project.description}</div>
      </ListGroupItem>
      <ListGroupItem>
        <b>College</b>
        {getCollegeName()}
      </ListGroupItem>
      <ListGroupItem>
        <b>Majors</b>
        {getMajorNames()}
      </ListGroupItem>
      <ListGroupItem>
        <b>Skills</b>
        {getSkillNames()}
      </ListGroupItem>
      <ListGroupItem>
        <b>Creator</b>
        {getCreatorName()}
      </ListGroupItem>
      <ListGroupItem>
        <b>Peers</b>
        {getPeerNames()}
      </ListGroupItem>
    </>
  );
}