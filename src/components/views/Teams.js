import React, { Component } from 'react';
import Sidebar from './../common/sidebar';
import { getTeamNames } from '../../api';
import { Route, Link } from 'react-router-dom';
import TeamLogo from '../common/TeamLogo';
import Team from '../common/Team';


export default class Teams extends Component {

  state = {
    teams: [],
    loading: true
  }

  componentDidMount(){
    getTeamNames()
      .then((teams)=>{
        this.setState(()=>({
          teams,
          loading: false
        }))
      })
  }
  render() {
    const { loading, teams } = this.state;
    const { location, match } = this.props;

    return (
      <div className="container">
        <div className="columns is-vcentered">
          <Sidebar loading={loading} title='Teams'
            list={teams}
            {...this.props }
          />
          { loading === false && location.pathname === '/teams'
            ? <div className="column"> Select a team</div>
            : null
          }

          <Route path={`${match.url}/:teamId`} render={({ match })=> (
            <div className="column">
              <Team id={ match.params.teamId}>
                {(team) => team === null 
                ? <h1>Loading...</h1>
                : <div className="columns team">
                    <div className="column">
                      <TeamLogo id={team.id } className="center" />
                      <h1><strong>{team.name}</strong></h1>
                      <i>{team.established}</i>
                      <h3>{team.coach}</h3>
                      <br />
                      <Link to={`/${match.params.teamId}`}>
                        <button className="button is-small is-primary">
                          Go to { team.name } page
                        </button>
                      </Link>
                    </div>
                 
                  </div>
                }
              </Team>
            </div>
          )} />
        </div>
      </div>
    )
  }
}