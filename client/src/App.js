import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import PrivateRoute from './utills/PrivateRoute';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './containers/Home/Home';
import Single from './containers/Single/Single';
import Contact from './containers/Contact/Contact';
import Collection_2020 from './containers/Collection/Collection_2020';
import Login from './containers/Login/Login';
import Admin from './containers/Admin/Admin';
import Shipping from './containers/Shipping/Shipping';
import Payment from './containers/Payment/Payment';
import PlaceOrder from './containers/PlaceOrder/PlaceOrder';

import setAdminToken from './utills/setAdminToken';
if (localStorage.token) {
  setAdminToken(localStorage.token);
}

const App = props => {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path={'/'} exact component={Home}/>
        <Route path={'/contact'} component={Contact}/>
        <Route path={'/collection-2020'} component={Collection_2020}/>
        <Route path={'/login'} component={Login}/>
        <PrivateRoute path={'/admin'} isAdmin={props.isAdmin} component={Admin}/>
        <Route path={'/shipping'} component={Shipping} />
        <Route path={'/payment'} component={Payment} />
        <Route path={'/place-order'} component={PlaceOrder} />
        <Route path={'/:dressId'} component={Single}/>
      </Switch>
      <Footer />
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    isAdmin: state.isAdmin
  }
}

export default connect(mapStateToProps, null)(App);