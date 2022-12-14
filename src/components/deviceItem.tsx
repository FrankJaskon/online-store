import { observer } from 'mobx-react-lite'
import { Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Device } from '../store/types'
import { DEVICE_ROUTE } from '../utils/consts'

interface Props {
    device: Device
}

const DeviceItem = observer(( {device: { id, name, rating, price, img  }}: Props ) => {
    const navigation = useNavigate()

    const handleClick = () => {
        navigation( DEVICE_ROUTE + '/' + id )
    }
    return (
        <Col md={ 3 }
             className='mb-3'
             onClick={ handleClick }>
            <Card border='light'>
                <Card.Img src={ img }
                          style={{ cursor: 'pointer', maxHeight: '150px', objectFit: 'contain' }} />
                <Card.Body>
                    <Card.Subtitle className='d-flex justify-content-between text-black-50'>
                        Phone Samsung
                        <span style={{ cursor: 'pointer' }}
                              className='d-inline-flex align-items-center text-black'>{ rating }
                            <span className='icon-star-empty ms-1'></span>
                        </span>
                    </Card.Subtitle>
                    <Card.Title style={{ cursor: 'pointer' }}
                                className='mt-2'>{ name }</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    )
})

export default DeviceItem