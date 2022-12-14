import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateBrand from '../components/modals/createBrand'
import CreateDevice from '../components/modals/createDevice'
import CreateType from '../components/modals/createType'

const Admin = () => {
    const [ showedType, setShowedType ] = useState<boolean>( false )
    const [ showedBrand, setShowedBrand ] = useState<boolean>( false )
    const [ showedDevice, setShowedDevice ] = useState<boolean>( false )
    return (
        <Container>
            <div style={{ height: window.innerHeight - 54 }}
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
            <CreateType show={ showedType }
                        onHide={ () => setShowedType( false ) } />
            <CreateBrand show={ showedBrand }
                        onHide={ () => setShowedBrand( false ) } />
            <CreateDevice show={ showedDevice }
                        onHide={ () => setShowedDevice( false ) } />
        </Container>
    )
}

export default Admin