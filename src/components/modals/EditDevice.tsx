import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { fetchBrands, fetchOneDevice, fetchTypes, updateDevice } from '../../http/deviceApi'
import { Context } from '../../main'
import { Device, Info, TypeOrBrand } from '../../store/types'
import { REQUIRED } from '../../utils/validation'

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
	setMessage: React.Dispatch<React.SetStateAction<string>>
	show: boolean
	setIsNotification: () => void
	onHide: () => void
}

const fetchDeviceData = ( device: any, id: number ) => {
    fetchOneDevice( id ).then(({ device: item }) => {
        device.setSelectedDevice( item )
    })
    fetchTypesAndBrands( device )
}

const fetchTypesAndBrands = ( device: any ) => {
    fetchTypes().then(({ types }) => {
        device.setType( types )
        device.setSelectedType( types.filter(( t: TypeOrBrand ) => t.id === device.device.typeId )[ 0 ])
    }).catch(( e ) => {
        console.error( e )
    })
    fetchBrands().then(({ brands }) => {
        device.setBrand( brands )
        device.setSelectedBrand( brands.filter(( b: TypeOrBrand ) => b.id === device.device.brandId )[ 0 ])
    }).catch(( e ) => {
        console.error( e )
    })
    return () => {
        device.setSelectedType( {} )
        device.setSelectedBrand( {} )
    }
}

const EditDevice = observer(( { show, onHide, setMessage, setIsNotification }: Props ) => {
    const { device } = useContext( Context )
    const [ info, setInfo ] = useState<Info[]>( device.device?.info )

    const defaultValues: FormValues = {
        name: device.device.name,
        price: device.device.price,
        image: undefined,
    }

    const { register, setError, handleSubmit,
            formState: { errors }, clearErrors,
            reset } = useForm<FormData>({ defaultValues })

    // FORM

	const onSubmit = handleSubmit( async ({ name, price, image }) => {
        const formData = new FormData()
        formData.append( 'name', name )
        formData.append( 'price', price.toString())
        if ( image ) formData.append( 'img', image[ 0 ])
        formData.append( 'info', JSON.stringify( info ))
        formData.append( 'typeId', device.selectedType.id )
        formData.append( 'brandId', device.selectedBrand.id )

        const response = await updateDevice( formData, device.device.id )

        if ( response.error ) {
            return setError( 'errorField',  { type: 'serverError', message: response.message })
        }
        fetchDeviceData( device, device.device.id )
        setIsNotification()
        setMessage( 'Device has been updated successfully' )
        onHide()
	})


    const onClose = () => {
        onHide()
        setInfo( device.device?.info )
        device.setSelectedType( device.types.filter(( t: TypeOrBrand ) => t.id === device.device.typeId )[ 0 ])
        device.setSelectedBrand( device.brands.filter(( b: TypeOrBrand ) => b.id === device.device.brandId )[ 0 ])
        reset()
    }

    // INFO

    const addInfo = () => {
        setInfo([ ...info, { title: '', description: '', id: Date.now() }])
    }

    const removeInfo = ( id: number ) => {
        setInfo( info.filter( item => item.id !== id ))
    }

    const onChangeInfo = ( key: string, number: number, value: string ) => {
        setInfo(( prev ) => prev.map(( info, index, arr ) => {
            if ( index === number ) {
                return { ...info, [ key ]: value }
            }
            return info
        }))
    }

    const specification = info.map(( item, index ) =>  <Row className='align-items-center'
            key={ item.id }>
        <Col md={ 4 }>
            <Form.Control
                type="text"
                placeholder="Info field (title: value)"
                value={ item.title }
                onChange={( e ) => onChangeInfo( 'title', index, e.target.value )} />
        </Col>
        <Col md={ 4 }>
            <Form.Control
                type="text"
                placeholder="Info field (title: value)"
                value={ item.description }
                onChange={( e ) => onChangeInfo( 'description', index, e.target.value )} />
        </Col>
        <Col md={ 4 }>
            <Button
                variant='outline-danger'
                onClick={ () => removeInfo( item.id as number ) }
                style={{ width: '100%' }}>Remove</Button>
        </Col>
    </Row> )

    useEffect(() => {
        const clear = fetchTypesAndBrands( device )
        return clear
    }, [])

	return (
		<Modal
			show={ show }
            onHide={ onClose }
			size="lg"
            aria-labelledby="contained-modal-title-vcenter"
			centered>
			<Modal.Header
                className='p-4'
                closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Update device
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className='px-0'>
           <Form
                id='device_form'
                onSubmit={ onSubmit }>
                <div className='d-grid gap-3 mx-auto px-4'>
                    <Row>
                        <Col md={ 4 }>
                            <Dropdown>
                                <Dropdown.Toggle style={{ width: '100%' }}>
                                    { device.selectedType.name || 'Choose device type' }
                                </Dropdown.Toggle>
                                <div>
                                    <Dropdown.Menu style={{ width: '100%' }}>
                                        { device.types.map(( item: TypeOrBrand ) => {
                                            return <Dropdown.Item
                                                key={ item.name }
                                                onClick={() => device.setSelectedType( item )}>
                                                    { item.name }
                                            </Dropdown.Item>
                                        }) }
                                    </Dropdown.Menu>
                                </div>
                                { errors.type && <Form.Text
                                    style={{ color: 'red', marginTop: '.5rem' }}
                                    className='d-block'>{ errors.type.message }</Form.Text> }
                            </Dropdown>
                            <Dropdown
                                className='mt-2'>
                                    <Dropdown.Toggle style={{ width: '100%' }}>
                                        { device.selectedBrand.name || 'Choose device brand' }
                                    </Dropdown.Toggle>
                                <div>
                                    <Dropdown.Menu style={{ width: '100%' }}>
                                        { device.brands.map(( item: TypeOrBrand ) => {
                                            return <Dropdown.Item
                                            key={ item.id }
                                            onClick={() => device.setSelectedBrand( item )}>
                                                { item.name }
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
                    { specification }
                </div>
            </Form>
			</Modal.Body>
            <hr className='m-0 mt-3' />
			<div className='p-4'>
                <Row>
                    <Col md={{ span: 4, offset: 8 }}>
                        <Button
                            form='device_form'
                            variant='outline-success'
                            type='submit'
                            className='w-100 px-0'>Send</Button>
                    </Col>
                </Row>
			</div>
		</Modal>
	)
})

export default EditDevice