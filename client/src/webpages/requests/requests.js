import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Col, Grid, ListGroup, PageHeader, Panel, Row } from "react-bootstrap";
import RequestItem from "./requestItem";
//import ProjectItem from "../browse/projectItem";
import "../../styles/browse.css";

export default function Requests(props) {
  const [collegeList, setCollegeList] = useState([]);
  const [majorList, setMajorList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [requestList, setRequestList] = useState([]);

  const [project, setProject] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.all([
      axios.get('http://localhost:3000/college'),
      axios.get('http://localhost:3000/major'),
      axios.get('http://localhost:3000/skill'),
      axios.get('http://localhost:3000/user'),
      axios.get('http://localhost:3000/project'),
      axios.get('http://localhost:3000/request')
    ])
    .then(res => {
      setCollegeList(res[0].data);
      setMajorList(res[1].data);
      setSkillList(res[2].data);
      setUserList(res[3].data);
      setProjectList(res[4].data);
      setRequestList(res[5].data);
      setLoading(false);
    })
    .catch(error => console.log(error));
  }, []);

  function displayRequests() {
    return (requestList.map(request => 
      <RequestItem 
        request={request}
        userList={userList}
        projectList={projectList}
        onClick={setProject.bind(this)}
      />
    ))
  }

  // function viewProject() {
  //   return (
  //     <ProjectItem
  //       project={project}
  //       collegeList={collegeList}
  //       majorList={majorList}
  //       skillList={skillList}
  //       userList={userList}
  //     />
  //   )
  // }

  if (loading) {
    return null;
  }

  return (
    <div className="Browse">
        <PageHeader>
          Requests
        </PageHeader>
        <Panel>
          <Grid>
            <Row>
              <Col xs={6}>
                <ListGroup>
                  {displayRequests()}
                </ListGroup>
              </Col>
              <Col xs={6}>
                <ListGroup>
                </ListGroup>
              </Col>
            </Row>
          </Grid>
      </Panel>
    </div>
  );
}