import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Navbar, Nav, Badge } from 'react-bootstrap'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import { NavLink } from 'react-router-dom'
import { fetchBasket } from '../http/basket'
import { Context } from '../main'
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'

const NavBar = observer( () => {
	const { user, basket } = useContext( Context )

	const logOut = () => {
		user.setUser( {} )
		user.setIsAuth( false )
		localStorage.removeItem( 'token' )
	}

	useEffect(() => {
		fetchBasket().then(({ devices: { count, rows: devices }, basketDevices }) => {
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
						to={ SHOP_ROUTE }
						style={{ color: '#fff' }}
						className='d-block px-3 py-2'>Brand logo</NavLink>
					{ <Nav className="ml-auto header_nav">
							<Button
								variant='outline-light'
								className='p-0'>
								<NavLink
									to={ SHOP_ROUTE }
									className='d-block px-3 py-2'>Shop</NavLink>
							</Button>
							{ user.isAuth ? <>
								<Button
									variant='outline-light'
									className='p-0 ms-2'>
									<NavLink
										to={ ADMIN_ROUTE }
										className='d-block px-3 py-2'>Admin panel</NavLink>
								</Button>
								<Button
									variant='outline-light'
									className='p-0 ms-2'>
									<NavLink
										to={ BASKET_ROUTE }
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
										onClick={ logOut }>Exit</Button>
							</>
							: <Button
								variant='outline-light'
								className='header_nav_btn ms-2 p-0'>
								<NavLink
									to={ LOGIN_ROUTE }
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