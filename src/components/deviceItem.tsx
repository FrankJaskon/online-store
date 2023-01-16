import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Context } from '../main'
import { Device, TypeOrBrand } from '../store/types'
import { DEVICE_ROUTE } from '../utils/consts'
import Rating from './rating'

interface Props {
    device: Device
}

const DeviceItem = observer(( {device: { id, name, rating, price, img, typeId, brandId  }}: Props ) => {
    const { device } = useContext( Context )
    const navigation = useNavigate()

    const handleClick = () => {
        navigation( DEVICE_ROUTE + '/' + id )
    }

    const type = device.types?.filter(( t: TypeOrBrand ) => t.id === typeId )[ 0 ]
    const brand = device.brands?.filter(( b: TypeOrBrand ) => b.id === brandId )[ 0 ]

    return (
        <Col md={ 3 }
             className='mb-3'
             onClick={ handleClick }>
            <Card border='light'>
                <Card.Img src={ import.meta.env.VITE_API_URL + img }
                          style={{
                            cursor: 'pointer',
                            height: '150px',
                            objectFit: 'contain' }} />
                <Card.Body>
                    <Card.Subtitle
                        className='text-black-50'
                        style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}>
                        { type?.name + ' ' + brand?.name }
                    </Card.Subtitle>
                    <div className='d-flex justify-content-between '>
                        <Card.Title
                            style={{
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                             }}
                            className='mt-2'>
                                { name }
                        </Card.Title>
                        <Rating rate={ rating } />
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
})

export default DeviceItem