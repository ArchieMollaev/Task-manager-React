import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch, NavLink, Redirect } from 'react-router-dom'
import App from 'containers/App'
import LogIn from 'containers/LogIn'
import CheckIn from 'containers/CheckIn'
import storeData from 'store'
import 'styles/main.scss'

ReactDOM.render(
	<div id="app-window">
		<Provider store={ storeData }>
			<div>
				<Router>
						<div>
							<Switch>
								<Route exact path="/" component={ LogIn } />
								<Route exact path="/checkIn" component={ CheckIn } />
								<Route exact path="/:id" component={ App } />
							</Switch>
						</div>
				</Router>
	  	</div>
		</Provider>
	</div>,
document.getElementById('root')
)


