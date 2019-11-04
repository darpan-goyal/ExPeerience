import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button } from "react-bootstrap";
import Select from 'react-select';

export default function Projects(props) {
  const [colleges, setColleges] = useState([]);
  const [majors, setMajors] = useState([]);
  const [skills, setSkills] = useState([]);

  const [projectList, setProjectList] = useState([]);
  const [collegeList, setCollegeList] = useState([]);
  const [majorList, setMajorList] = useState([]);
  const [skillList, setSkillList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/project')
      .then(res => {
        setProjectList(res.data);
      })
      .catch(error => console.log(error));

    axios.get('http://localhost:3000/college')
      .then(res => {
        setCollegeList(res.data);
      })
      .catch(error => console.log(error));
      
    axios.get('http://localhost:3000/major')
      .then(res => {
        setMajorList(res.data);
      })
      .catch(error => console.log(error));

    axios.get('http://localhost:3000/skill')
      .then(res => {
        setSkillList(res.data);
      })
      .catch(error => console.log(error));
  }, []); 

  function handleSubmit(event) {
    event.preventDefault();

    alert("hello");
  }

  return (
    <div className="Browse">
      <form onSubmit={handleSubmit}>
        <Select
          isMulti
          value={colleges}
          onChange={e => setColleges(e)}
          options={collegeList.map((college) => ({ value: college._id, label: college.name }))}
        />
        <Select
          isMulti
          value={majors}
          onChange={e => setMajors(e)}
          options={majorList.map((major) => ({ value: major._id, label: major.name }))}
        />
        <Select
          isMulti
          value={skills}
          onChange={e => setSkills(e)}
          options={skillList.map((skill) => ({ value: skill._id, label: skill.name }))}
        />
        <Button bsStyle="primary" bsSize="large" block type="submit">
          Search
        </Button>
      </form>
    </div>
  );
}