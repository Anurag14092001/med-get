import React, { Component } from 'react'

import {Link,Outlet } from "react-router-dom";

export class Navbar extends Component {

  

  render() {
    
    

 
    
 

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
  <Link className="navbar-brand" to="/">Medget</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Savings</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/cmp">Composition</Link>
      </li>
      {!this.props.data &&<li className="nav-item">
        <Link className="nav-link" to="/login">Admin login</Link>
      </li>}
      {this.props.data &&<li className="nav-item">
        <Link className="nav-link" to="/aadm">Add Admin</Link>
      </li>}
      {this.props.data &&<li className="nav-item">
        <Link className="nav-link" to="/cpass">Change password</Link>
      </li>}
      {this.props.data &&<li className="nav-item">
        <Link className="nav-link" to="/amed">Add medicine</Link>
      </li>}

      {this.props.data &&<li className="nav-item">
      <button type="button" onClick={this.props.func2} class="btn btn-danger mx-5">Log Out</button>
      </li>}
      
    </ul>
    </div>
  </div>
</nav>
    )
  }
}

export default Navbar