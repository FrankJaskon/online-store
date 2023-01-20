import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { createRating, fetchOneDevice } from '../../http/deviceApi'
import { Context } from '../../main'
import { REQUIRED } from '../../utils/validation'

interface Props {
	setMessage: React.Dispatch<React.SetStateAction<string>>
	show: boolean
	setIsNotification: () => void
	onHide: () => void
    id: number
}

interface FormData {
	rating: number | undefined
}

const CreateRating = observer(({ show, onHide, setMessage, setIsNotification, id }: Props ) => {
    const { device } = useContext( Context )
	const { register, setError, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>({
		defaultValues: {
		    rating: undefined,
	}})

    const watchRating = watch( 'rating', 5 )

	const onSubmit = handleSubmit( async ({ rating }) => {
        const response = await createRating( Number( rating ), id )

		if ( response.error ) {
			return setError( 'rating',  { type: 'serverError', message: response.message })
		}
        const { device: item } = await fetchOneDevice( id )
        device.setSelectedDevice( item )
		setIsNotification()
		setMessage( 'Thanks that have left your rating' )
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
					Choose your rating
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
            <Form
				id='brand_form'
				onSubmit={ onSubmit }>
                <Form.Group className="mb-3" controlId="brandId">
                    <Form.Label>Rating: { watchRating }</Form.Label>
                    <Form.Range
                    min={ 0 }
                    max={ 10 }
                    step={ 0.5 }
						{ ...register( 'rating', {
							required: REQUIRED,
							min: {
								value: 0,
								message: 'Rating cannot be less than 0',
						    },
                            max: {
								value: 10,
								message: 'Rating cannot be more than 10',
						    }
					})} />
					{ errors.rating && <Form.Text
						style={{ color: 'red', marginTop: '.5rem' }}
						className='d-block'>{ errors.rating.message }</Form.Text> }
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

export default CreateRating