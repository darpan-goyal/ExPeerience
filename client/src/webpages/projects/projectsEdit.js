import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, ControlLabel, FormGroup, FormControl, PageHeader } from "react-bootstrap";
import Select from 'react-select';
import "../../styles/projectsCreate.css";

export default function ProjectsEdit(props) {
  const [name, setName] = useState(props.location.data[0].name);
  const [college, setCollege] = useState('');
  const [majors, setMajors] = useState([]);
  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState(props.location.data[0].description);
  const [peers, setPeers] = useState(props.location.data[0].peers);
  // Drop down menu lists
  var [collegeOptions, setCollegeOptions] = useState([]);
  var [majorOptions, setMajorOptions] = useState([]);
  var [skillOptions, setSkillOptions] = useState([]);
  var [peerOptions, setPeerOptions] = useState([]);
  
  function validateForm() {
    return (
      name.length > 3 &&
      name.length <= 32
    );
  }

  useEffect(() => {
    axios.get('http://localhost:3000/college')
      .then(res => {
        res.data.forEach(c => collegeOptions.push({label:c.name, value:c._id}));
        setCollege(collegeOptions.filter(c => c.value === props.location.data[0].college));
      })
      .catch(error => console.log(error));

    axios.get('http://localhost:3000/major')
      .then(res => {
        res.data.forEach(m => majorOptions.push({label:m.name, value:m._id}));
        var result = [];
        for(var i = 0; i < props.location.data[0].majors.length; i++) {
          result = result.concat(majorOptions.filter(
            m => m.value === props.location.data[0].majors[i]));
        }
        setMajors(result);
      })
      .catch(error => console.log(error));
    
    axios.get('http://localhost:3000/skill')
      .then(res => {
        res.data.forEach(s => skillOptions.push({label:s.name, value:s._id}));
        var result = [];
        for(var i = 0; i < props.location.data[0].skills.length; i++) {
          result = result.concat(skillOptions.filter(
            s => s.value === props.location.data[0].skills[i]));
        }
        setSkills(result);
      })
      .catch(error => console.log(error));

    axios.get('http://localhost:3000/user')
      .then(res => {
        res.data.forEach(u => peerOptions.push({label: (u.firstName + " " + u.lastName), value: u._id}))
        var result = [];
        for(var i = 0; i < props.location.data[0].peers.length; i++) {
          result = result.concat(peerOptions.filter(
            p => p.value === props.location.data[0].peers[i]));
        }
        setPeers(result);
      })
      .catch(error => console.log(error));
  }, []);

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

    if (majors)
      majors.forEach(m => project.majors.push(m.value));
    if (skills)
      skills.forEach(s => project.skills.push(s.value));
    if (peers)
      peers.forEach(p => props.userID !== p.value ? project.peers.push(p.value) : {});

    axios.post('http://localhost:3000/project/update/' + props.location.data[0]._id, project)
      .then(() => props.history.push("/projects"))
      .catch(error => console.log(error));
  }

  return (
    <div className="ProjectsCreate">
      <form onSubmit={handleSubmit}>
        <PageHeader>
          Edit Project
          <Button className="pull-right" bsStyle="primary" bsSize="medium" disabled={!validateForm()} type="submit">
            Save
          </Button>
        </PageHeader>
        <FormGroup bsSize="large">
          <ControlLabel>Project Name</ControlLabel>
          <FormControl
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup bsSize="large">
          <ControlLabel>College</ControlLabel>
          <Select
            value={college}
            options={collegeOptions}
            onChange={e => setCollege(e)}
          />
        </FormGroup>
        <FormGroup bsSize="large">
          <ControlLabel>Majors</ControlLabel>
          <Select
            isMulti
            value={majors}
            options={majorOptions}
            onChange={e => setMajors(e)}
          />
        </FormGroup>
        <FormGroup bsSize="large">
          <ControlLabel>Skills</ControlLabel>
          <Select
            isMulti
            value={skills}
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
        <FormGroup bsSize="large">
          <ControlLabel>Peers</ControlLabel>
          <Select
            isMulti
            value={peers}
            options={peerOptions}
            onChange={e => setPeers(e)}
          />
        </FormGroup>
      </form>
    </div>
  );
}