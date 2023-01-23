import { observer } from 'mobx-react-lite'
import { useContext, useState, useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceApi'
import { Context } from '../../main'
import { Info } from '../../store/types'
import DeviceModal from './deviceModal'

interface FormData {
    name: string,
    price: number,
    image: File[] | undefined,
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
    const { register, setError, handleSubmit, formState, reset, clearErrors } = useForm<FormData>({
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
        image && formData.append( 'img', image[ 0 ] )
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
        setInfo( [] )
        reset()
    }

    const onClose = () => {
        resetForm()
        onHide()
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

    const buttons = <Row>
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

    useEffect(() => {
        fetchTypes().then(({ types }) => {
            device.setType( types )
        }).catch(( e ) => {
            console.error( e )
        })
        fetchBrands().then(({ brands }) => {
            device.setBrand( brands )
        }).catch(( e ) => {
            console.error( e )
        })
    }, [])

    const props = {
        title: 'Create new device',
        device,
        show,
        info,
        setInfo,
        onChangeInfo,
        removeInfo,
        buttons,
        register,
        formState,
        onClose,
        onSubmit,
    }

    return <DeviceModal { ...props } />
})

export default CreateDevice