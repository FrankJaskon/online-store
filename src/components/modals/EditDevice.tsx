import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { fetchBrands, fetchOneDevice, fetchTypes, removeDevice, updateDevice } from '../../http/deviceApi'
import { Context } from '../../main'
import { Info, TypeOrBrand } from '../../store/types'
import { SHOP_ROUTE } from '../../utils/consts'
import DeviceModal from './deviceModal'

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
    sortInfo: ( arr: Info[] ) => Info[]
}

const EditDevice = observer(( { show, onHide, setMessage, setIsNotification, sortInfo }: Props ) => {
    const { device } = useContext( Context )
    const [ info, setInfo ] = useState<Info[]>( sortInfo( device.device?.info ))
    const navigate = useNavigate()

    const defaultValues: FormValues = {
        name: device.device.name,
        price: device.device.price,
        image: undefined,
    }

    const { register, setError, handleSubmit, formState, reset } = useForm<FormData>({ defaultValues })

	const onSubmit = handleSubmit( async ({ name, price, image }) => {
        const formData = new FormData()
        formData.append( 'name', name )
        formData.append( 'price', price.toString())
        if ( image ) formData.append( 'img', image[ 0 ])
        formData.append( 'info', JSON.stringify( info.map( i => {
            return { ...i, title: i.title.trim(), description: i.description.trim() }
        })))
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

    const onRemoveDevice = async () => {
        const response = await removeDevice( device.device.id )

        if ( response.error ) {
            return console.error( response.message )
        }

        setIsNotification()
        setMessage( response.message )
        onHide()
        setTimeout(() => {
            navigate( SHOP_ROUTE )
        }, 500 )
    }

    const removeInfo = ( id: number ) => {
        setInfo( info.filter( item => item.id !== id ))
    }

    const onChangeInfo = ( key: string, number: number, value: string ) => {
        setInfo(( prev ) => prev.map(( info, index ) => {
            if ( index === number ) {
                return { ...info, [ key ]: value }
            }
            return info
        }))
    }

    const buttons = <Row>
        <Col md={{ span: 6, offset: 6 }}>
            <Row>
                <Col md={ 6 }>
                    <Button
                        form='device_form'
                        variant='danger'
                        onClick={ onRemoveDevice }
                        className='w-100 px-0'>Remove device</Button>
                </Col>
                <Col md={ 6 }>
                    <Button
                        form='device_form'
                        variant='success'
                        type='submit'
                        className='w-100 px-0'>Send</Button>
                </Col>
            </Row>
        </Col>
    </Row>

    useEffect(() => {
        fetchTypesAndBrands( device )

        return () => {
            device.setSelectedType( {} )
            device.setSelectedBrand( {} )
        }
    }, [])

    const props = {
        title: 'Update device',
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

export default EditDevice

const fetchDeviceData = ( device: any, id: number ) => {
    fetchOneDevice( id ).then(({ device: item }) => {
        device.setSelectedDevice( item )
    })
    fetchTypesAndBrands( device )
}

const fetchTypesAndBrands = async ( device: any ) => {
    try {
        const typeResponse = await fetchTypes()
        device.setType( typeResponse.types )
        device.setSelectedType( typeResponse.types.filter(( t: TypeOrBrand ) => t.id === device.device.typeId )[ 0 ])

        const brandResponse = await fetchBrands()
        device.setBrand( brandResponse.brands )
        device.setSelectedBrand( brandResponse.brands.filter(( b: TypeOrBrand ) => b.id === device.device.brandId )[ 0 ])
    } catch( e ) {
        console.error( e )
    }
}