import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Media, PageHeader, Tab, Tabs } from "react-bootstrap";
import "./profile.css";



export default function Profile(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [biography, setBiography] = useState("");
  const [college, setCollege] = useState("");
  const [major, setMajor] = useState("");
  const [skills, setSkills] = useState([]);
  const [picture, setPicture] = useState("/profile/profile.png");
  const [resume, setResume] = useState("public/FergusonResume102019.pdf");


  useEffect(() => {
    axios.get('http://localhost:3000/user/' + props.userID)
      .then(res => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setBiography(res.data.biography);
        setCollege(res.data.college);
        setMajor(res.data.major);
        setSkills(res.data.skills);
        setPicture(res.data.picture);
        setResume(res.data.resume);
      })
      .catch(error => console.log(error));
  });

  function editProfile() {
    props.history.push("/profile/edit")
  }

  return (
    <div className="Profile">
      <PageHeader>
        Profile
        <Button className="pull-right" bsSize="medium" type="submit" onClick={editProfile} >
          Edit
        </Button>
      </PageHeader>
      <Media>
        <Media.Left>
          <img width={150} height={150} src={picture} alt="profilePicture"/>
        </Media.Left>
        <Media.Body>
          <Media.Heading>{firstName} {lastName}</Media.Heading>
          <h4>{college}</h4>
          <h4>{major}</h4>
        </Media.Body>
      </Media>
      <Tabs animation={false}>
        <Tab eventKey={1} title="About">
          <p>{biography}</p>
        </Tab>
        <Tab eventKey={2} title="Skills">
          <br></br>
          <li><a class="tag">Java</a></li>
          <li><a class="tag">Python</a></li>
          <li><a class="tag">JavaScript</a></li>
            
        </Tab>
        <Tab eventKey={3} title="Resume">
          <Media>
          <Media.Left>
          <img width={150} height={150} src={resume} alt="res"/>
        </Media.Left>
          </Media>
        </Tab>
      </Tabs>
    </div>
  );
}