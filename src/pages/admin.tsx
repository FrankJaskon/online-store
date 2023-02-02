import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import CreateBrand from '../components/modals/createBrand'
import CreateDevice from '../components/modals/createDevice'
import CreateType from '../components/modals/createType'
import CenteredSpinner, { delay } from '../components/spinner'
import AppToast from '../components/toast'
import { Context } from '../main'
import { ADMIN_ROLE, SHOP_ROUTE } from '../utils/consts'
import { HEADER_HEIGHT } from '../utils/helper'

const Admin = observer((): JSX.Element => {
    const { user } = useContext( Context )
    const navigate = useNavigate()

    const [ loading, setLoading ] = useState<boolean>( true )
    const [ shownType, setShownType ] = useState<boolean>( false )
    const [ shownBrand, setShownBrand ] = useState<boolean>( false )
    const [ shownDevice, setShownDevice ] = useState<boolean>( false )
    const [ notification, setNotification ] = useState<boolean>( false )
    const [ notificationText, setNotificationText ] = useState<string>( '' )

    useEffect(() => {
        delay(() => setLoading( false ))
    }, [])


    if ( loading ) return <CenteredSpinner border fullWindow />
    if ( !user.isAuth && user.user.role !== ADMIN_ROLE ) navigate( SHOP_ROUTE )

    return <Container
        fluid
        className='position-relative'>
            <div style={{ height: window.innerHeight - HEADER_HEIGHT }}
                 className='d-flex justify-content-center align-items-center'>
                <div className='d-grid gap-2'
                     style={{ width: 300 }}>
                    <Button size='lg'
                            variant='outline-dark'
                            onClick={ () => setShownType( true ) }>Add type</Button>
                    <Button size='lg'
                            variant='outline-dark'
                            onClick={ () => setShownBrand( true ) }>Add brand</Button>
                    <Button size='lg'
                            variant='outline-dark'
                            onClick={ () => setShownDevice( true ) }>Add device</Button>
                </div>
            </div>
        <CreateType
            show={ shownType }
            onHide={ () => setShownType(false) }
            setIsNotification={ () => setNotification( true ) }
            setMessage={ setNotificationText } />
        <CreateBrand
            show={ shownBrand }
            onHide={ () => setShownBrand(false) }
            setIsNotification={ () => setNotification( true ) }
            setMessage={ setNotificationText } />
        <CreateDevice
            show={ shownDevice }
            onHide={ () => setShownDevice(false) }
            setIsNotification={ () => setNotification( true ) }
            setMessage={ setNotificationText } />
        { notification && <AppToast text={ notificationText } callback={() => setNotification( false )} /> }
    </Container>
})

export default Admin