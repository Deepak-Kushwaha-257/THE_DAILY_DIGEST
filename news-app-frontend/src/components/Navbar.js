import React, { Component } from 'react'
import logo from "./logo.jpeg"

import {
  Link
} from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
        <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to = "/"><strong>The Daily Digest</strong></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link active" style = {{cursor : 'pointer'}} aria-current="page" to = "/"><strong>General</strong></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" style = {{cursor : 'pointer'}} aria-current="page" to = "/sports"><strong>Sports</strong></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" style = {{cursor : 'pointer'}} aria-current="page" to = "/science"><strong>Science</strong></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" style = {{cursor : 'pointer'}} aria-current="page" to = "/health"><strong>Health</strong></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" style = {{cursor : 'pointer'}} aria-current="page" to = "/technology"><strong>Technology</strong></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" style = {{cursor : 'pointer'}} aria-current="page" to = "/business"><strong>Business</strong></Link>
              </li>
            </ul>
            {/* <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
