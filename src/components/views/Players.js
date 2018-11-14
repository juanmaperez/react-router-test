import React, { Component } from 'react';
import  { Route, Link } from 'react-router-dom';
import Sidebar from '../common/sidebar';
import { getPlayers } from '../../api';
import { parse } from 'query-string';
import slug from 'slug';
import { TransitionGroup, CSSTransition} from 'react-transition-group';

export default class Players extends Component {
  state = {
    players: [],
    loading: true
  }

  componentDidMount() {
    const { location } = this.props;
    
    location.search
    ? this.fetchPlayers(parse(location.search).teamId)
    : this.fetchPlayers();
  }

  fetchPlayers = (teamId) => {
    getPlayers(teamId)
      .then((players) => this.setState(()=>({
        loading: false,
        players
      })))
  }

  render() {
    const { players, loading } = this.state;
    const { match, location } = this.props; 
    return (
      <div className="container">
        <div className="columns is-vcentered">
          <Sidebar loading={loading} title='Players'
            list={players.map((player => player.name))}
            {...this.props}
          />

          { loading === false && location.pathname === '/players'
            ? <div className="column sidebar-instruction is-half">Select a player</div>
            : null
          }

          <Route path={`${match.url}/:playerId`} render={( {match})=>{
            if(loading === true) return null;
            
            const { name, position, teamId, number, avatar, apg, ppg, rpg,spg } = players.find((player) => slug(player.name) === match.params.playerId )

            return (
              <TransitionGroup className="panel">
                <CSSTransition key={location.key} timeout={1000} classNames="fade">
                  <div className="column">
                    <div className="is-1by1">
                      <div className="avatar-wrapper">
                        <img className="avatar" src={`${avatar}`} alt={`${name}'s avatar`}/>
                      </div>
                    </div>
                    <div className="media-content">
                    <h1 className="title">{ name }</h1>
                    <h3 className="subtitle"> #{number}</h3>
                      <ul className="content">
                        <li>
                          <strong>Team: </strong>   
                          <Link to={`/${teamId}`}>
                            { teamId[0].toUpperCase() + teamId.slice(1) }
                          </Link>
                        </li>
                        <li><strong>Position: </strong>{ position }</li>
                        <li><strong>PPG: </strong>{ ppg }</li>
                        <li><strong>APG: </strong>{ apg }</li>
                        <li><strong>SPG: </strong>{ spg }</li>
                        <li><strong>RPG: </strong>{ rpg }</li>
                      </ul>
                    </div>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            )
          }} />
        </div>
      </div>
    )
  }
}