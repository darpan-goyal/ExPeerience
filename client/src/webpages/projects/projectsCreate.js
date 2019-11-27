import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, ControlLabel, FormGroup, FormControl, PageHeader } from "react-bootstrap";
import "../../styles/projectsCreate.css";
import Select from 'react-select';

export default function ProjectsCreate(props) {
  const [name, setProjectName] = useState("");
  const [college, setCollege] = useState("");
  const [majors, setMajors] = useState([]);
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  // This garbage is used to populate the dropdown menus
  const [collegeList, setCollegeList] = useState([]);
  var collegeOptions = [];
  collegeList.forEach(m => collegeOptions.push({label:m.name, value:m._id}));
  const [majorList, setMajorList] = useState([]);
  var majorOptions = [];
  majorList.forEach(m => majorOptions.push({label:m.name, value:m._id}));
  const [skillList, setSkillList] = useState([]);
  var skillOptions = [];
  skillList.forEach(m => skillOptions.push({label:m.name, value:m._id}));

  const [isLoading, hasLoaded] = useState(true);
  
  function validateForm() {
    return (
      name.length > 3 &&
      name.length <= 32 &&
      college.value != undefined
    );
  }

  useEffect(() => {
    if (isLoading) {
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
      
      hasLoaded(false);
    }
  }, [isLoading]);

  function handleSubmit(event) {
    event.preventDefault();
    const project = {
      name: name,
      college: college.value,
      majors: [],
      description: description,
      skills: [],
      creator: props.userID,
      peers: [props.userID],
    }

    majors.forEach(m => project.majors.push(m.value));
    skills.forEach(s => project.skills.push(s.value));

    axios.post('http://localhost:3000/project/add', project)
      .then(() => props.history.push("/projects"))
      .catch(error => console.log(error));
  }

  return (
    <div className="ProjectsCreate">
      <form onSubmit={handleSubmit}>
        <PageHeader>
          Create Project
          <Button className="pull-right" bsStyle="primary" disabled={!validateForm()} type="submit">
            Create
          </Button>
        </PageHeader>
        <FormGroup bsSize="large">
          <ControlLabel>Project Name</ControlLabel>
          <FormControl
            value={name}
            onChange={e => setProjectName(e.target.value)}
          />
        </FormGroup>
        <FormGroup bsSize="large">
          <ControlLabel>College</ControlLabel>
          <Select
            name="college"
            options={collegeOptions}
            onChange={e => setCollege(e)}
          />

        </FormGroup>
        <FormGroup bsSize="large">
          <ControlLabel>Majors</ControlLabel>
          <Select
            isMulti
            options={majorOptions}
            onChange={e => setMajors(e)}
          />
        </FormGroup>
        <FormGroup bsSize="large">
          <ControlLabel>Skills</ControlLabel>
          <Select
            isMulti
            options={skillOptions}
            onChange={e => setSkills(e)}
          />
        </FormGroup>
        <FormGroup bsSize="large">
          <ControlLabel>Description</ControlLabel>
          <FormControl
            componentClass="textarea"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </FormGroup>
      </form>
    </div>
  );
}