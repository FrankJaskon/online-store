import { observer } from 'mobx-react-lite'
import { Button, Form, Modal } from 'react-bootstrap'
import { createType } from '../../http/deviceApi'
import { useForm } from 'react-hook-form'
import { REQUIRED } from '../../utils/validation'

interface FormData {
	name: string
}

const CreateType = observer(( { show, onHide }: any ) => {
	const { register, setError, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
		defaultValues: {
		name: '',
	}})

	const onSubmit = handleSubmit( async ({ name }) => {
        const response = await createType( name )

		if ( response.error ) {
			return setError( 'name',  { type: 'serverError', message: response.message })
		}

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
            aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Create new device
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form
					id='type_form'
					onSubmit={ onSubmit }>
					<Form.Group className='mb-3' controlId='typeId'>
						<Form.Label>Enter type name</Form.Label>
						<Form.Control
							type='text'
							placeholder='new type'
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
					form='type_form'
					variant='outline-success'
					type='submit'>Add</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default CreateType