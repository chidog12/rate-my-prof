import React, { Component } from "react";
import Collapsible from 'react-collapsible';
import "./TextCollapseComponent.scss"

class TextCollapseComponent extends Component{

    render() {
      return(
        <div>
          <Collapsible trigger={this.props.title}>
           <h3>Rating: {this.props.rating}</h3>
            <p>{this.props.text}</p>
          </Collapsible>
        </div>
      );
    }
  }
export default TextCollapseComponent;