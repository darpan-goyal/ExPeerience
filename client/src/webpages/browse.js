import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, ControlLabel, FormGroup, ListGroup, ListGroupItem, PageHeader, Grid, Row, Col } from "react-bootstrap";
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
        <Grid>
          <Row>
            <Col xs={6}>
              <FormGroup bsSize="large">
                <ControlLabel>Filter by college</ControlLabel>
                <Select className="select"
                  isClearable
                  value={college}
                  options={collegeList}
                  getOptionLabel = {(option)=>option.name}
                  getOptionValue = {(option)=>option._id}
                  onChange={e => setCollege(e)}
                />
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup bsSize="large">
                <ControlLabel>Filter by major</ControlLabel>
                <Select className="select"
                  isClearable
                  value={major}
                  options={majorList}
                  getOptionLabel = {(option)=>option.name}
                  getOptionValue = {(option)=>option._id}
                  onChange={e => setMajor(e)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <FormGroup bsSize="large">
                <ControlLabel>Filter by skills</ControlLabel>
                <Select className="select"
                  isMulti
                  value={skills}
                  options={skillList}
                  getOptionLabel = {(option)=>option.name}
                  getOptionValue = {(option)=>option._id}
                  onChange={e => setSkills(e)}
                />
              </FormGroup>
            </Col>
          </Row>
        </Grid>
        <Button bsStyle="primary" bsSize="large" block type="submit">
          Search
        </Button>
      </form>
      <ListGroup>
        {projectList.map(project => <ListGroupItem onClick={() => console.log(project.name)}>{project.name}</ListGroupItem>)}
      </ListGroup>
    </div>
  );
}