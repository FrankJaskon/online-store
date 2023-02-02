import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/appRouter'
import NavBar from './components/navBar'
import CenteredSpinner from './components/spinner'
import { check } from './http/userApi'
import { Context } from './main'
import { User } from './store/types'

const App = observer(() => {
	const { user } = useContext( Context )
	const [ loading, setLoading ] = useState<boolean>( true )

	useEffect(() => {
		check().then( data => {
			if ( data ) {
				user.setIsAuth( true )
				user.setUser( data as User )
			}
		}).finally(() => {
			setLoading( false )
		})
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