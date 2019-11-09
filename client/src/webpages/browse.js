import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button } from "react-bootstrap";
import Select from 'react-select';

export default function Projects(props) {
  const [college, setCollege] = useState([]);
  const [majors, setMajors] = useState([]);
  const [skills, setSkills] = useState([]);

  const [projectList, setProjectList] = useState([]);
  const [collegeList, setCollegeList] = useState([]);
  const [majorList, setMajorList] = useState([]);
  const [skillList, setSkillList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/project')
      .then(res => { setProjectList(res.data) })
      .catch(error => console.log(error));

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

    console.log(college);
    console.log(majors);
    console.log(skills);
  }

  return (
    <div className="Browse">
      <form onSubmit={handleSubmit}>
        <Select
          value={college}
          options={collegeList}
          getOptionLabel = {(option)=>option.name}
          getOptionValue = {(option)=>option._id}
          onChange={e => setCollege(e)}
        />
        <Select
          isMulti
          value={majors}
          options={majorList}
          getOptionLabel = {(option)=>option.name}
          getOptionValue = {(option)=>option._id}
          onChange={e => setMajors(e)}
        />
        <Select
          isMulti
          value={skills}
          options={skillList}
          getOptionLabel = {(option)=>option.name}
          getOptionValue = {(option)=>option._id}
          onChange={e => setSkills(e)}
        />
        <Button bsStyle="primary" bsSize="large" block type="submit">
          Search
        </Button>
      </form>
    </div>
  );
}