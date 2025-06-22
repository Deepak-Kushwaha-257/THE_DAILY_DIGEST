import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './Nav1.css'
import logo from './logo.jpeg'

export class Navbar extends Component {
  render() {
    return (
      <>

        <nav className="navbar fixed-top navbar-expand-lg enhanced-navbar">
          <div className="container-fluid">
            <Link className="navbar-brand brand-link" to="/">
            <img 
                src={logo} 
                alt="" 
                className="navbar-logo"
                onError={(e) => {e.target.style.display = 'none'}}
                onLoad={(e) => {e.target.style.display = 'block'}}
              />
              <strong>The Daily Digest</strong>
            </Link>
            
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarSupportedContent" 
              aria-controls="navbarSupportedContent" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link 
                    className="nav-link enhanced-nav-link active" 
                    aria-current="page" 
                    to="/"
                  >
                    <strong>🌐 General</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className="nav-link enhanced-nav-link" 
                    to="/sports"
                  >
                    <strong>⚽ Sports</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className="nav-link enhanced-nav-link" 
                    to="/science"
                  >
                    <strong>🔬 Science</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className="nav-link enhanced-nav-link" 
                    to="/health"
                  >
                    <strong>🏥 Health</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className="nav-link enhanced-nav-link" 
                    to="/technology"
                  >
                    <strong>💻 Technology</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className="nav-link enhanced-nav-link" 
                    to="/business"
                  >
                    <strong>💼 Business</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className="nav-link enhanced-nav-link" 
                    to="/local-news"
                  >
                    <strong>🏠 Local News</strong>
                  </Link>
                </li>
              </ul>
              
              {/* Post News Button */}
              <div className="d-flex">
                <Link 
                  className="nav-link enhanced-nav-link post-news-link" 
                  to="/post-news"
                >
                  <strong>✍️ Post Local News</strong>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default Navbar