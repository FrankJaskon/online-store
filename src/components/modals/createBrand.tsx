import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { createBrand, fetchBrands } from '../../http/deviceApi'
import { Context } from '../../main'
import { REQUIRED } from '../../utils/validation'

interface Props {
	setMessage: React.Dispatch<React.SetStateAction<string>>
	show: boolean
	setIsNotification: () => void
	onHide: () => void
}

interface FormData {
	name: string
}

const CreateBrand = observer(({ show, onHide, setMessage, setIsNotification }: Props ) => {
	const { device } = useContext( Context )
	const { register, setError, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
		defaultValues: {
		name: '',
	}})

	const onSubmit = handleSubmit( async ({ name }) => {
        const response = await createBrand( name )

		if ( response.error ) {
			return setError( 'name',  { type: 'serverError', message: response.message })
		}
		setIsNotification()
		setMessage( 'Brand has been created successfully' )
		fetchBrands().then(({ brands }) => {
            device.setBrand( brands )
        }).catch(( e ) => {
            console.error( e )
        })
		onClose()
	})

	const onClose = () => {
		reset()
		onHide()
	}

	return (
		<Modal
			show={ show }
            onHide={ onClose }
            size='sm'
            aria-labelledby="contained-modal-title-vcenter"
			centered >
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Create new brand
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
            <Form
				id='brand_form'
				onSubmit={ onSubmit }>
                <Form.Group className="mb-3" controlId="brandId">
                    <Form.Label>Enter brand name</Form.Label>
                    <Form.Control
						type="text"
						placeholder='new brand'
						{ ...register( 'name', {
							required: REQUIRED,
							maxLength: {
								value: 20,
								message: "Max length is 20"
						}
					})} />
					{ errors.name && <Form.Text
						style={{ color: 'red', marginTop: '.5rem' }}
						className='d-block'>{ errors.name.message }</Form.Text> }
                </Form.Group>
            </Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='outline-danger'
					onClick={ onClose }>Close</Button>
				<Button
					form='brand_form'
					variant='outline-success'
					type='submit'>Add</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default CreateBrand