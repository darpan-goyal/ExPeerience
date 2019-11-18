import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, ControlLabel, FormGroup, FormControl, HelpBlock, PageHeader } from "react-bootstrap";
import Select from 'react-select';
import "../../styles/profileEdit.css";

export default function ProfileEdit(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [biography, setBiography] = useState("");
  const [college, setCollege] = useState("");
  const [major, setMajor] = useState("");
  const [skills, setSkills] = useState([]);
  //const [picture, setPicture] = useState("");
  //const [resume, setResume] = useState("");

  const [collegeList, setCollegeList] = useState([]);
  const [majorList, setMajorList] = useState([]);
  const [skillList, setSkillList] = useState([]);

  const [loading, setLoading] = useState(true);
  
  function validateForm() {
    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      firstName.length <= 50 &&
      lastName.length <= 50
    );
  }

  function validate(field, max) {
    if (field.length > max) return "error";
    if (field.length <= 0) return "error";
    return null;
  }

  useEffect(() => {
    axios.all([
      axios.get('http://localhost:3000/college'),
      axios.get('http://localhost:3000/major'),
      axios.get('http://localhost:3000/skill'),
      axios.get('http://localhost:3000/user/' + props.userID),
    ])
    .then(res => {
      setCollegeList(res[0].data);
      setMajorList(res[1].data);
      setSkillList(res[2].data);

      if (res[3].data.firstName)
        setFirstName(res[3].data.firstName);
      if (res[3].data.lastName)
        setLastName(res[3].data.lastName);
      if (res[3].data.biography)
        setBiography(res[3].data.biography);

      axios.all([
        axios.get('http://localhost:3000/college/' + res[3].data.college),
        axios.get('http://localhost:3000/major/' + res[3].data.major),
        axios.post('http://localhost:3000/skill/', res[3].data.skills)
      ])
      .then(res => {
        setCollege(res[0].data);
        setMajor(res[1].data);
        setSkills(res[2].data);
        setLoading(false);
      })
      .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
  }, [props.userID]);

  function handleSubmit(event) {
    event.preventDefault();

    const user = {
      firstName: firstName,
      lastName: lastName,
      biography: biography,
      college: college,
      major: major,
      skills: skills
    }

    axios.post('http://localhost:3000/user/update/' + props.userID, user)
      .then(() => props.history.push("/profile/" + props.userID))
      .catch(error => console.log(error));
  }

  if (loading) {
    return null;
  }

  return (
    <div className="ProfileEdit">
      <form onSubmit={handleSubmit}>
        <PageHeader>
          Edit Profile
          <Button className="pull-right" bsStyle="primary" disabled={!validateForm()} type="submit">
            Save
          </Button>
        </PageHeader>
        <FormGroup bsSize="large" validationState={validate(firstName, 50)}>
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <FormControl.Feedback />
          <HelpBlock>Required field</HelpBlock>
        </FormGroup>
        <FormGroup bsSize="large" validationState={validate(lastName, 50)}>
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <FormControl.Feedback />
          <HelpBlock>Required field</HelpBlock>
        </FormGroup>
        <FormGroup bsSize="large">
          <ControlLabel>College</ControlLabel>
          <Select
            isClearable
            placeholder=""
            value={college}
            options={collegeList}
            getOptionLabel = {(option)=>option.name}
            getOptionValue = {(option)=>option._id}
            onChange={e => setCollege(e)}
          />
        </FormGroup>
        <FormGroup bsSize="large">
          <ControlLabel>Major</ControlLabel>
          <Select
            isClearable
            placeholder=""
            value={major}
            options={majorList}
            getOptionLabel = {(option)=>option.name}
            getOptionValue = {(option)=>option._id}
            onChange={e => setMajor(e)}
          />
        </FormGroup>
        <FormGroup bsSize="large">
          <ControlLabel>Skills</ControlLabel>
          <Select
            isMulti
            placeholder=""
            value={skills}
            options={skillList}
            getOptionLabel = {(option)=>option.name}
            getOptionValue = {(option)=>option._id}
            onChange={e => setSkills(e)}
          />
        </FormGroup>
        <FormGroup bsSize="large">
          <ControlLabel>Biography</ControlLabel>
          <FormControl
            componentClass="textarea"
            value={biography}
            onChange={e => setBiography(e.target.value)}
          />
        </FormGroup>
        <FormGroup bsSize="large">
          <ControlLabel>Picture</ControlLabel>
          <FormControl
            type="file"
          />
        </FormGroup>
        <FormGroup bsSize="large">
          <ControlLabel>Resume</ControlLabel>
          <FormControl
            type="file"
          />
        </FormGroup>
      </form>
    </div>
  );
}