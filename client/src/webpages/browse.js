import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Col, ControlLabel, FormGroup, Grid, ListGroup, ListGroupItem, PageHeader, Panel, Row, Well} from "react-bootstrap";
import Select from 'react-select';
import "../styles/browse.css";

export default function Projects(props) {
  const [collegeFilter, setCollegeFilter] = useState(null);
  const [majorFilter, setMajorFilter] = useState(null);
  const [skillsFilter, setSkillsFilter] = useState(null);

  const [collegeList, setCollegeList] = useState([]);
  const [majorList, setMajorList] = useState([]);
  const [skillList, setSkillList] = useState([]);

  const [projectList, setProjectList] = useState([]);
  const [project, setProject] = useState(null);

  const [toggle, setToggle] = useState(false);

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

    axios.get('http://localhost:3000/project')
      .then(res => { setProjectList(res.data) })
      .catch(error => console.log(error));
  }, []); 

  function toggles() {
    if (toggle)
      document.getElementById('toggle').innerText = 'Filter';
    else
      document.getElementById('toggle').innerText = 'Apply';

    setToggle(!toggle);
    setProject(null);
  }

  function search(event) {
    event.preventDefault();

    const searchData = {
      college: collegeFilter,
      major: majorFilter,
      skills: skillsFilter
    };

    axios.post('http://localhost:3000/project/search', searchData)
      .then(res => { setProjectList(res.data) })
      .catch(error => console.log(error));
  }

  function displayProjects() {
    return (projectList.map(project => 
      <ListGroupItem header={project.name} onClick={()=>setProject(project)}> 
        {project.college}
      </ListGroupItem>
    ));
  }

  function viewProject() {
    if (project) {
      return (
        <ListGroupItem>
          <b>{project.name}</b>
          <p>{project.description}</p>
        </ListGroupItem>
      );
    }
  }

  return (
    <div className="Browse">
      <form onSubmit={search}>
        <PageHeader>
          Browse
          <Button id="toggle" className="pull-right" type="submit" onClick={toggles}>
            Filter
          </Button>
        </PageHeader>
        <Panel className="filter-panel" expanded={toggle}>
          <Panel.Collapse>
            <Grid>
              <Row>
                <Col xs={6}>
                  <FormGroup>
                    <ControlLabel>Filter by college</ControlLabel>
                    <Select 
                      className="select"
                      isClearable
                      value={collegeFilter}
                      options={collegeList}
                      getOptionLabel = {(option)=>option.name}
                      getOptionValue = {(option)=>option._id}
                      onChange={e => setCollegeFilter(e)}
                    />
                  </FormGroup>
                </Col>
                <Col xs={6}>
                  <FormGroup>
                    <ControlLabel>Filter by major</ControlLabel>
                    <Select 
                      className="select"
                      isClearable
                      value={majorFilter}
                      options={majorList}
                      getOptionLabel = {(option)=>option.name}
                      getOptionValue = {(option)=>option._id}
                      onChange={e => setMajorFilter(e)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <FormGroup>
                    <ControlLabel>Filter by skills</ControlLabel>
                    <Select 
                      className="select"
                      isMulti
                      value={skillsFilter}
                      options={skillList}
                      getOptionLabel = {(option)=>option.name}
                      getOptionValue = {(option)=>option._id}
                      onChange={e => setSkillsFilter(e)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Grid>
          </Panel.Collapse>
        </Panel>
      </form>
      <Panel className="projects-panel" expanded={!toggle}>
        <Panel.Collapse>
          <Grid>
            <Row>
            <Col xs={6}>
              <ListGroup>
                {displayProjects()}
              </ListGroup>
            </Col>
            <Col xs={6}>
              <ListGroup>
                {viewProject()}
              </ListGroup>
            </Col>
            </Row>
          </Grid>
        </Panel.Collapse>
      </Panel>
    </div>
  );
}