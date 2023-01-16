import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './css/bootstrap.css'
import './css/icons.css'
import App from './App'
import DeviceStore from './store/deviceStore'
import UserStore from './store/userStrore'
import BasketStore from './store/basketStore'

export const Context = createContext<any>( null )

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Context.Provider value={{
			user: new UserStore,
			device: new DeviceStore,
			basket: new BasketStore,
		}}>
		<App />
		</Context.Provider>
	</React.StrictMode>,
)
