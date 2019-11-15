import React from "react";
import { ListGroupItem } from "react-bootstrap";

export default function BrowseItem(props) {

  function getCollege(collegeID) {
    const college = props.collegeList.find(college => college._id === collegeID);
    return college.name;
  }

  return (
    <ListGroupItem
      header={<b>{props.project.name}</b>}
      onClick={props.onClick.bind(this, props.project)}
    >
      {getCollege(props.project.college)}
    </ListGroupItem>
  );
}