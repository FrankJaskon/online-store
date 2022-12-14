import { Button, Form, Modal } from 'react-bootstrap'

const CreateType = ( { show, onHide }: any ) => {
    const sendData = () => {
        // some action
    }

	return (
		<Modal
			show={ show }
            onHide={ onHide }
			size="sm"
            aria-labelledby="contained-modal-title-vcenter"
			centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Create new device
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="typeId">
                    <Form.Label>Enter type name</Form.Label>
                    <Form.Control type="text" placeholder="new type" />
                </Form.Group>
            </Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger'
                        onClick={ onHide }>Close</Button>
				<Button variant='outline-success'
                        onClick={ sendData }>Add</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default CreateType