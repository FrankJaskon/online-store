import { Button, Form, Modal } from 'react-bootstrap'

const CreateBrand = ( { show, onHide }: any ) => {
    const sendData = () => {
        // some action
    }

	return (
		<Modal
			show={ show }
            onHide={ onHide }
            size='sm'
            aria-labelledby="contained-modal-title-vcenter"
			centered >
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Create new type
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="brandId">
                    <Form.Label>Enter brand name</Form.Label>
                    <Form.Control type="text" placeholder="new brand" />
                </Form.Group>
            </Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger'
                        onClick={ onHide }>Close</Button>
				<Button variant='outline-success'
                        type='submit' onClick={ sendData }>Add</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default CreateBrand