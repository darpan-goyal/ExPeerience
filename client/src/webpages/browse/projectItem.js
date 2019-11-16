import React from "react";
import { ListGroupItem } from "react-bootstrap";

export default function ProjectItem(props) {
  function getCollegeName() {
    const college = props.collegeList.find(college => college._id === props.project.college);
    return (<div>{college.name}</div>);
  }

  function getMajorNames() {
    const majorNames = props.majorList.filter(major => props.project.majors.includes(major._id));
    return (majorNames.map(major => (<div>{major.name}</div>)));
  }

  function getSkillNames() {
    const skillNames = props.skillList.filter(skill => props.project.skills.includes(skill._id));
    return (skillNames.map(skill => (<div>{skill.name}</div>)));
  }

  function getCreatorName() {
    const creator = props.userList.find(user => user._id === props.project.creator);
    return (<div>{creator.firstName + " " + creator.lastName}</div>);
  }

  function getPeerNames() {
    const peerNames = props.userList.filter(user => props.project.peers.includes(user._id));
    return (peerNames.map(peer =>(<div>{peer.firstName + " " + peer.lastName}</div>)));
  }

  return (
    <>
      <ListGroupItem>
        <h3><b>{props.project.name}</b></h3>
      </ListGroupItem>
      <ListGroupItem>
        <b>Description</b>
        <p>{props.project.description}</p>
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