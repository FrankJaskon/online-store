import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import { Link, NavLink } from 'react-router-dom'
import { Context } from '../main'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'

const NavBar = observer( () => {
	const { user } = useContext( Context )
	return (
		<header className="header">
			<Navbar bg="dark" variant="dark">
				<Container fluid>
					<NavLink to={ SHOP_ROUTE }
							 style={{ color: '#fff' }}>Brand logo</NavLink>
					{ <Nav className="ml-auto header_nav">
							<Button variant='outline-light'><NavLink to={ SHOP_ROUTE }>Shop</NavLink></Button>
							{ user.isAuth ? <>
								<Button variant='outline-light'>
									<NavLink to={ ADMIN_ROUTE }>Admin panel</NavLink>
								</Button>
								<Button variant='outline-light' className='header_nav_btn ms-2'>Exit</Button>
							</>
							: <Button
								variant='outline-light'
								className='header_nav_btn'>
								<NavLink to={ LOGIN_ROUTE }>
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