import React, { useState, useEffect } from "react";
import axios from 'axios';
import { PageHeader } from "react-bootstrap";

export default function Projects(props) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [skills, setSkills] = useState([]);

  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/project')
      .then(res => {
        setProjectList(res.data);
      })
      .catch(error => console.log(error));
  });   

  return (
    <div className="Browse">
      <PageHeader>
        Browse
      </PageHeader>
    </div>
  );
}