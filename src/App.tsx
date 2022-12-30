import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/appRouter'
import NavBar from './components/navBar'
import CenteredSpinner from './components/spinner'
import { fetchBasket } from './http/basket'
import { check } from './http/userApi'
import { Context } from './main'

const App = observer(() => {
	const { user, basket } = useContext( Context )
	const [ loading, setLoading ] = useState<boolean>( true )

	useEffect(() => {
		check().then( data => {
			if ( data ) {
				user.setUser( data )
				user.setIsAuth( true )
			}
		}).finally(() => {
			setLoading( false )
		})

		fetchBasket().then(({ devices: { count, rows } }) => {
            basket.setBasketDevices( rows )
            basket.setTotalCount( count )
        }).catch(( e => {
			console.error( e )
		}))
	}, [])

	if ( loading ) {
		return <CenteredSpinner fullWindow />
	}

	return (
		<BrowserRouter>
			<NavBar />
			<div style={{ backgroundColor: '#eee' }}>
				<AppRouter />
			</div>
		</BrowserRouter>
	)
})

export default App