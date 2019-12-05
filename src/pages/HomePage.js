import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css';

import OpenSales from './OpenSales'
import AcceptedSales from './AcceptedSales'
import SoldSales from './SoldSales'


//the control for showing active view and switching to another view
class Tab extends Component {
  state = {

  }

  componentDidMount() {

  }

  render() {
    const isActive = this.props.current_tab === this.props.label ? "tab--active" : "tab--inactive";
    return(
      <div className={"column tab " + isActive} onClick={() => this.props.switchtab(this.props.label)}>
        <div><span className="tab__label">{this.props.label}</span></div>
      </div>
    )
  }
}

export default class HomePage extends Component {
  
  state = {
    "current_tab": "Open"
  }
  
  switchtab(target){
    this.setState({"current_tab" : target});
  }

  componentDidMount() {
      
  }
  
  //   {
  //     "name":"Bob",
  //     "imageUrl":"www.sampleimage.com",
  //     "status" : "Open",
  //     "price" : "5.00",
  //     "transaction": { }
  //     }
  // TODO once I get the DB deployed I can switch to the laravel endpoint
  // `http://127.0.0.1:8000/api/transactions/Sold`
  render() {
    const views = {
      "Open" : {
        "component" : OpenSales,
        "endpoint" : "/sales.json",
        "filter" : "Open",
        "button_label" : "Accept",
        "nextStatus" : "Accepted"
      },
      "Accepted" : {
        "component" : OpenSales,    //react component as parent view
        "endpoint" : "/sales.json", //endpoint to load the view list
        "filter" : "Accepted",      //limit the view to transacations that match this status
        "button_label" : "Sell",    //to advance the transaction to next state, click this button
        "nextStatus" : "Sold"           //new state for transaction after clicking commit button
      },
      "Sold" : {
        "component" : OpenSales,
        "endpoint" : "/sales.json",
        "filter" : "Sold",
        "button_label" : "", //sold view has no accept/sell button
        "nextStatus" : "" //no button, so no new state
      },
      
    };
    const ContentClass = views[this.state.current_tab].component;
    return (
      <div>
        <div className="App-header">
          <img src="sw-logo-icon2x.png"/><span>Snapwire</span>
        </div>

        <div className="App-main_container">

          <div className="App-tabs">
            <div className="row"> {/* create a tab for each view, use key as label text */}
              {Object.keys(views).map( e => 
                <Tab key={e} label={e} {...this.state} switchtab={(v) => this.switchtab(v)}/> /* pass in state so Tab knows which tab is active */
              )}
            </div>
          </div>

          <div className="Tab-content">
            <div>
              <ContentClass {...views[this.state.current_tab]}/>
            </div>
          </div>

        </div>

      </div>
    )
  }
}
  
  
  
