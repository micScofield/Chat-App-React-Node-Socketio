import { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Lander from './components/layout/Lander'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Logout from './components/auth/Logout'

import './App.css';

const App = props => {

  // useEffect(() => {
  //   props.LOAD_USER()
  // }, [])

  const routes = (
    <Switch>
      <Route path='/register' exact component={Register} />
      <Route path='/login' exact component={Login} />
      <Route path='/logout' exact component={Logout} />
      <Route path='/dashboard' exact component={Dashboard} />
      <Route path='/' exact component={Lander} />
      <Redirect to='/' />
    </Switch>
  )

  return (
    <Router>
      <Fragment>
        <Navbar />
        {routes}
      </Fragment>
    </Router>
  )
}

export default App