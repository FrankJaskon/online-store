import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import BasketDevice from '../components/basketDevice'
import Blank from '../components/blank'
import AppToast from '../components/toast'
import { Context } from '../main'
import { BasketDevice as BasketDeviceType } from '../store/basketStore'
import { Device } from '../store/types'
import { DEVICE_ROUTE } from '../utils/consts'
import { HEADER_HEIGHT } from '../utils/helper'

const Basket = observer((): JSX.Element => {
    const { basket } = useContext( Context )
    const [ notification, setNotification ] = useState<boolean>( false )

    const deviceList = basket.basketDevices?.map(( device: Device, index: number ) => {
        return <BasketDevice
            key={ device.id }
            device={ device }
            className={ index ? 'mt-3' : '' } />
    })

    const titleList = basket.basketDevices?.map(( device: BasketDeviceType ) => {
        return <li
            key={ device.id }
            className='d-flex justify-content-between'
            style={{ fontSize: 18 }}>
                <div>
                    <NavLink
                        to={ DEVICE_ROUTE + '/' + device.id }
                        style={{
                            textDecoration: 'none'
                        }}>{ device.name }</NavLink>
                    { device.count > 1 && ` x${ device.count }`}
                </div>
                <div style={{
                    whiteSpace: 'nowrap',
                    alignSelf: 'flex-end',
                }}><strong style={{ fontWeight: 500 }}>{ device.count * device.price } &#8372;</strong></div>
        </li>
    })

    const price = basket.basketDevices?.reduce(( accumulator: number, current: BasketDeviceType ) => {
        return accumulator + ( current.count * current.price)
    }, 0)

    if ( !basket.basketDevices?.length ) return <Container
        style={{
        height: window.innerHeight - HEADER_HEIGHT,
    }}><Blank /></Container>

    return <>
        <Container style={{
            height: window.innerHeight - HEADER_HEIGHT,
        }}>
            <Row className='p-4'>
                <Col
                    md={ 8 }
                    style={{
                        maxHeight: window.innerHeight - 105,
                        overflowY: 'auto',
                     }}>
                    { deviceList }
                </Col>
                <Col md={ 4 }>
                    <Card
                        border='light'
                        style={{
                            height: '100%',
                            maxHeight: window.innerHeight - 105 }}>
                        <Card.Header>
                            <Card.Title className='display-6'>Shop card</Card.Title>
                        </Card.Header>
                        <Card.Body
                            className='d-flex flex-column justify-content-between'>
                            <ul style={{
                                listStyleType: 'none',
                                padding: 0,
                            }}>
                                { titleList }
                            </ul>
                        </Card.Body>
                        <Card.Footer>
                            <div
                                className='d-flex justify-content-between'
                                style={{ fontSize: 24 }}>
                                Total price:
                                <strong style={{
                                    whiteSpace: 'nowrap',
                                }}>{ price } &#8372;</strong>
                            </div>
                            <Button
                                style={{
                                    marginTop: '1rem',
                                    width: '100%'
                                }}
                                onClick={() => setNotification( true ) }>Purchase</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
        { notification && <AppToast
            text='This feature is not available yet'
            position='bottom-end'
            callback={() => setNotification( false )} /> }
    </>
})

export default Basket