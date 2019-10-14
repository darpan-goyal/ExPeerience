import React, { useState, useEffect } from "react";
import axios from 'axios';
import { PageHeader } from "react-bootstrap";
import "./projects.css";

export default function Projects(props) {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {

  });

  return (
    <div className="Projects">
      <PageHeader>
        Projects
      </PageHeader>
    </div>
  );
}