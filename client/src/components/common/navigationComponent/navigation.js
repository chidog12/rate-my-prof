import React, { Component } from "react";
import "./navigation.scss"
import { NavLink, Link, withRouter } from "react-router-dom";
import { logoutUser } from "../../../actions/authActions"
import { connect } from "react-redux";

class navigation extends Component{
    onLogoutClick = e => {
        this.props.logoutUser(this.props.history);
        window.location.href = "/";
      };

    constructor() {
        super();
        this.state = {
        };
      }

    render() {
        var floatStyle = {
            float: 'right'
        }


      return(
        <div className='nav'>
          <ul>
          <NavLink exact to="/">
            <li>
              <a>Home</a>
            </li>
          </NavLink>
          <div className="sign-out" onClick={this.onLogoutClick}>
            <li style={floatStyle}>
              <a className="active">Sign Out</a>
            </li>
          </div>
            </ul>
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
  });


  export default withRouter(
    connect(
        mapStateToProps,
      { logoutUser }
    )(withRouter(navigation))
  );