import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './pages/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './pages/PrivateRoute/PrivateRoute';
import Take from './pages/Take/Take';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>

        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route path='/login'>
            <Login></Login>
          </Route>
          {/* <PrivateRoute path='/modals'>
            <UseModal></UseModal>
          </PrivateRoute> */}
          <PrivateRoute path='/take'>
            <Take />
          </PrivateRoute>
          {/* <PrivateRoute path='/payment/:id'>
            <PaymentOption></PaymentOption>
          </PrivateRoute> */}
          {/* <PrivateRoute path='/admin'>
            <AdminNavbar></AdminNavbar>
          </PrivateRoute>
          <PrivateRoute path='/myDevice'>
            <MyDevice></MyDevice>
          </PrivateRoute> */}
        </Switch>

      </Router>
    </UserContext.Provider>
  );
}

export default App;
