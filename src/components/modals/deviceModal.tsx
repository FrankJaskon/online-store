import { observer } from 'mobx-react-lite'
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { FormState, UseFormRegister } from 'react-hook-form'
import { Info, TypeOrBrand } from '../../store/types'
import { REQUIRED } from '../../utils/validation'
import Specification from './specification'

interface FormValues {
    name: string
    price: number
    image: File[] | undefined
}

interface FormData extends FormValues {
    errorField?: string
    type?: string
    brand?: string
}

interface Props {
    title: string
    buttons: JSX.Element
    onSubmit: () => void
	onClose: () => void
    info: Info[]
	setInfo: React.Dispatch<React.SetStateAction<Info[]>>
    onChangeInfo: ( key: string, index: number, value: string ) => void
    removeInfo: ( id: number ) => void
    register: UseFormRegister<FormData>
    formState: FormState<FormData>
    device: any
	show: boolean
}

const DeviceModal = observer(({
    show, onClose, onSubmit,
    info, setInfo, onChangeInfo,
    removeInfo, title, register,
    formState: { errors }, device, buttons }: Props ) => {

    const addInfo = () => {
        setInfo([ ...info, { title: '', description: '', id: Date.now() }])
    }

	return (
		<Modal
			show={ show }
            onHide={ onClose }
			size='lg'
            aria-labelledby="contained-modal-title-vcenter"
			centered>
			<Modal.Header
                className='p-4'
                closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{ title }
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className='px-0'>
           <Form
                id='device_form'
                onSubmit={ onSubmit }>
                <div className='d-grid gap-3 mx-auto px-4'>
                    <Row>
                        <Col md={ 4 }>
                            <Dropdown className='d-flex'>
                                <Form.Label className='me-3'>Type:</Form.Label>
                                <Dropdown.Toggle style={{ width: '100%' }}>
                                    { device.selectedType?.name || 'Choose type' }
                                </Dropdown.Toggle>
                                <div>
                                    <Dropdown.Menu style={{ width: '100%' }}>
                                        { device.types.map(( item: TypeOrBrand ) => {
                                            return <Dropdown.Item
                                                key={ item?.name }
                                                onClick={() => device.setSelectedType( item )}>
                                                    { item?.name }
                                            </Dropdown.Item>
                                        }) }
                                    </Dropdown.Menu>
                                </div>
                                { errors.type && <Form.Text
                                    style={{ color: 'red', marginTop: '.5rem' }}
                                    className='d-block'>{ errors.type.message }</Form.Text> }
                            </Dropdown>
                            <Dropdown className='mt-2 d-flex'>
                                    <Form.Label className='me-3'>Brand:</Form.Label>
                                    <Dropdown.Toggle style={{ width: '100%' }}>
                                        { device.selectedBrand?.name || 'Choose brand' }
                                    </Dropdown.Toggle>
                                <div>
                                    <Dropdown.Menu style={{ width: '100%' }}>
                                        { device.brands.map(( item: TypeOrBrand ) => {
                                            return <Dropdown.Item
                                            key={ item?.name }
                                            onClick={() => device.setSelectedBrand( item )}>
                                                { item?.name }
                                            </Dropdown.Item>
                                        }) }
                                    </Dropdown.Menu>
                                </div>
                                { errors.brand && <Form.Text
                                    style={{ color: 'red', marginTop: '.5rem' }}
                                    className='d-block'>{ errors.brand.message }</Form.Text> }
                            </Dropdown>
                        </Col>
                    </Row>
                    <Form.Group controlId="deviceId">
                        <Row className='align-items-center'>
                            <Col md={ 4 }>
                                <Form.Label>Device name:</Form.Label>
                            </Col>
                            <Col md={ 8 }>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter new name"
                                    { ...register( 'name', {
                                        required: REQUIRED,
                                })} />
                                { errors.name && <Form.Text
                                    style={{ color: 'red', marginTop: '.5rem' }}
                                    className='d-block'>{ errors.name.message }</Form.Text> }
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="deviceId">
                        <Row className='align-items-center'>
                            <Col md={ 4 }>
                                <Form.Label>Device price:</Form.Label>
                            </Col>
                            <Col md={ 8 }>
                                <Form.Control
                                type="number"
                                { ...register( 'price', {
                                    required: REQUIRED,
                                })} />
                                { errors.price && <Form.Text
                                    style={{ color: 'red', marginTop: '.5rem' }}
                                    className='d-block'>{ errors.price.message }</Form.Text> }
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="deviceId">
                        <Row className='align-items-center'>
                            <Col md={ 4 }>
                                <Form.Label>Device image:</Form.Label>
                            </Col>
                            <Col md={ 8 }>
                                <Form.Control
                                    type="file"
                                    placeholder="Choose image"
                                    { ...register( 'image' )} />
                                    { errors.image && <Form.Text
                                        style={{ color: 'red', marginTop: '.5rem' }}
                                        className='d-block'>{ errors.image.message }</Form.Text> }
                            </Col>
                        </Row>
                    </Form.Group>
                    { errors.errorField && <Form.Text
                        style={{ color: 'red', marginTop: '.5rem' }}
                        className='d-block'>{ errors.errorField.message }</Form.Text> }
                    <Row>
                        <Col
                            md={{ span: 4, offset: 8 }}>
                            <Button
                                className='w-100'
                                onClick={ addInfo }>Add new feature to device</Button>
                        </Col>
                    </Row>
                    <Specification { ...{ info, onChangeInfo, removeInfo }} />
                </div>
            </Form>
			</Modal.Body>
            <hr className='m-0 mt-3' />
			<div className='p-4'>
                { buttons }
			</div>
		</Modal>
	)
})

export default DeviceModal