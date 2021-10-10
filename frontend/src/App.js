import React, { Component } from "react";
import ModalEdit from "./components/ModalEdit";
import ModalDetail from "./components/ModalDetail";
import ModalCreate from "./components/ModalCreate";
import axios from "axios";
import { Container } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
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
    };
  }

  componentDidMount() {
    this.refreshList();
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

  renderProject = () => {
    return (
      <div className="row">
        <div className="col-sm">
          My Projects
        </div>
		<div className="col-sm text-center">
			<button
			  className="btn btn-primary btn-sm"
			  onClick={() => this.createItem('project')}
			>
			  Add a project
			</button>
		</div>
      </div>
    );
  };
  
  renderProfExp = () => {
    return (
	<Container className="themed-container" fluid="md">
      <div className="row">
        <div className="col-sm ">
          My Professional Experiences
        </div>
		<div className="col-sm text-center">
			<button
			  className="btn btn-primary btn-sm"
			  onClick={() => this.createItem('profexp')}
			>
			  Add a professional experience
			</button>
		</div>
      </div>
    </Container>
    );
  };
  
  renderClimbingExp = () => {
    return (
	<Container className="themed-container" fluid="md">
      <div className="row">
        <div className="col-sm">
          My Climbing Experiences
        </div>
		<div className="col-sm text-center">
			<button
			  className="btn btn-primary btn-sm"
			  onClick={() => this.createItem('climbingexp')}
			>
			  Add a climbing experience
			</button>
		</div>
      </div>
    </Container>
    );
  };

  detailItem = (item) => {
    this.setState({ activeItem: item, modalDetail: !this.state.modalDetail });
  };

  renderProjectItems = () => {
    const newItems = this.state.projectsList;

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
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item, 'project')}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item, 'project')}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };
  
  renderProfExpItems = () => {
    const newItems = this.state.profexpsList;

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`profexp-title mr-2 `}
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
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item, 'profexp')}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item, 'profexp')}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };
  
  renderClimbingExpItems = () => {
    const newItems = this.state.climbingexpsList;

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
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item, 'climbingexp')}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item, 'climbingexp')}
          >
            Delete
          </button>
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
            <div className="card p-3">
              {this.renderProject()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderProjectItems()}
              </ul>
            </div>	
            <div className="card p-3">
			  {this.renderProfExp()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderProfExpItems()}
              </ul>
            </div>	
            <div className="card p-3">
			  {this.renderClimbingExp()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderClimbingExpItems()}
              </ul>
            </div>	
          </div>
        </div>
		{this.state.modalCreate ? (
          <ModalCreate
            activeItem={this.state.activeItem}
            toggleModalCreate={this.toggleModalCreate}
            onSave={this.handleCreate}
          />
        ) : null}
        {this.state.modalEdit ? (
          <ModalEdit
            activeItem={this.state.activeItem}
            toggleModalEdit={this.toggleModalEdit}
            onSave={this.handleEdit}
          />
        ) : null}
        {this.state.modalDetail ? (
          <ModalDetail
            activeItem={this.state.activeItem}
            toggleModalDetail={this.toggleModalDetail}
          />
        ) : null}
      </main>
    );
  }
}

export default App;