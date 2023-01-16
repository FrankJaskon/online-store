import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import { Button, Col, Container, Image, Row, Table } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchOneDevice } from '../http/deviceApi'
import { Device } from '../store/types'
import { HEADER_HEIGHT } from '../utils/helper'
import { fetchBasket, postBasketDevice } from '../http/basket'
import { BASKET_ROUTE } from '../utils/consts'
import Rating from '../components/rating'
import Blank from '../components/blank'
import CenteredSpinner from '../components/spinner'
import AppToast from '../components/toast'

const DevicePage = observer(() => {
    const navigation = useNavigate()
    const { basket } = useContext( Context )
    const { id } = useParams()
    const [ item, setItem ] = useState<Device>({
        id: 0,
        img: undefined,
        name: '',
        price: 0,
        rating: 0,
        info: [],
        typeId: 0,
        brandId: 0,
    })
    const [ isError, setIsError ] = useState<boolean>( false )
    const [ isLoading, setIsLoading ] = useState<boolean>( true )
    const [ notification, setNotification ] = useState<boolean>( false )

    useEffect(() => {
        fetchOneDevice( Number( id ) ).then(({ device }) => {
            setItem( device )
        }).catch(() => {
            setIsError( true )}
        ).finally(() => {
            setIsLoading( false )
        })
    }, [])

    if ( isLoading ) return <CenteredSpinner border fullWindow />

    if ( isError ) return <Container
        fluid
        style={{ minHeight: window.innerHeight - HEADER_HEIGHT }}><Blank />
    </Container>

    const onClick = async ( id: number ) => {
        const response = await postBasketDevice( id )

        if ( response.error ) {
			return console.error( response.message )
		}

        fetchBasket().then(({ devices: { count, rows: devices }, basketDevices }) => {
            basket.setBasketDevices( devices, basketDevices )
            basket.setTotalCount( count )
        }).catch(( e => {
            console.error( e )
        }))

        setNotification( true )
    }

    return (
        <Container fluid
                   style={{
                        minHeight: window.innerHeight - HEADER_HEIGHT,
                        overflow: 'auto',
                        position: 'relative',
                    }}>
            <Row>
                <Col md={ 4 }
                    className='mt-3'
                    style={{ background: '#fff' }}>
                    <div style={{ width: 300, height: 300, margin: '0 auto' }}>
                        <Image src={ item?.img ? import.meta.env.VITE_API_URL + item.img : '' }
                            alt={ item.name }
                            style={{ height: '100%', width: 'auto' }}
                            className='d-block mx-auto' />
                    </div>
                </Col>
                <Col md={ 4 }
                    className='mt-3'>
                    <div className='d-flex flex-column justify-content-between align-items-center'
                        style={{ height: 300 }}>
                        <h2 className='text-center'>{ item.name }</h2>
                        <div style={{
                            position: 'relative',
                            height: '100%', }}>
                            <Rating
                                rate={ item.rating }
                                star={{
                                    justStar: true,
                                    fontSize: '150px',
                            }} />
                            <div style={{
                                width: '100%',
                                fontSize: '2rem',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate( -50%, -50% )',
                                textAlign: 'center',
                            }}>{ item.rating }</div>
                        </div>
                    </div>
                </Col>
                <Col md={ 4 }
                    className='mt-3'>
                    <div className='d-flex flex-column justify-content-between align-items-center p-5'
                            style={{ height: '100%', backgroundColor: '#fff' }}>
                            <div>from { item.price } &#8372;</div>
                            { basket.basketDevices.filter(( d: Device ) => d.id === Number( id )).length
                                ? <Button
                                    variant='outline-dark'
                                    style={{ width: '100%' }}
                                    onClick={() => navigation( BASKET_ROUTE )}>Check card</Button>
                                : <Button
                                    variant='outline-dark'
                                    style={{ width: '100%' }}
                                    onClick={() => onClick( Number( id )) }>Add to card</Button> }
                    </div>
                </Col>
            </Row>
            <div className='mt-3 px-5'>
                <Table striped
                    variant='light'
                    style={{width: '100%' }}>
                    <caption style={{ captionSide: 'top' }}>
                        <h2 style={{ fontSize: 36, fontWeight: 700, color: '#000' }}>Specifications</h2></caption>
                    <tbody>
                        <tr style={{ display: 'none' }}></tr>
                        { item.info?.map( ( item: any ) => {
                            return <tr key={ item.id }>
                                <td style={{ width: '40%' }}>{ item.title }:</td>
                                <td style={{ width: '60%', textAlign: 'left' }}>{ item.description }</td>
                            </tr>
                        }) }
                    </tbody>
                </Table>
            </div>

            { notification && <AppToast text='Item added to shop card' callback={() => setNotification( false )} /> }

        </Container>
    )
})

export default DevicePage