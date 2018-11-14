import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// views
// import Home from './components/views/Home'
// import Players from './components/views/Players'
// import Teams from './components/views/Teams'
// import TeamPage from './components/views/TeamPage';
// import ArticlesPage from './components/views/Articles';
// components
import Navbar from './components/common/navbar'
import Loading from './components/common/Loading'

import DynamicImport from './components/common/DynamicImport';

import './App.css'

const Home = (props) => (
  <DynamicImport load={() => import('./components/views/Home')}>
    { (Component) => Component === null 
    ? <Loading/>
    : <Component {...props}/>
    }
  </DynamicImport>
)

const Teams = (props) => (
  <DynamicImport load={() => import('./components/views/Teams')}>
    { (Component) => Component === null 
    ? <Loading/>
    : <Component {...props}/>
    }
  </DynamicImport>
)

const Players = (props) => (
  <DynamicImport load={() => import('./components/views/Players')}>
    { (Component) => Component === null 
    ? <Loading/>
    : <Component {...props}/>
    }
  </DynamicImport>
)

const TeamPage = (props) => (
  <DynamicImport load={() => import('./components/views/TeamPage')}>
    { (Component) => Component === null 
    ? <Loading/>
    : <Component {...props}/>
    }
  </DynamicImport>
)

const ArticlesPage = (props) => (
  <DynamicImport load={() => import('./components/views/Articles')}>
    { (Component) => Component === null 
    ? <Loading/>
    : <Component {...props}/>
    }
  </DynamicImport>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />
            <div className="main-body">
              <Switch>
                <Route path="/" exact component={ Home } />
                <Route path="/teams" component={ Teams } />
                <Route path="/players" component={ Players } />

                <Route path="/:teamId" exact component={ TeamPage } />  
                <Route path="/:teamId/articles" component={ ArticlesPage } />  

                <Route render={()=> (<div className="hero">
                                      <div className="hero-body has-text-centered">
                                        <h1 className="title">Four ohh four</h1>
                                      </div>
                                    </div>)} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
