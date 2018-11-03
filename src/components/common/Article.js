import { Component } from 'react';
import PropTypes from 'prop-types';
import { getArticle } from '../../api';

export default class Article extends Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    articleId: PropTypes.string.isRequired,
    childre: PropTypes.func.isRequired
  }
  
  state = {
    article: null
  }

  getArticle = (teamId, articleId ) => {
    this.setState(()=>({
      article: null
    }))

    getArticle(teamId, articleId)
    .then((article)=>{ 
      this.setState(()=>({
        article
      }))
  })
  }

  componentWillReceiveProps(nextProps){
    if( this.props.articleId !== nextProps.articleId) return
    const {articleId, teamId } = nextProps;
    this.getArticle( teamId, articleId )
  }

  componentDidMount(){
    const {teamId, articleId } = this.props
    this.getArticle(teamId, articleId)
  }

  render() {
    return this.props.children(this.state.article)
  }
}