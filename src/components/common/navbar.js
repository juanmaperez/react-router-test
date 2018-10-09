import React from 'react';
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
      <div className="navbar is-fixed-top">
        <div className="container">  
          <div className="navbar-brand ">
              <Link className="brand" to="/">Home!</Link>
          </div>
          <nav className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item"><Link className="link-item" to="/teams">Teams!</Link></div>
              <div className="navbar-item"><Link className="link-item" to="/players">Players!</Link></div>
            </div>
          </nav>
        </div>
      </div>
    )
}