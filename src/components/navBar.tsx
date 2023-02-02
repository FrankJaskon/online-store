import { useClickOutside } from '@mantine/hooks'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Navbar, Nav, Badge, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { fetchBasket } from '../http/basket'
import { logout } from '../http/userApi'
import { Context } from '../main'
import { User } from '../store/types'
import { ADMIN_ROLE, ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { HEADER_HEIGHT } from '../utils/helper'

const NavBar = observer(() => {
	const { user, basket } = useContext( Context )
	const [ extended, setExtended ] = useState<boolean>( false )
	const ref = useClickOutside(() => setExtended( false ))
	const navigate = useNavigate()

	const logOut = async () => {
		const response: any = await logout()
		if ( Number( response ) === 200 ) {
			user.setUser( {} as User )
			user.setIsAuth( false )
			localStorage.removeItem( 'token' )
			navigate( LOGIN_ROUTE )
		}
	}

	const onClickLink = ( path: string ) => {
		navigate( path )
		if ( extended ) setExtended( false )
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
			<Navbar
				style={{ minHeight: HEADER_HEIGHT }}
				bg="dark"
				variant="dark"
				collapseOnSelect
				expand="sm"
				expanded={ extended }
				onToggle={() => setExtended( !extended )}>
				<Container fluid>
					<NavLink
						reloadDocument
						to={ SHOP_ROUTE }
						style={{ color: '#fff', textDecoration: 'none' }}
						className='d-block px-3 py-2'>Brand logo</NavLink>
					<div className='d-flex align-items-center'>
						<div
							className='d-flex align-items-center d-sm-none me-2'
							onClick={() => onClickLink( BASKET_ROUTE ) }
							style={{ color: '#fff' }}>
							<span
								style={{ fontSize: 24 }}
								className='icon-cart' />
							<TotalCount total={ basket.totalCount } />
						</div>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					</div>
					<Navbar.Collapse
						ref={ ref }
						id="responsive-navbar-nav"
						className='justify-content-end'>
					{ <Nav className="ml-auto header_nav">
							{ user.isAuth
							? <>
								{ user.user.role === ADMIN_ROLE && <Button
									variant='outline-light'
									className='header-link p-0 mt-2 mt-sm-0'>
									<a
										onClick={() => onClickLink( ADMIN_ROUTE )}
										style={{ textDecoration: 'none' }}
										className='d-block px-3 py-2'>Admin panel</a>
								</Button> }
								<Button
									variant='outline-light'
									className='header-link p-0 ms-sm-2 mt-2 mt-sm-0'>
									<a
										onClick={() => onClickLink( SHOP_ROUTE )}
										style={{ textDecoration: 'none' }}
										className='d-block px-3 py-2'>Shop</a>
								</Button>
								<Button
									variant='outline-light'
									className='header-link p-0 ms-sm-2 mt-2 mt-sm-0'>
									<a
										onClick={() => onClickLink( BASKET_ROUTE )}
										style={{ textDecoration: 'none' }}
										className='d-block px-3 py-2'>
										Card
										<TotalCount total={ basket.totalCount } />
									</a>
								</Button>
								<Button variant='outline-light'
										className='header-link ms-sm-2 px-3 py-2 mt-2 mt-sm-0'
										style={{ textDecoration: 'none' }}
										onClick={ logOut }>Exit</Button>
							</>
							: <Button
								variant='outline-light'
								className='ms-sm-2 p-0 mt-2 mt-sm-0'>
								<NavLink
									to={ LOGIN_ROUTE }
									style={{ textDecoration: 'none' }}
									className='d-block px-3 py-2'>
									Authorization
								</NavLink>
							</Button> }
						</Nav>
					}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
})

export default NavBar

interface TotalProps {
	total: number
}

const TotalCount: React.FC<TotalProps> = ({ total }) => {
	return <Badge
		bg='primary'
		style={{
			marginLeft: '.5rem'
	}}>{ total }</Badge>
}