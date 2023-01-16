import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Card, CloseButton, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { decrementCount, fetchBasket, incrementCount, removeItem } from '../http/basket'
import { Context } from '../main'
import { Device } from '../store/types'
import { DEVICE_ROUTE } from '../utils/consts'
import CountBar from './countBar'
import Rating from './rating'

interface Props {
    device: Device
    className?: string
    style?: React.CSSProperties
}

interface incrOrDecrFunc {
    (deviceId: number): Promise<any>
}

const changeCountGetAll = async ( func: incrOrDecrFunc, basket: any, id: number ) => {
    const response = await func( id )

    if ( response.error ) {
        return console.error( response.message )
    }

    if ( response.removed ) {
        return basket.removeBasketDevice( id )
    }

    basket.setDeviceCount( response.basketDevice.deviceId, response.basketDevice.count )
}

const BasketDevice = observer(({ device: { id, name, rating, price, img }, className, style }: Props ) => {
    const { basket } = useContext( Context )
    const navigation = useNavigate()
    const basketItem = basket.getBasketDevice( id )

    const handleClick = () => {
        navigation( DEVICE_ROUTE + '/' + id )
    }

    const onClickIncrement = async () => {
        changeCountGetAll( incrementCount, basket, id as number )
    }

    const onClickDecrement = async () => {
        changeCountGetAll( decrementCount, basket, id as number )
    }

    const removeBasketItem = async () => {
        const response = await removeItem( id as number )

        if ( response.error ) {
            return console.error( response.message )
        }
        basket.removeBasketDevice( id )
    }

    return <Card
        border='light'
        className={ className ? className : '' }
        style={ style ? style : undefined }>
        <Card.Body>
            <Row>
                <Col md={ 7 }>
                    <Row>
                        <Col md={ 4 }>
                            <Card.Img
                                src={ import.meta.env.VITE_API_URL + img }
                                style={{
                                    cursor: 'pointer',
                                    height: '120px',
                                    objectFit: 'contain', }}
                                    onClick={ handleClick } />
                        </Col>
                        <Col
                            md={ 8 }
                            className='d-flex flex-column justify-content-between'>
                            <Card.Title
                                style={{ cursor: 'pointer' }}
                                onClick={ handleClick }>{ name }</Card.Title>
                            <Card.Subtitle className='d-flex justify-content-between text-black-50'>
                                Phone Samsung
                            </Card.Subtitle>
                            <Rating rate={ rating } />
                        </Col>
                    </Row>
                </Col>
                <Col
                    md={ 3 }
                    className='d-flex align-items-center'>
                    <CountBar number={ basketItem.count } incrementFunc={ onClickIncrement } decrementFunc={ onClickDecrement } />
                </Col>
                <Col
                    md={ 2 }
                    className='d-flex flex-column justify-content-between'
                    style={{ fontSize: '1.2rem' }}>
                    <CloseButton
                        className='align-self-end'
                        onClick={ removeBasketItem } />
                    <strong>{ price } &#8372;</strong>
                </Col>
            </Row>
        </Card.Body>
    </Card>
})

export default BasketDevice