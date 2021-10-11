import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label

} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }
    handleChange = e => {
        let { name, value } = e.target;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
    };
	
    render() {
        const { toggle, onSave, toggleModalCreate } = this.props;
		const activeItem = this.state.activeItem;
		
		let itemType = "";
		switch(activeItem.type) {
			case "project": itemType = " Project";
			break;
			case "profexp": itemType = " Profesionnal Experience";
			break;
			case "climbingexp": itemType = " Climbing Experience";
			break;
			default : itemType = "n Item";
		}
		
		let formsList = "";
			formsList = <>{formsList}<FormGroup>
                            <Label for="title">Title</Label>
                            <Input 
                              type="text"
                              name="title"
                              value={activeItem.title}
                              onChange={this.handleChange}
                              placeholder="Enter Title"
                            />
                        </FormGroup></>;
		if(activeItem.type === "profexp" || activeItem.type === "climbingexp") {
			formsList = <>{formsList}<FormGroup>
                            <Label for="place">Place</Label>
                            <Input 
                              type="text"
                              name="place"
                              value={activeItem.place}
                              onChange={this.handleChange}
                              placeholder="Enter Place"
                            />
                        </FormGroup></>;
		}
			formsList = <>{formsList}<FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                            type="text"
                            name="description"
                            value={activeItem.description}
                            onChange={this.handleChange}
                            placeholder="Enter Description"
                            />
                        </FormGroup></>;
		if(activeItem.type === "project") {
			formsList = <>{formsList}<FormGroup>
                            <Label for="link">Link</Label>
                            <Input 
                              type="text"
                              name="link"
                              value={activeItem.link}
                              onChange={this.handleChange}
                              placeholder="Enter Link"
                            />
                        </FormGroup></>;
		}
		if(activeItem.type === "climbingexp") {
			formsList = <>{formsList}<FormGroup>
                            <Label for="picture">Picture</Label>
                            <Input 
                              type="text"
                              name="picture"
                              value={activeItem.picture}
                              onChange={this.handleChange}
                              placeholder="Enter Picture"
                            />
                        </FormGroup></>;
		}
		
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create a{itemType}</ModalHeader>
                <ModalBody>
                    <Form>
						{formsList}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => toggleModalCreate()}>
                        Cancel
                    </Button>
                    <Button color="success" onClick={() => onSave(activeItem)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}