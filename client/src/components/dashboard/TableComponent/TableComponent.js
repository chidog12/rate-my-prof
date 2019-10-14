import React, { Component } from "react";
import "./TableComponent.scss"

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
        <div key={prof._id}>
        {prof.name + " | "}
        {prof.email + " | "}
        {prof.employeeType}
        </div> 
    );

    return(
      profs
    )
  }


    render() {
      return(
        <div>
          {this.renderList(this.props.list)}
        </div>
      );
    }
  }
export default TableComponent;