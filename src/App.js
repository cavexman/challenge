import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';

import HomePage from './pages/HomePage'
import OpenSales from './pages/OpenSales'
import AcceptedSales from './pages/AcceptedSales'
import SoldSales from './pages/SoldSales'

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
       <Route path="/open-sales" component={OpenSales} />
       <Route path="/accepted-sales" component={AcceptedSales} />
       <Route path="/sold-sales" component={SoldSales} />  
    </Switch>
  )
}
