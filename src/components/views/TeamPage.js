import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getTeamsArticles, getTeamNames } from '../../api';
import TeamLogo from '../common/TeamLogo';
import Team from '../common/Team';
import slug from 'slug';

export default class TeamPage extends Component {
  state = {
    loading: true,
    articles: [],
    teamNames: {}
  }
  componentDidMount(){
    Promise.all([getTeamsArticles(this.props.match.params.teamId), getTeamNames()])
    .then(([articles, teamNames])=>{
      this.setState(()=>({
        loading: false,
        articles,
        teamNames
      }))
    })
  }

  render(){
    const { loading, articles, teamNames } = this.state;
    const { match } = this.props;
    const { teamId} = match.params;

    if(loading === false && !teamNames.includes(teamId)){
      return <Redirect to='/teams' />
    } 

    return (
       <Team id={teamId}>
       {(team) => team === null 
        ? <h1>Loading...</h1>
        : <div className="columns is-centered">
            <div className="column has-text-centered">
              <TeamLogo id={teamId} className="has-text-centered" />
              <h1 className="title has-text-centered"><strong>{team.name}</strong></h1>
              <h4>
                <Link 
                style={{ cursor: 'pointer' }}
                to={{pathname:'/players', search: `?teamId=${teamId}`}}
                ></Link>
              </h4>
              <ul className="championship">
                  {team.championships.map((ship)=> <li key={ship}>{ship}</li>)}
              </ul>
              <ul className="championship">
                <li><strong>Manager: </strong>{ team.manager }</li>
                <li><strong>Coach: </strong>{ team.coach }</li>
                <li><strong>Established: </strong>{ team.established }</li>
                <li><strong>championships: </strong>{ team.championships.length }</li>
              </ul>
              <h1 className="articles-title">Articles</h1>
              <ul className="articles">
                { articles.map(article => (
                    <li key={article.id}>
                      <Link className="link" to={`${match.url}/articles/${slug(article.title)}`}>
                       <i>{ article.date.toLocaleDateString()}</i> { article.title }
                      </Link>
                    </li>
                    )
                )}
              </ul>
            </div>
          </div>
        }
       </Team>
       
    )
  }
}