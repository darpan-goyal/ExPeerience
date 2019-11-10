import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, ListGroup, ListGroupItem, PageHeader } from "react-bootstrap";
import Select from 'react-select';
import "../styles/browse.css";

export default function Projects(props) {
  const [college, setCollege] = useState(null);
  const [major, setMajor] = useState(null);
  const [skills, setSkills] = useState(null);

  const [collegeList, setCollegeList] = useState([]);
  const [majorList, setMajorList] = useState([]);
  const [skillList, setSkillList] = useState([]);

  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/college')
      .then(res => { setCollegeList(res.data) })
      .catch(error => console.log(error));
      
    axios.get('http://localhost:3000/major')
      .then(res => { setMajorList(res.data) })
      .catch(error => console.log(error));
      
    axios.get('http://localhost:3000/skill')
      .then(res => { setSkillList(res.data) })
      .catch(error => console.log(error));
  }, []); 

  function handleSubmit(event) {
    event.preventDefault();

    const searchData = {
      college: college,
      major: major,
      skills: skills
    };

    axios.post('http://localhost:3000/project/search', searchData)
      .then(res=> { setProjectList(res.data) })
      .catch(error => console.log(error));
  }

  return (
    <div className="Browse">
      <form onSubmit={handleSubmit}>
        <PageHeader>
          Browse
        </PageHeader>
        <Select className="select"
          isClearable
          value={college}
          options={collegeList}
          getOptionLabel = {(option)=>option.name}
          getOptionValue = {(option)=>option._id}
          onChange={e => setCollege(e)}
        />
        <Select className="select"
          isClearable
          value={major}
          options={majorList}
          getOptionLabel = {(option)=>option.name}
          getOptionValue = {(option)=>option._id}
          onChange={e => setMajor(e)}
        />
        <Select className="select"
          isMulti
          value={skills}
          options={skillList}
          getOptionLabel = {(option)=>option.name}
          getOptionValue = {(option)=>option._id}
          onChange={e => setSkills(e)}
        />
        <Button bsStyle="success" bsSize="large" block type="submit">
          Search
        </Button>
      </form>
      <ListGroup>
        {projectList.map(project => <ListGroupItem onClick={() => console.log(project._id)}>{project.name}</ListGroupItem>)}
      </ListGroup>
    </div>
  );
}