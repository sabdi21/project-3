import React from 'react';
import { Link } from 'react-router-dom';


class Navv extends React.Component {
    handleLogout = (e) => {
        e.preventDefault()
        //Remove the token from local storage (or cookies)
        localStorage.removeItem('mernToken')
        //update the state of the app
        this.props.updateUser()
    }
  render() {
      let links = ''

      //If the user is logged in, show profile page and logout links
      if(this.props.user) {
        links = (
            <span>
            <li>
                <Link to="/host">Host</Link>
            </li>
            <li>
                <Link to="/profile">Profile</Link>
            </li>
            <li>
                <a href="/" onClick={this.handleLogout} >Logout</a>
            </li>
            </span>
        )
      }
      else {
        links = (
            <span>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/signup">Signup</Link>
            </li>
            </span>
        )
      }
    return (
        <nav>
            {/* <ul> */}
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/rent">Rent</Link>
                </li>
                {links}
            {/* </ul> */}
        </nav>
    );
  }
}

export default Navv;
