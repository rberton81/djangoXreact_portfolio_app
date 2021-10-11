import React, { Component } from "react";
import ModalEdit from "./components/ModalEdit";
import ModalDetail from "./components/ModalDetail";
import ModalCreate from "./components/ModalCreate";
import UserManagement from "./components/UserManagement";
import axios from "axios";
import { Container } from 'reactstrap';
import Cookies from "universal-cookie";

const cookies = new Cookies();

class App extends Component {
  constructor(props) {
    super(props);
    this.userManagementLoginHandler = this.userManagementLoginHandler.bind(this);
    this.userManagementLogoutHandler = this.userManagementLogoutHandler.bind(this);
    this.state = {
	  projectsList: [],
	  profexpsList: [],
	  climbingexpsList: [],
	  modalEdit: false,
	  modalDetail: false,
	  modalCreate: false,
	  activeItem: {
		title: "",
		place: "",
		description: "",
		link: "",
		picture: "",
		},
	  username: "",
	  password: "",
	  error: "",
	  isAuthenticated: false,
    };
  }
  
  // Handlers for child component UserManagement
  userManagementLoginHandler(isAuthenticated, username, password, error) {
	this.setState({
		isAuthenticated: isAuthenticated, 
		username: username,
		password: password, 
		error: error
	});
  }
  
  userManagementLogoutHandler(isAuthenticated) {
	this.setState({
		isAuthenticated: isAuthenticated, 
	});
  }

  componentDidMount() {
    this.refreshList();
    this.getSession();
  }

  refreshList = () => {
    axios
      .get("/api/myprojects/")
      .then((res) => this.setState({ projectsList: res.data }))
      .catch((err) => console.log(err));
	  axios
      .get("/api/myprofexps/")
      .then((res) => this.setState({ profexpsList: res.data }))
      .catch((err) => console.log(err));
	  axios
      .get("/api/myclimbingexps/")
      .then((res) => this.setState({ climbingexpsList: res.data }))
      .catch((err) => console.log(err));
  };

  getSession = () => {
    fetch("/api/session/", {
      credentials: "same-origin",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.isAuthenticated) {
        this.setState({isAuthenticated: true});
      } else {
        this.setState({isAuthenticated: false});
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }	
  
  toggleModalEdit = () => {
    this.setState({ modalEdit: !this.state.modalEdit });
  };
  toggleModalDetail = () => {
    this.setState({ modalDetail: !this.state.modalDetail });
  };
  toggleModalCreate = () => {
    this.setState({ modalCreate: !this.state.modalCreate });
  };
  
  handleEdit = (item) => {
    this.toggleModalEdit();
	// Update item if already exist in DB
    if (item.id) {
		switch(item.type) {
			case "project":
			axios
				.put(`/api/myprojects/${item.id}/`, item)
				.then((res) => this.refreshList());
			return ;
			case "profexp":
			axios
				.put(`/api/myprofexps/${item.id}/`, item)
				.then((res) => this.refreshList());
			return;
			case "climbingexp":
			axios
				.put(`/api/myclimbingexps/${item.id}/`, item)
				.then((res) => this.refreshList());
			return;
			default:
				// do nothing; could throw an alert?
		}
    }
  };

  handleCreate = (item) => {
    this.toggleModalCreate();
		// Create item if doesn't exist in DB
		switch(item.type) {
			case "project":
			axios
			  .post("/api/myprojects/", item)
			  .then((res) => this.refreshList());
			return;
			case "profexp":
			axios
			  .post("/api/myprofexps/", item)
			  .then((res) => this.refreshList());
			return;
			case "climbingexp":
			axios
			  .post("/api/myclimbingexps/", item)
			  .then((res) => this.refreshList());
			return;
			default:
				// do nothing; could throw an alert?
		}
  }; 
  
  handleDelete = (item, itemType) => {
		switch(itemType) {
			case "project":
			axios
			  .delete(`/api/myprojects/${item.id}/`)
			  .then((res) => this.refreshList());
			return;
			case "profexp":
			axios
			  .delete(`/api/myprofexps/${item.id}/`)
			  .then((res) => this.refreshList());
			return;
			case "climbingexp":
			axios
			  .delete(`/api/myclimbingexps/${item.id}/`)
			  .then((res) => this.refreshList());
			return;
			default:
				// do nothing;
		}
  };

  createItem = (itemType) => {
    const item = { type: itemType, title: "", place: "", description: "", link: "", picture: ""};
    this.setState({ activeItem: item, modalCreate: !this.state.modalCreate });
  };

  editItem = (item, itemType) => {
	item.type = itemType;
    this.setState({ activeItem: item, modalEdit: !this.state.modalEdit });
  };

  detailItem = (item) => {
    this.setState({ activeItem: item, modalDetail: !this.state.modalDetail });
  };
  
  // Renders the main section with a create button given the type of item
  renderSectionTitle = (sectionTitle, createItem, addItem) => {
    return (
      <div className="row">
        <div className="col-sm">
		{sectionTitle}
        </div>
		{this.state.isAuthenticated && 
			<div className="col-sm text-center">
				<button
				  className="btn btn-primary btn-sm"
				  onClick={() => this.createItem(createItem)}
				>
				  Add a {addItem}
				</button>
			</div>
		}
      </div>
    );
  };

  // Renders all the items from a list loaded in the state, given the type (project, profexp or climbingexp)
  renderListItems = (itemType) => {
		let newItems;
		switch(itemType) {
			case "project":
				newItems = this.state.projectsList;
			break;
			case "profexp":
				newItems = this.state.profexpsList;
			break;
			case "climbingexp":
				newItems = this.state.climbingexpsList;
			break;
		}
				
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`project-title mr-2 `}
          title={item.description}
        >
		{item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.detailItem(item)}
          >
            Details
          </button>
		  {this.state.isAuthenticated && 
			  <>
				  <button
					className="btn btn-secondary mr-2"
					onClick={() => this.editItem(item, itemType)}
				  >
					Edit
				  </button>
				  <button
					className="btn btn-danger"
					onClick={() => this.handleDelete(item, itemType)}
				  >
					Delete
				  </button>
			  </>
		  }
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-black text-uppercase text-center my-4">My Portfolio App</h1>
			<div className="row">
			  <div className="col-md-6 col-sm-10 mx-auto p-0">
				<UserManagement
				  username= ""
				  password= ""
				  error= ""
				  isAuthenticated = {this.state.isAuthenticated}
				  userManagementLoginHandler = {this.userManagementLoginHandler}
				  userManagementLogoutHandler = {this.userManagementLogoutHandler}
				/>
            <div className="card p-3">
              {this.renderSectionTitle("My Projects", "project", "project")}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderListItems("project")}
              </ul>
            </div>	
            <div className="card p-3">
              {this.renderSectionTitle("My Professional Experiences", "profexp", "professional experience")}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderListItems("profexp")}
              </ul>
            </div>	
            <div className="card p-3">
              {this.renderSectionTitle("My Climbing Experiences", "climbingexp", "climbing experience")}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderListItems("climbingexp")}
              </ul>
            </div>	
          </div>
        </div>
		
		{this.state.modalCreate 
		? 	(
			  <ModalCreate
				activeItem={this.state.activeItem}
				toggleModalCreate={this.toggleModalCreate}
				onSave={this.handleCreate}
			  />
			) 
		: null}
		
        {this.state.modalEdit 
		? 	(
			  <ModalEdit
				activeItem={this.state.activeItem}
				toggleModalEdit={this.toggleModalEdit}
				onSave={this.handleEdit}
			  />
			) 
		: null}
		
        {this.state.modalDetail 
		? 	(
			  <ModalDetail
				activeItem={this.state.activeItem}
				toggleModalDetail={this.toggleModalDetail}
			  />
			) 
		: null}
      </main>
    );
  }
}

export default App;