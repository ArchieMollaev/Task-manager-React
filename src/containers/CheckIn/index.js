import React from 'react'
import Form from 'components/ReduxForm'
import { BrowserRouter as Router, Route, Link, Switch, NavLink, Redirect } from 'react-router-dom'
import './style.scss'

export default class CheckIn extends React.Component {
	render = () => (
		<div id="registration">
			<Form formId="checkIn"
            form="checkIn"
            f1name="login" f2name="email" f3name="password" f4name="password2"
						placeholder1="Login" placeholder2="email" placeholder3="password" placeholder4="accept password"
            comp1="input" comp2="input" comp3="input" comp4="input"
            type2="email" type3="password" type4="password"
            showField3="block" showField4="block"
            submitBtnTitle="submit" secondBtnTitle="<back" 
            secondBtnFunc={ () => this.props.history.push('/') } />
		</div>
	)
}
