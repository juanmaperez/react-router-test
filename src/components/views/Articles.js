import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Sidebar from '../common/sidebar';
import { getTeamsArticles } from '../../api';
import Article from '../common/Article'
import Loading from '../common/Loading'


export default class ArticlesPage extends Component {
  state = {
    loading: true,
    teamArticles: []
  }

  componentDidMount(){
    getTeamsArticles(this.props.match.params.teamId)
      .then((teamArticles) => { 
        this.setState(()=>({
          loading: false,
          teamArticles: teamArticles.map((article)=> article.title)
        }))
      })
  }

  render(){
    const { loading, teamArticles } = this.state;
    const { params, url } = this.props.match;
    const { teamId } = params;

    return loading === true
    ? <Loading />
    : <div className="articles-list container">
        <div className="columns">
          <Sidebar 
          loading={ loading }
          title='Articles'
          list={teamArticles}
          {...this.props}
          />
          <Route path={`${url}/:articleId`} render={({match})=>(
            <Article articleId={match.params.articleId } teamId={teamId}>
              {(article)=> !article
              ? <Loading />
              : <article className="article-content column is-three-quarters" key={article.id}>
                <h1 className="title">{article.title}</h1>
                <p className="body">{article.body}</p>
              </article>
            }
            </Article>
          )}/>
        </div>
      </div>
    
  }
}