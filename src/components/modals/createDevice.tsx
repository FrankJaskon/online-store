import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceApi'
import { Context } from '../../main'
import { Info, TypeOrBrand } from '../../store/types'
import { REQUIRED } from '../../utils/validation'
import CenteredSpinner from '../spinner'

interface FormData {
    name: string,
    price: number,
    image: File[],
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

const CreateDevice = observer(( { show, onHide, setMessage, setIsNotification }: Props ) => {
    const { device } = useContext( Context )
    const [ info, setInfo ] = useState<Info[]>( [] )
    const [ field, setField ] = useState<string[]>( [] )
    const [ loading, setLoading ] = useState<'t' | 'b' | ''>( '' )
    const { register, setError, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<FormData>({
		defaultValues: {
            name: '',
            price: 0,
            image: undefined,
	}})

    // FORM

	const onSubmit = handleSubmit( async ({ name, price, image }) => {
        const formData = new FormData()
        formData.append( 'name', name )
        formData.append( 'price', price.toString())
        formData.append( 'img', image[ 0 ] )
        formData.append( 'info', JSON.stringify( info ))
        formData.append( 'typeId', device.selectedType.id )
        formData.append( 'brandId', device.selectedBrand.id )

        const response = await createDevice( formData )

        if ( response.error ) {
            return setError( 'errorField',  { type: 'serverError', message: response.message })
        }
        setIsNotification()
        setMessage( 'Device has been created successfully' )
        resetForm()
        onHide()
	})

    const resetForm = () => {
        device.setSelectedType( {} )
        device.setSelectedBrand( {} )
        setField( [] )
        setInfo( [] )
        reset()
    }

    const onClose = () => {
        resetForm()
        onHide()
    }

    const onClickType = async () => {
		setLoading( 't' )
        await fetchTypes().then(({ types }) => {
            device.setType( types )
        })
		setLoading( '' )
    }

    const onClickBrand = async () => {
		setLoading( 'b' )
        await fetchBrands().then(({ brands }) => {
            device.setBrand( brands )
        })
		setLoading( '' )
    }

    // INFO

    const addInfo = () => {
        setInfo([ ...info, { title: '', description: '', id: Date.now() }])
        setField([ ...field, '' ])
    }

    const removeInfo = ( id: number ) => {
        setInfo( info.filter( item => item.id !== id ))
    }

    const onChangeInfo = ( value: string, number: number ) => {
        setField([ ...field.slice( 0, number ), value, ...field.slice( number + 1 )])
    }

    const onSaveInfo = () => {
        field.map(( f, number ) => {
            const arr = f.split( ':' )
            const [ title, description ] = arr
            setInfo( prev => {
                if ( arr.length <= 1 ) {
                    setError( 'errorField', { type: 'Custom error', message: 'Symbol ":" is required' })
                    return prev
                }
                return prev.map(( inf, index ) => {
                    if ( index === number ) return {
                        ...inf, [ 'title' ]: title?.trim(),
                        [ 'description' ]: description?.trim()
                    }
                    return inf
                })
            })
        })
    }

    const specification = info.map(( item, index )=>  <Row className='align-items-center'
            key={ item.id }>
        <Col md={ 8 }>
            <Form.Control
                type="text"
                placeholder="Info field (title: value)"
                value={ field[ index ] }
                onChange={( e ) => onChangeInfo( e.target.value, index )} />
        </Col>
        <Col md={ 4 }>
            <Button
                variant='outline-danger'
                onClick={() => removeInfo( item.id as number )}
                className='w-100 mt-sm-2 mt-md-0' >Remove</Button>
        </Col>
    </Row> )

	return (
		<Modal
			show={ show }
            onHide={ onClose }
			size="lg"
            aria-labelledby="contained-modal-title-vcenter"
			centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Create new device
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
           <Form
                id='device_form'
                onSubmit={ onSubmit }>
                <div className='d-grid gap-3 mt-4 mx-auto px-4'>
                    <Col md={ 6 }>
                        <Dropdown onClick={ onClickType }>
                            { loading === 't'
                                ? <Button style={{ width: '100%' }}><CenteredSpinner border /></Button>
                                : <Dropdown.Toggle
                                    style={{ width: '100%' }}>{ device.selectedType.name || 'Choose device type' }
                                </Dropdown.Toggle> }
                            <div style={{ display: loading === 't' ? 'none' : 'block' }}>
                                <Dropdown.Menu style={{ width: '100%' }}>
                                    { device.types.map(( item: TypeOrBrand ) => {
                                        return <Dropdown.Item
                                            key={ item.name }
                                            onClick={ () => device.setSelectedType( item ) }>
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
                            onClick={ onClickBrand }
                            className='mt-2'>
                            { loading === 'b'
                                ? <Button style={{ width: '100%' }}><CenteredSpinner border /></Button>
                                : <Dropdown.Toggle
                                    style={{ width: '100%' }}>{ device.selectedBrand.name || 'Choose device brand' }
                                </Dropdown.Toggle> }
                            <div style={{ display: loading === 'b' ? 'none' : 'block' }}>
                                <Dropdown.Menu style={{ width: '100%' }}>
                                    { device.brands.map(( item: TypeOrBrand ) => {
                                        return <Dropdown.Item
                                        key={ item.id }
                                        onClick={ () => device.setSelectedBrand( item ) }>
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
                                    { ...register( 'image', {
                                        required: REQUIRED,
                                    })} />
                                    { errors.image && <Form.Text
                                        style={{ color: 'red', marginTop: '.5rem' }}
                                        className='d-block'>{ errors.image.message }</Form.Text> }
                            </Col>
                        </Row>
                    </Form.Group>
                    { errors.errorField && <Form.Text
                        style={{ color: 'red', marginTop: '.5rem' }}
                        className='d-block'>{ errors.errorField.message }</Form.Text> }
                    <Col
                        md={ 8 }
                        style={{ marginLeft: 'auto' }}
                        className='text-end'>
                        <Button onClick={ addInfo }>Add new feature to device</Button>
                    </Col>
                    { specification }
                    { specification.length
                        ?  <Col
                            md={ 8 }
                            style={{ marginLeft: 'auto' }}
                            className='text-end'><Button onClick={ onSaveInfo }>Save specification</Button>
                        </Col>
                        : undefined }
                </div>
            </Form>
			</Modal.Body>
			<hr className='m-0 mt-3' />
			<div className='p-4'>
                <Row>
                    <Col md={{ span: 4, offset: 8 }}>
                        <Row>
                            <Col md={ 4 }>
                                <Button
                                variant='outline-danger'
                                className='w-100 px-0'
                                onClick={ resetForm }>Clean</Button>
                            </Col>
                            <Col md={ 4 }>
                                <Button
                                    variant='outline-primary'
                                    className='w-100 px-0'
                                    onClick={ () => clearErrors() }>Edit</Button>
                            </Col>
                            <Col md={ 4 }>
                                <Button
                                    form='device_form'
                                    variant='outline-success'
                                    type='submit'
                                    className='w-100 px-0'
                                    style={{ marginRight: 0 }}>Send</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
			</div>
		</Modal>
	)
})

export default CreateDevice