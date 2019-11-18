import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Col, ControlLabel, FormGroup, Grid, ListGroup, PageHeader, Panel, Row } from "react-bootstrap";
import Select from 'react-select';
import BrowseItem from "./browseItem";
import ProjectItem from "./projectItem";
import "../../styles/browse.css";

export default function Browse(props) {
  const [collegeFilter, setCollegeFilter] = useState(null);
  const [majorFilter, setMajorFilter] = useState(null);
  const [skillsFilter, setSkillsFilter] = useState(null);

  const [collegeList, setCollegeList] = useState([]);
  const [majorList, setMajorList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [requestList, setRequestList] = useState([]);

  const [projectList, setProjectList] = useState([]);
  const [project, setProject] = useState(null);

  const [toggle, setToggle] = useState(true);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.all([
      axios.get('http://localhost:3000/college'),
      axios.get('http://localhost:3000/major'),
      axios.get('http://localhost:3000/skill'),
      axios.get('http://localhost:3000/user'),
      axios.get('http://localhost:3000/request')
    ])
    .then(res => {
      setCollegeList(res[0].data);
      setMajorList(res[1].data);
      setSkillList(res[2].data);
      setUserList(res[3].data);
      setRequestList(res[4].data);
      setLoading(false);
    })
    .catch(error => console.log(error));
  }, []);

  function search(event) {
    event.preventDefault();

    const searchData = {
      college: collegeFilter,
      major: majorFilter,
      skills: skillsFilter
    };

    axios.post('http://localhost:3000/project/search', searchData)
      .then(res => { 
        setProjectList(res.data);
        setProject(null);
      })
      .catch(error => console.log(error));
  }

  function handleApply() {
    const request = {
      requester: props.userID,
      creator: project.creator,
      project: project._id
    }

    axios.post('http://localhost:3000/request/add', request)
      .then(() => {
        axios.get('http://localhost:3000/request')
          .then(res => setRequestList(res.data))
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }

  function displayProjects() {
    return (projectList.map(project => 
      <BrowseItem 
        project={project}
        collegeList={collegeList}
        onClick={setProject.bind(this)}
      />
    ))
  }

  function viewProject() {
    return (
      <ProjectItem
        project={project}
        collegeList={collegeList}
        majorList={majorList}
        skillList={skillList}
        userList={userList}
        requestList={requestList}
        handleApply={handleApply.bind(this)}
      />
    )
  }

  if (loading) {
    return null;
  }

  return (
    <div className="Browse">
      <form onSubmit={search}>
        <PageHeader>
          Browse
          <Button className="pull-right" bsStyle="primary" type="submit" onClick={() => setToggle(!toggle)}>
            Filter
          </Button>
        </PageHeader>
        <Panel expanded={toggle}>
          <Panel.Collapse>
            <Grid>
              <Row>
                <Col xs={6}>
                  <FormGroup>
                    <ControlLabel>Filter by college</ControlLabel>
                    <Select
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
      <Panel expanded={!toggle}>
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
                  {project && viewProject()}
                </ListGroup>
              </Col>
            </Row>
          </Grid>
        </Panel.Collapse>
      </Panel>
    </div>
  );
}