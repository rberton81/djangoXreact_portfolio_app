import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
	Container,

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
        const { toggle, toggleModalDetail } = this.props;
		const activeItem = this.state.activeItem;

		let detailsList = "";
		// Add title to details
		if(activeItem.title) {
			detailsList = <>{detailsList}<Container className="themed-container" fluid="md">
							<span	
							  className={`item-title mr-2 `}
							  title={activeItem.title}
							>
							{activeItem.title 
								? 'Title : ' + activeItem.title 
								: ''
							}
							</span>
							</Container></>;
		}
		// Add place to details
		
		if(activeItem.place) {
			detailsList = <>{detailsList}<Container className="themed-container" fluid="md">
							<span	
							  className={`item-place mr-2 `}
							  title={activeItem.place}
							>
							{activeItem.place 
								? 'Place : ' + activeItem.place 
								: ''
							}
							</span>
							</Container></>;
		}
		// Add description to details
		if(activeItem.description) {
			detailsList = <>{detailsList}<Container className="themed-container" fluid="md">
							<span
							  className={`item-description mr-2 `}
							  title={activeItem.description}
							>
							{activeItem.description 
								? 'Description : ' + activeItem.description 
								: ''
							}
							</span>	
							</Container></>;
		}
		// Add link to details
		if(activeItem.link) {
			detailsList = <>{detailsList}<Container className="themed-container" fluid="md">
							<span
							  className={`item-link mr-2 `}
							  title={activeItem.link}
							>
							  {activeItem.link 
								  ? 'Link : ' + activeItem.link 
								  : ''
							  }
							</span>
							</Container></>;
		}
		// Add picture to details
		if(activeItem.picture) {
			detailsList = <>{detailsList}<Container className="themed-container" fluid="md">
							<span	
							  className={`item-title mr-2 `}
							  title={activeItem.picture}
							>
							{activeItem.picture 
								? 'Picture : ' + activeItem.picture 
								: ''
							}
							</span>
							</Container></>;
		}
		
		
		
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Item</ModalHeader>
                <ModalBody>
					<Container className="themed-container">
					{detailsList}
					</Container>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => toggleModalDetail()}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}