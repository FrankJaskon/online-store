import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import { Button, Col, Container, Image, Row, Table } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchOneDevice } from '../http/deviceApi'
import { Device, Info } from '../store/types'
import { HEADER_HEIGHT } from '../utils/helper'
import { fetchBasket, postBasketDevice } from '../http/basket'
import { ADMIN_ROLE, BASKET_ROUTE } from '../utils/consts'
import Rating from '../components/rating'
import Blank from '../components/blank'
import CenteredSpinner from '../components/spinner'
import AppToast from '../components/toast'
import CreateRating from '../components/modals/rate'
import EditDevice from '../components/modals/EditDevice'

const DevicePage = observer(() => {
    const { user, device, basket } = useContext( Context )
    const navigation = useNavigate()
    const { id } = useParams()
    const [ isError, setIsError ] = useState<boolean>( false )
    const [ isLoading, setIsLoading ] = useState<boolean>( true )
    const [ isShownModal, setIsShownModal ] = useState<'edit' | 'grade'>()
    const [ notification, setNotification ] = useState<boolean>( false )
    const [ notificationText, setNotificationText ] = useState<string>( '' )

    useEffect(() => {
        fetchOneDevice( Number( id )).then(({ device: item }) => {
            device.setSelectedDevice( item )
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

    const closeModal = () => {
        setIsShownModal( undefined )
    }

    const addNotification = () => {
        setNotification( true )
    }

    const onClickRating = () => {
        if ( user.user.role === ADMIN_ROLE ) {
            setNotification( true )
            setNotificationText( 'Admin cannot influence rating' )
        } else {
            setIsShownModal( 'grade' )
        }
    }

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

        setNotificationText( 'Item added to shop card' )
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
                    className='mt-3 d-flex align-items-center'
                    style={{ background: '#fff' }}>
                    <Image src={ device.device?.img ? import.meta.env.VITE_API_URL + device.device.img : '' }
                        alt={ device.device?.name }
                        style={{ height: 'auto', maxWidth: '100%', maxHeight: 350 }}
                        className='d-block mx-auto' />
                </Col>
                <Col md={ 4 }
                    className='mt-3'>
                    <div
                        className='d-flex flex-column justify-content-between align-items-center'
                        style={{ height: 300 }}>
                        <h2 className='text-center'>{ device.device?.name }</h2>
                        <span
                            style={{ fontSize: 40 }}
                            onClick={ onClickRating }>
                            <Rating rate={ device.device?.rating } />
                        </span>
                    </div>
                </Col>
                <Col md={ 4 }
                    className='mt-3'>
                    <div className='d-flex flex-column justify-content-between align-items-center p-5'
                            style={{ height: '100%', backgroundColor: '#fff' }}>
                            <div>from { device.device?.price } &#8372;</div>
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
                        <h2
                            className='d-flex justify-content-between'
                            style={{ fontSize: 36, fontWeight: 700, color: '#000' }}><span>Specifications</span>
                            { user.user.role === ADMIN_ROLE
                                && <Button
                                    variant='outline-primary'
                                    style={{ width: 200 }}
                                    onClick={() => setIsShownModal('edit')}>Edit device</Button> }
                        </h2>
                    </caption>
                    <tbody>
                        <tr style={{ display: 'none' }}></tr>
                        { sortInfo( device.device?.info ).map(( item: Info ) => {
                            return <tr key={ item.id }>
                                <td style={{ width: '40%' }}>{ item.title }:</td>
                                <td style={{ width: '60%', textAlign: 'left' }}>{ item.description }</td>
                            </tr>
                        }) }
                    </tbody>
                </Table>
            </div>

            <EditDevice
                show={ isShownModal === 'edit' }
                onHide={ closeModal }
                sortInfo={ sortInfo }
                setIsNotification={ addNotification }
                setMessage={ setNotificationText } />
            <CreateRating
                id={ device.device?.id as number }
                show={ isShownModal === 'grade' }
                onHide={ closeModal }
                setIsNotification={ addNotification }
                setMessage={ setNotificationText } />

            { notification && <AppToast text={ notificationText } callback={() => setNotification( false )} /> }

        </Container>
    )
})

export default DevicePage

const sortInfo = ( arr: Info[] ) => {
    const sortTemplate = ( a: string, b: string ) => {
        if ( a > b  ) {
            return -1
        }
        if ( a < b  ) {
            return 1
        }
        return 0
    }

    return [ ...arr ].sort(( a: Info, b: Info ) => sortTemplate( a.title, b.title ))
}