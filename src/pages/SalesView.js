import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Transaction from './Transaction'


// TODO setup websocket to listen for updates to transactions
export default class OpenSales extends Component {
  state = {
    "Open": [],
    "Accepted": [],
    "Sold": [],
  }

  loadTransactions(){
    axios.get(`${this.props.endpoint}`)
    .then(res => {
      //add an id to all transactions.
      const transactions = res.data.map((e,i) => Object.assign({}, e, {"id" :  e.status + "-" + i})); //add an id to all transactions
      this.setState({ 
        "Open": transactions.filter( sale => sale.status === "Open"),
        "Accepted": transactions.filter( sale => sale.status === "Accepted"),
        "Sold": transactions.filter( sale => sale.status === "Sold")
       });
    })
  }

  componentDidMount() {
    //fetch transactions when component loaded
    this.loadTransactions();
  }

  //when you switch tabs, you might switch endpoints and want to refresh the list
  componentDidUpdate(prevProps, prevState) {
    const { endpoint } = this.props;
    if(prevProps.endpoint !== endpoint){
      this.loadTransactions();
    }

  }

  //called when Accept/Sell button is clicked
  confirm(sale){
    //TODO normally we would now make a call to the storage to update the transaction record
    //update state to force redraw which will remove this item from the current view

    this.state[this.props.filter].splice(this.state[this.props.filter].findIndex( e => e.id === sale.id), 1);
    this.state[sale.status].push(sale); //order doesn't matter so stick it on the end


    this.setState({"status" : sale.status, "display" : "thumbnail--fadeout"}); 
  }

  render() {
    console.log(this.state[this.props.filter]);
    //all the photos fit into a "row"
    //let's try a two column layout
    //TODO if we want continous scroll, we would fetch a new page of images and then we would evenly append Transactions to the end of odds/evens arrays
    //we re-filter the list at render time just to rebalance the columns
    const odds = this.state[this.props.filter].filter( (sale, i) => i%2 && sale.status === this.props.filter);
    const evens = this.state[this.props.filter].filter( (sale, i) => !(i%2) && sale.status === this.props.filter);
    return (
      <div>
        <div className="photo-container">
          <div className="photo-row">
            
            <div className="photo-column">
              { odds.map( (sale,i) => 
                <Transaction key={sale.id} 
                  confirm={(sale) => this.confirm(sale)}
                  sale={sale} 
                  {...this.props}/> /* use the id to associate the input field with this object, if this was coming from the database I'd probably have a real id to use */
              )}
            </div>
            
            <div className="photo-column">
              { evens.map( (sale, i) => 
              <Transaction key={sale.id} 
                confirm={(sale) => this.confirm(sale)}
                sale={sale} 
                {...this.props}/> /* use the id to associate the input field with this object */
              )}
            </div>

          </div>
        </div>
      </div>
    )
  }
}


