import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, ControlLabel, FormGroup, FormControl, PageHeader } from "react-bootstrap";
import Select from 'react-select';
import "../styles/profileEdit.css";

export default function ProfileEdit(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [biography, setBiography] = useState("");
  const [college, setCollege] = useState("");
  const [major, setMajor] = useState("");
  const [skills, setSkills] = useState(null);
  const [picture, setPicture] = useState(null);
  const [resume, setResume] = useState(null);

  const [collegeList, setCollegeList] = useState([]);
  const [majorList, setMajorList] = useState([]);
  
  function validateForm() {
    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      firstName.length < 33 &&
      lastName.length < 33 &&
      biography.length < 1025
    );
  }

  useEffect(() => {
    axios.get('http://localhost:3000/user/' + props.userID)
      .then(res => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setBiography(res.data.biography);

        axios.get('http://localhost:3000/college/' + res.data.college)
          .then(res => {
            setCollege(res.data);
          })
          .catch(error => console.log(error));

        axios.get('http://localhost:3000/major/' + res.data.major)
          .then(res => {
            setMajor(res.data);
          })
          .catch(error => console.log(error));
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
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const user = {
      firstName: firstName,
      lastName: lastName,
      biography: biography,
      college: college._id,
      major: major._id
    }

    axios.post('http://localhost:3000/user/update/' + props.userID, user)
      .then(() => props.history.push("/profile"))
      .catch(error => console.log(error));
  }

  return (
    <div className="ProfileEdit">
      <form onSubmit={handleSubmit}>
        <PageHeader>
          Edit Profile
          <Button className="pull-right" bsSize="medium" disabled={!validateForm()} type="submit">
            Save
          </Button>
        </PageHeader>
        <FormGroup bsSize="large">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup bsSize="large">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup bsSize="large">
          <ControlLabel>College</ControlLabel>
          <Select
            value={{value: college, label: college.name}}
            onChange={e => setCollege(e.value)}
            options={collegeList.map((college) => ({ value: college, label: college.name }))}
          />
        </FormGroup>
        <FormGroup bsSize="large">
          <ControlLabel>Major</ControlLabel>
          <Select
            value={{value: major, label: major.name}}
            onChange={e => setMajor(e.value)}
            options={majorList.map((major) => ({ value: major, label: major.name }))}
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