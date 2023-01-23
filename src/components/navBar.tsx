import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Navbar, Nav, Badge } from 'react-bootstrap'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import { NavLink, useNavigate } from 'react-router-dom'
import { fetchBasket } from '../http/basket'
import { Context } from '../main'
import { ADMIN_ROLE, ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'

const NavBar = observer( () => {
	const { user, basket } = useContext( Context )
	const navigate = useNavigate()

	const logOut = () => {
		user.setUser( {} )
		user.setIsAuth( false )
		localStorage.removeItem( 'token' )
		navigate( LOGIN_ROUTE )
	}

	useEffect(() => {
		user.isAuth && fetchBasket().then(({ devices: { count, rows: devices }, basketDevices }) => {
            basket.setBasketDevices( devices, basketDevices )
            basket.setTotalCount( count )
        }).catch(( e => {
			console.error( e )
		}))
	}, [ user.isAuth ])

	return (
		<header className="header">
			<Navbar bg="dark" variant="dark">
				<Container fluid>
					<NavLink
						reloadDocument
						to={ SHOP_ROUTE }
						style={{ color: '#fff', textDecoration: 'none' }}
						className='d-block px-3 py-2'>Brand logo</NavLink>
					{ <Nav className="ml-auto header_nav">
							{ user.isAuth
							? <>
								{ user.user.role === ADMIN_ROLE && <Button
									variant='outline-light'
									className='p-0'>
									<NavLink
										to={ ADMIN_ROUTE }
										style={{ textDecoration: 'none' }}
										className='d-block px-3 py-2'>Admin panel</NavLink>
								</Button> }
								<Button
									variant='outline-light'
									className='p-0 ms-2'>
									<NavLink
										to={ SHOP_ROUTE }
										style={{ textDecoration: 'none' }}
										className='d-block px-3 py-2'>Shop</NavLink>
								</Button>
								<Button
									variant='outline-light'
									className='p-0 ms-2'>
									<NavLink
										to={ BASKET_ROUTE }
										style={{ textDecoration: 'none' }}
										className='d-block px-3 py-2'>
										Card
										<Badge
											bg='primary'
											style={{
												marginLeft: '.5rem'
											}}>{ basket.totalCount }</Badge>
									</NavLink>
								</Button>
								<Button variant='outline-light'
										className='header_nav_btn ms-2 px-3 py-2'
										style={{ textDecoration: 'none' }}
										onClick={ logOut }>Exit</Button>
							</>
							: <Button
								variant='outline-light'
								className='header_nav_btn ms-2 p-0'>
								<NavLink
									to={ LOGIN_ROUTE }
									style={{ textDecoration: 'none' }}
									className='d-block px-3 py-2'>
									Authorization
								</NavLink>
							</Button> }
						</Nav>
					}
				</Container>
			</Navbar>
		</header>
	)
})

export default NavBar