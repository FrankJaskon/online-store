import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { Context } from '../../main'
import { Info } from '../../store/types'

const CreateDevice = observer(( { show, onHide }: any ) => {
    const { device } = useContext( Context )
    const [ info, setInfo ] = useState<Info[]>( [] )

    const addInfo = () => {
        setInfo([ ...info, { title: '', description: '', id: Date.now() }])
    }

    const removeInfo = ( id: number ) => {
        setInfo( info.filter( item => item.id !== id ))
    }

    const sendData = () => {
        // some action
    }

	return (
		<Modal
			show={ show }
            onHide={ onHide }
			size="lg"
            aria-labelledby="contained-modal-title-vcenter"
			centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Create new type
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
           <Form>
                <div className='d-grid gap-3 mt-4 mx-auto'
                     style={{ width: 400 }}>
                    <Dropdown>
                        <Dropdown.Toggle style={{ width: '100%' }}>Choose device type</Dropdown.Toggle>
                        <Dropdown.Menu style={{ width: '100%' }}>
                            { device.types.map(( item: any ) => {
                                return <Dropdown.Item key={ item.id }>{ item.name }</Dropdown.Item>
                            }) }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle style={{ width: '100%' }}>Choose device brand</Dropdown.Toggle>
                        <Dropdown.Menu style={{ width: '100%' }}>
                            { device.brands.map(( item: any ) => {
                                return <Dropdown.Item key={ item.id }>{ item.name }</Dropdown.Item>
                            }) }
                        </Dropdown.Menu>
                    </Dropdown>
                    <hr />
                    <Form.Group controlId="deviceId">
                        <Row className='align-items-center'>
                            <Col md={ 4 }>
                                <Form.Label>Device name:</Form.Label>
                            </Col>
                            <Col md={ 8 }>
                                <Form.Control type="text" placeholder="Enter new name" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="deviceId">
                        <Row className='align-items-center'>
                            <Col md={ 4 }>
                                <Form.Label>Device price:</Form.Label>
                            </Col>
                            <Col md={ 8 }>
                                <Form.Control type="number" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="deviceId">
                        <Row className='align-items-center'>
                            <Col md={ 4 }>
                                <Form.Label>Device image:</Form.Label>
                            </Col>
                            <Col md={ 8 }>
                                <Form.Control type="file" placeholder="Choose image" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <hr />
                    <Button onClick={ addInfo }>Add new feature to device</Button>
                    { info.map( item =>  <Row className='align-items-center'
                                key={ item.id }>
                            <Col md={ 4 }>
                                <Form.Control type="text" placeholder="Name" />
                            </Col>
                            <Col md={ 4 }>
                                <Form.Control type="text" placeholder="Description" />
                            </Col>
                            <Col md={ 4 }>
                                <Button variant='outline-danger'
                                        onClick={ () => removeInfo( item.id as number ) }
                                        style={{ width: '100%' }}>Remove</Button>
                            </Col>
                        </Row>
                    ) }
                </div>
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
})

export default CreateDevice