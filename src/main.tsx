import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import DeviceStore from './store/deviceStore'
import UserStore from './store/userStrore'
import BasketStore from './store/basketStore'
import './css/bootstrap.css'
import './css/icons.css'
import './css/style.css'
import './css/media.css'

interface Store {
	user: UserStore
	device: DeviceStore
	basket: BasketStore
}

const rootStore: Store = {
	user: new UserStore,
	device: new DeviceStore,
	basket: new BasketStore,
}

export const Context = createContext<Store>( rootStore )

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Context.Provider value={ rootStore }>
		<App />
		</Context.Provider>
	</React.StrictMode>,
)
