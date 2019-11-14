import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ListGroupItem } from "react-bootstrap";
import "../../styles/browse.css";

export default function BrowseItem(props) {
  const [college, setCollege] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/college/' + props.project.college)
      .then(res => {
        setCollege(res.data.name);
        setLoading(false);
      })
      .catch(error => console.log(error));
  });

  if (loading) {
    return null;
  }

  return (
    <ListGroupItem 
      header={<b>{props.project.name}</b>}
      onClick={props.onClick.bind(this, props.project)}
    >
      {college}
    </ListGroupItem>
  );
}