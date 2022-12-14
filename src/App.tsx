import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/appRouter'
import NavBar from './components/navBar'

const App = () => {
	return (
		<BrowserRouter>
			<NavBar />
			<div style={{ backgroundColor: '#eee' }}>
				<AppRouter />
			</div>
		</BrowserRouter>
	)
}

export default App