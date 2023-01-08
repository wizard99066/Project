require('bowser/bowser')
require('intersection-observer')
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import {
	Provider
}from 'react-redux'
import store from './store'
import './helpers/equalArray'
import App from './App'

ReactDOM.render(<Provider store={ store }>
	<App />
</Provider>, document.getElementById('root'))
