import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from 'containers/App'
import storeData from 'store'
import 'styles/main.scss'

ReactDOM.render(
	<div id="app-window">
		<Provider store={ storeData }>
			<div>
	  			<App />
	  	</div>
		</Provider>
	</div>,
document.getElementById('root')
)


