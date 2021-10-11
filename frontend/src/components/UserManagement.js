import React, { Component } from "react";
import Cookies from "universal-cookie";


const cookies = new Cookies();

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  username: "",
	  password: "",
	  error: "",
	  isAuthenticated: this.props.isAuthenticated,
    };	
  }

  /// User management
  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  handleUserNameChange = (event) => {
    this.setState({username: event.target.value});
  }

  isResponseOk(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  login = (event) => {
    event.preventDefault();
    fetch("/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "same-origin",
      body: JSON.stringify({username: this.state.username, password: this.state.password}),
    })
    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
      this.setState({isAuthenticated: true, password: "", error: ""});
	  this.props.userManagementLoginHandler(true,this.state.username,"","");
    })
    .catch((err) => {
      console.log(err);
      this.setState({error: "Wrong username or password."});
    });
  }

  logout = () => {
    fetch("/api/logout", {
      credentials: "same-origin",
    })
    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
      this.setState({isAuthenticated: false});
	  this.props.userManagementLogoutHandler(false);
    })
    .catch((err) => {
      console.log(err);
    });
  };
  
 /// End user management
 
 
 
  render() {
	  let usermanagement;
	  if (!this.state.isAuthenticated) {
		usermanagement = 
			<div className="container mt-3">
			  <br />
			  <h2>Login</h2>
			  <form onSubmit={this.login}>
				<div className="form-group">
				  <label htmlFor="username">Username</label>
				  <input type="text" className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleUserNameChange} />
				</div>
				<div className="form-group">
				  <label htmlFor="username">Password</label>
				  <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
				  <div>
					{this.state.error &&
					  <small className="text-danger">
						{this.state.error}
					  </small>
					}
				  </div>
				</div>
				<button type="submit" className="btn btn-primary">Login</button>
			  </form>
			</div>;
	  }	else {
		usermanagement =       
			<div className="container ">
				<p>You are currently logged in as {this.state.username}.</p>
				<button className="btn btn-danger" onClick={this.logout}>Log out</button>
			</div>;
	  } 
	  
	return( 
		<>
			{usermanagement}
		</>
	);
  }	
}
export default UserManagement;