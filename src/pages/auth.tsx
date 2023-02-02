import Container from 'react-bootstrap/esm/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { login, registration } from '../http/userApi'
import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../main'
import CenteredSpinner, { delay } from '../components/spinner'
import { useForm } from 'react-hook-form'
import { INCORRECTEMAIL, REQUIRED, SHORTPASSWORD } from '../utils/validation'
import { HEADER_HEIGHT } from '../utils/helper'

interface FormData {
    email: string
    password: string
}

const Auth = observer((): JSX.Element => {
    const { user } = useContext( Context )
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const { register, setError, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
		defaultValues: {
            email: '',
            password: '',
	}})

	const onSubmit = handleSubmit( async ({ email, password }) => {
        setLoading( true )
        let response: any
        if ( isLogin ) {
            response = await login( email, password )
        } else {
            response = await registration( email, password )
        }
        setLoading( false )
        if ( response?.error ) {
            return setError( 'password',  { type: 'serverError', message: response.message })
        }
        user.setUser( response )
        user.setIsAuth( true )
        navigate( SHOP_ROUTE )
	})

    const [ loading, setLoading ] = useState<boolean>( false )
    const [ pageLoading, setPageLoading ] = useState<boolean>( true )

    const button = loading ? <CenteredSpinner /> : isLogin ? 'Sing in' : 'Sing up'

    useEffect(() => {
        delay(() => setPageLoading( false ))
        return () => setPageLoading( true )
    }, [ location ])

    if ( pageLoading ) return <CenteredSpinner border fullWindow />

    return (
        <Container className='d-flex justify-content-center align-items-center auth'
                   style={{ height: window.innerHeight - HEADER_HEIGHT }} >
            <Card className='auth_inner p-5' style={{ width: '600px' }}>
                <h2 className='m-auto'>{ isLogin ? 'Authorization' : 'Registration' }</h2>
                <Form
                    id='auth_form'
                    onSubmit={ onSubmit }
                    className='d-flex flex-column'
                    noValidate>
                    <Form.Control
                        className='mt-3'
                        placeholder='Enter your email'
                        type='email'
                        { ...register( 'email',
                        {
							required: REQUIRED,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: INCORRECTEMAIL,
                            }
                        }
                        )}
                     />
                    { errors.email && <Form.Text
						style={{ color: 'red', marginTop: '.5rem' }}
						className='d-block'>{ errors.email.message }
                    </Form.Text> }
                    <Form.Control
                        className='mt-3'
                        placeholder='Enter your password'
                        type='password'
                        { ...register( 'password', {
							required: REQUIRED,
                            minLength: {
                                value: 8,
                                message: SHORTPASSWORD,
                            },
                        })}
                    />
                    { errors.password && <Form.Text
						style={{ color: 'red', marginTop: '.5rem' }}
						className='d-block'>{ errors.password.message }
                    </Form.Text> }
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                        { isLogin ? <div>
                                Not have the account yet?
                                <span onClick={() => reset() }>
                                    <NavLink to={ REGISTRATION_ROUTE }
                                            className='ms-2'>Sing up</NavLink>
                                </span>
                            </div>
                            : <div>
                                Already have the account?
                                <span onClick={() => reset() }>
                                    <NavLink
                                        to={ LOGIN_ROUTE }
                                        className='ms-2'>Sing in</NavLink>
                                </span>
                            </div>
                        }
                        <Button
                            form='auth_form'
                            variant='outline-success'
                            type='submit'
                            disabled={ loading }>{ button }</Button>
                    </div>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth