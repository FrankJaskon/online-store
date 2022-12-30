import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import BasketDevice from '../components/basketDevice'
import { Context } from '../main'
import { Device } from '../store/types'
import { HEIGHTHEADER } from '../utils/helper'

const Basket = observer((): JSX.Element => {
    const { basket } = useContext( Context )

    const deviceList = basket.basketDevices?.map(( device: Device, index: number ) => {
        return <BasketDevice
            key={ device.id }
            device={ device }
            className={ index ? 'mt-3' : '' } />
    })

    const titleList = basket.basketDevices?.map(( device: Device ) => {
        return <li
            key={ device.id }
            className='d-flex justify-content-between'
            style={{ fontSize: 18 }}>
                <div>{ device.name }</div>
                <div style={{
                    whiteSpace: 'nowrap',
                }}>{ device.price } &#8372;</div>
        </li>
    })

    const price = basket.basketDevices?.reduce(( accumulator: number, current: Device ) => accumulator + current.price, 0 )

    return (
        <Container style={{
            height: window.innerHeight - HEIGHTHEADER,
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
                                <span style={{
                                    whiteSpace: 'nowrap',
                                }}>{ price } &#8372;</span>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
})

export default Basket