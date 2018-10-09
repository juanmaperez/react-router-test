import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// views
import Home from './components/views/Home'
import Players from './components/views/Players'
import Teams from './components/views/Teams'
// components
import Navbar from './components/common/navbar'

import './App.css'

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
