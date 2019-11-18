import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Col, Grid, ListGroup, PageHeader, Panel, Row } from "react-bootstrap";
import RequestItem from "./requestItem";
import "../../styles/browse.css";
import "../../styles/requests.css";

export default function Requests(props) {
  const [userList, setUserList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [requestList, setRequestList] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.all([
      axios.get('http://localhost:3000/user'),
      axios.get('http://localhost:3000/project'),
      axios.post('http://localhost:3000/request/search', { creator: props.userID })
    ])
    .then(res => {
      setUserList(res[0].data);
      setProjectList(res[1].data);
      setRequestList(res[2].data);
      setLoading(false);
    })
    .catch(error => console.log(error));
  }, []);

  function handleAccept(request) {
    const newPeer = { $addToSet: { peers: request.requester } };

    axios.post('http://localhost:3000/project/update/' + request.project, newPeer)
      .then(() => handleReject(request))
      .catch(error => console.log(error));
  }

  function handleReject(request) {
    axios.delete('http://localhost:3000/request/' + request._id)
      .then(() => {
        axios.get('http://localhost:3000/request')
          .then(res => setRequestList(res.data))
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }

  function displayRequests() {
    return (requestList.map(request => 
      <RequestItem 
        request={request}
        userList={userList}
        projectList={projectList}
        handleAccept={handleAccept.bind(this)}
        handleReject={handleReject.bind(this)}
      />
    ))
  }

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
            </Row>
          </Grid>
      </Panel>
    </div>
  );
}