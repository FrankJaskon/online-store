import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
	mode: 'development',
	plugins: [ svgr(), react() ],
	server: {
		hmr: false
	}
	// server: {
	// 	hmr: {
	// 		port: 443
	// 	}
	// }
})