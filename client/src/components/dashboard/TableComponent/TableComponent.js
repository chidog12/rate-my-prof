import React, { Component } from "react";
import "./TableComponent.scss"
import { NavLink, Link, withRouter } from "react-router-dom";


class TableComponent extends Component{

  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
    this.renderList();
}

  renderList(list){

    const profs = list && list.map((prof) =>
        <div className="row" key={prof._id}>
        <div className="section">
          {prof.name}
        </div>
        <div className="section">
          {prof.email}
        </div>
        <div className="section">
          {prof.employeeType}
        </div>
        <NavLink exact to={"/dashboard/" + prof._id}>
          <div className="section">
            Dashboard
          </div>
        </NavLink>
        <NavLink exact to={"/survey/" + prof._id}>
          <div className="section">
            Survey
          </div>
        </NavLink>
        </div> 
    );

    return(
      profs
    )
  }


    render() {
      return(
        <div className="table">
          <div className="row">
            <div className="section">
              <strong>Name</strong>
            </div>
            <div className="section">
              <strong>Email</strong>
            </div>
            <div className="section">
              <strong>Title</strong>
            </div>
            <div className="section">
              <strong>Dashboard Link</strong>
            </div>
            <div className="section">
              <strong>Survey Link</strong>
            </div>
          </div>
          {this.renderList(this.props.list)}
        </div>
      );
    }
  }
export default TableComponent;