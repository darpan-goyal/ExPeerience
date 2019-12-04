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
    axios.get('http://localhost:3000/user/' + props.userID)
      .then(res => {
        if (res.data.firstName)
          setFirstName(res.data.firstName);
        if (res.data.lastName)
          setLastName(res.data.lastName);
        if (res.data.biography)
          setBiography(res.data.biography);

        axios.get('http://localhost:3000/college/' + res.data.college)
          .then(res => { setCollege(res.data) })
          .catch(error => console.log(error));

        axios.get('http://localhost:3000/major/' + res.data.major)
          .then(res => { setMajor(res.data) })
          .catch(error => console.log(error));

        axios.post('http://localhost:3000/skill/', res.data.skills)
          .then(res => { setSkills(res.data) })
          .catch(error => console.log(error));
      })
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
  }, [props.userID]);

  function handleSubmit(event) {
    event.preventDefault();

    const user = {
      firstName: firstName,
      lastName: lastName,
    }

    if (biography)
      user.biography = biography;
    if (college)
      user.college = college;
    if (major)
      user.major = major;
    if (skills)
      user.skills = skills;

    axios.post('http://localhost:3000/user/update/' + props.userID, user)
      .then(() => props.history.push("/profile/" + props.userID))
      .catch(error => console.log(error));
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