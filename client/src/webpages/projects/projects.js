import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, PageHeader } from "react-bootstrap";
import ProjectItem from './projectItem';
import "../../styles/projects.css";

export default function Projects(props) {
  const [projectList, setProjectList] = useState([]);
  const results = projectList.map(a => <ProjectItem id={a._id} location={a.location}
    name={a.name} college={a.college} majors={a.majors} description={a.description}
    skills={a.skills} creator={a.creator} peers={a.peers} userID={props.userID}
    _handleDelete={handleDelete.bind(this)}
    _handleEdit={handleEdit.bind(this)}
    _handleLeave={handleLeave.bind(this)}/>);

  useEffect(() => {
    axios.get('http://localhost:3000/project')
      .then(res => {
        let filteredProjects = [];
        res.data.forEach(p => {
          if (p.peers.includes(props.userID)) {
            filteredProjects.push(p);
          }
        })
        setProjectList(filteredProjects);
      })
      .catch(error => console.log(error));
  }, projectList);

  function handleDelete(pid) {
    axios.delete('http://localhost:3000/project/' + pid)
      .then(res => {
        setProjectList(projectList.filter(p => p._id !== pid))
      })
      .catch(error => console.log(error));

    axios.delete('http://localhost:3000/request/project/' + pid)
      .catch(error => console.log(error));
  }

  function handleLeave(pid, uID, peers) {
    let temp = peers.filter(u => u !== uID);
    axios.post('http://localhost:3000/project/update/' + pid, {peers: temp})
      .then(res => {
        setProjectList(projectList.filter(p => p._id !== pid))
      })
      .catch(error => console.log(error));
  }

  function handleEdit(pid) {
    var projectObj = projectList.filter(p => p._id === pid);
    props.history.push({pathname: '/projects/edit',
      data: projectObj
    });
  }

  function createProject() {
    props.history.push("/projects/create")
  };

  return (
    <div className="Projects">
      <PageHeader>
        Projects
        <Button className="pull-right" bsStyle="primary" type="submit" onClick={createProject} >
          New
        </Button>
      </PageHeader>
      <div className='project-list'>
        {results}
      </div>
    </div>
  );
}
// Project page needs to show the projects that you are in, not the ones you own
// By defaults, when creating a page, add the creator into the project.
// When making buttons, if creator === logged in user, show button for edit
// else show leave button
// show expand button on all the projects?
