/*
* @Author: yao
* @Date:   2018-04-15 11:24:24
* @Last Modified by:   yao
* @Last Modified time: 2018-04-15 11:24:32
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom'
import Home from 'page/home/index.jsx'
import UserList from 'page/user/index.jsx'
import ErrorPage from 'page/error/index.jsx'

import Layout from 'component/layout/index.jsx'
import Login from 'page/login/index.jsx'
import ProductRouter from 'page/product/router.jsx'
class App extends React.Component{

  render() {
    let LayoutRouter = (
      <Layout>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path="/product" component={ProductRouter}/>
          <Route path="/product-category" component={ProductRouter}/>
          <Route path="/order/index" />
          <Route path="/user/index"  component={UserList}/>
          <Redirect exact from="/user" to="/user/index"/>
          <Route component={ErrorPage} />
        </Switch>
      </Layout>
    );
    return(
      <Router>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' render={props => LayoutRouter}></Route>
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
