import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import CreateBrand from '../components/modals/createBrand'
import CreateDevice from '../components/modals/createDevice'
import CreateType from '../components/modals/createType'
import AppToast from '../components/toast'
import { Context } from '../main'
import { LOGIN_ROUTE } from '../utils/consts'
import { HEADER_HEIGHT } from '../utils/helper'

const Admin = observer((): JSX.Element => {
    const { user } = useContext( Context )
    const navigate = useNavigate()

    const [ showedType, setShowedType ] = useState<boolean>( false )
    const [ showedBrand, setShowedBrand ] = useState<boolean>( false )
    const [ showedDevice, setShowedDevice ] = useState<boolean>( false )
    const [ notification, setNotification ] = useState<boolean>( false )
    const [ notificationText, setNotificationText ] = useState<string>( '' )

    if ( !user.isAuth ) navigate( LOGIN_ROUTE )
    return <Container
        fluid
        className='position-relative'>
            <div style={{ height: window.innerHeight - HEADER_HEIGHT }}
                 className='d-flex justify-content-center align-items-center'>
                <div className='d-grid gap-2'
                     style={{ width: 300 }}>
                    <Button size='lg'
                            variant='outline-dark'
                            onClick={ () => setShowedType( true ) }>Add type</Button>
                    <Button size='lg'
                            variant='outline-dark'
                            onClick={ () => setShowedBrand( true ) }>Add brand</Button>
                    <Button size='lg'
                            variant='outline-dark'
                            onClick={ () => setShowedDevice( true ) }>Add device</Button>
                </div>
            </div>
        <CreateType
            show={ showedType }
            onHide={ () => setShowedType(false) }
            setIsNotification={ () => setNotification( true ) }
            setMessage={ setNotificationText } />
        <CreateBrand
            show={ showedBrand }
            onHide={ () => setShowedBrand(false) }
            setIsNotification={ () => setNotification( true ) }
            setMessage={ setNotificationText } />
        <CreateDevice
            show={ showedDevice }
            onHide={ () => setShowedDevice(false) }
            setIsNotification={ () => setNotification( true ) }
            setMessage={ setNotificationText } />
        { notification && <AppToast text={ notificationText } callback={() => setNotification( false )} /> }
    </Container>
})

export default Admin