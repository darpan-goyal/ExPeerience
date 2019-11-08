import React  from 'react';
import { Button } from "react-bootstrap";
import axios from 'axios';

export default class projectItem extends React.Component {
  constructor(props) {
    super();
    this.state = {
      majorNames: [],
      skillNames: [],
      peerNames: [],
    }
  }

  componentDidMount() {
    this.props.majors.forEach(major =>
      axios.get('http://localhost:3000/major/' + major)
        .then(res => {
          let temp = this.state.majorNames;
          temp.push(res.data.name);
          this.setState({majorNames: temp});
      })
    )
    this.props.skills.forEach(skill =>
      axios.get('http://localhost:3000/skill/' + skill)
        .then(res => {
          let temp = this.state.skillNames;
          temp.push(res.data.name);
          this.setState({skillNames: temp});
      })
    )
    this.props.peers.forEach(peer =>
      axios.get('http://localhost:3000/user/' + peer)
        .then(res => {
          let temp = this.state.peerNames;
          temp.push(res.data.username);
          this.setState({peerNames: temp});
      })
    )
  }

  render() {

    return (
      <div className="project-item">
        <div className="name-box">
          <h1>{this.props.name}</h1>
          <p>{this.props.college}</p>
          <p>{this.props.description}</p>
        </div>
        <div className="other-box">
          <h3>Majors</h3>
          {this.state.majorNames.map(m => <div>{m}</div>)}
        </div>
        <div className="other-box">
          <h3>Skills</h3>
          {this.state.skillNames.map(s => <div>{s}</div>)}
        </div>
        <div className="other-box">
          <h3>Peers</h3>
          {this.state.peerNames.map(p => <div>{p}</div>)}
        </div>
        <div className="button-box">
          {(this.props.userID === this.props.creator) ? (
              <div className="button-box">
                  <Button onClick={this.props._handleEdit.bind(this)}>Edit</Button>
                  <Button onClick={this.props._handleDelete.bind(this, this.props.id)}>Delete</Button>
              </div>
          ) : (
              <div className="button-box">
                  <Button onClick={this.props._handleLeave.bind(this, this.props.id, this.props.userID, this.props.peers)}>Leave</Button>
              </div>
          )}
        </div>
      </div>
    ) 
  }
}
