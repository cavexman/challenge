import React, { Component } from 'react'

export default class Input extends Component{
  constructor(props) {
    super(props);
  }
 
  render(){  
    return (
        <div className={"field " + this.props.style}>
        <label className="field__label" htmlFor={this.props.name}>{this.props.label}</label>
          <input defaultValue={this.props.text}
            className="field__input"
            name={this.props.name}
            placeholder={this.props.placeholder}
            onChange={e => this.props.update( { [this.props.field]: e.target.value } ) }/>
        </div>
      )
  }
}