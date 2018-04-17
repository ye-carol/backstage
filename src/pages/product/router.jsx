import React from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import ProductList from 'page/product/index/index.jsx'

export default class ProductRouter extends React.Component{
  render() {
    return (
      <Switch>
        <Route path="/product/index" component={ProductList} />
        <Redirect exact from="/product" to="/product/index" />
      </Switch>
    )
  }
}
