import Container from 'react-bootstrap/esm/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import { NavLink, useLocation } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'
// import { registration } from '../http/userApi'

const Auth = (): JSX.Element => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    const signIn = async () => {
        // const response = await registration()
    }

    return (
        <Container className='d-flex justify-content-center align-items-center auth'
                   style={{ height: window.innerHeight - 54 }} >
            <Card className='auth_inner p-5' style={{ width: '600px' }}>
                <h2 className='m-auto'>{ isLogin ? 'Authorization' : 'Registration' }</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control className='mt-3'
                                  placeholder='Enter your email' />
                    <Form.Control className='mt-3'
                                  placeholder='Enter your password' />
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                        { isLogin ? <div>Not have the account yet?
                                <NavLink to={ REGISTRATION_ROUTE }
                                        className='ms-2'>Sing up</NavLink></div>
                            : <div>Already have the account?
                                <NavLink to={ LOGIN_ROUTE }
                                        className='ms-2'>Sing in</NavLink></div>
                        }
                        <Button variant='outline-success'>{ isLogin ? 'Sing in' : 'Sing up' }</Button>
                    </div>
                </Form>
            </Card>
        </Container>
    )
}

export default Auth