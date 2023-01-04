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
import 'antd/lib/menu/style/index.css'
import 'antd/lib/style/index.css'
import 'antd/lib/button/style/index.css'
import 'antd/lib/layout/style/index.css'
import 'antd/lib/table/style/index.css'
import 'antd/lib/form/style/index.css'
import 'antd/lib/input/style/index.css'
import 'antd/lib/pagination/style/index.css'
import 'antd/lib/date-picker/style/index.css'
import './helpers/equalArray'
import App from './App'

ReactDOM.render(<Provider store={ store }>
	<App />
</Provider>, document.getElementById('root'))
