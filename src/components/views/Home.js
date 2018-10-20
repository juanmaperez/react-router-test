import React, { Component } from 'react';
import TeamLogo from '../common/TeamLogo';
import { Link } from 'react-router-dom';
import { getTeamNames } from '../../api';

export default class Home extends Component {
  state = {
    teamNames: []
  }

  componentDidMount() {
    getTeamNames()
    .then( teamNames => this.setState(()=>({
      teamNames
    })))
  }

  render() {
    const { teamNames } = this.state;
    return (
        <div id="home" className="container">
          <div className="hero">
            <div className="hero-body has-text-centered">
              <h1 className="title">Hash History Basketball League</h1>
              <h2 className="subtitle">Select a team</h2>
            </div>
          </div>
          
          <div className="teams has-text-centered">
            { teamNames.map(id =>(
              <Link className="team" key={id} to={`/${id}`}>
                <TeamLogo id={id} width="125px" />
              </Link> 
            ))}
          </div>
        </div>
    )
  }
}