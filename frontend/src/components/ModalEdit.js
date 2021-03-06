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
        const { toggle, onSave, toggleModalEdit } = this.props;
		const activeItem = this.state.activeItem;
		
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Item</ModalHeader>
                <ModalBody>
                    <Form>
						<FormGroup>
                            <Label for="title">Title</Label>
                            <Input 
                              type="text"
                              name="title"
                              value={activeItem.title}
                              onChange={this.handleChange}
                              placeholder="Enter Title"
                            />
                        </FormGroup>
						{(activeItem.type === "profexp" || activeItem.type === "climbingexp") &&
							<FormGroup>
								<Label for="place">Place</Label>
								<Input 
								  type="text"
								  name="place"
								  value={activeItem.place}
								  onChange={this.handleChange}
								  placeholder="Enter Place"
								/>
							</FormGroup>
						} 
						<FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                            type="text"
                            name="description"
                            value={activeItem.description}
                            onChange={this.handleChange}
                            placeholder="Enter description"
                            />
                        </FormGroup>
						{activeItem.type === "project" &&
							<FormGroup>
								<Label for="link">Link</Label>
								<Input 
								  type="text"
								  name="link"
								  value={activeItem.link}
								  onChange={this.handleChange}
								  placeholder="Enter Link"
								/>
							</FormGroup>
						}
						{activeItem.type === "climbingexp" &&
							<FormGroup>
								<Label for="picture">Picture</Label>
								<Input 
								  type="text"
								  name="picture"
								  value={activeItem.picture}
								  onChange={this.handleChange}
								  placeholder="Enter Picture"
								/>
							</FormGroup>
						}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => toggleModalEdit()}>
                        Cancel
                    </Button>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}