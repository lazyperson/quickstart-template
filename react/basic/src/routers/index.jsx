import React from 'react';
import { HashRouter as Router, Switch, Redirect, Route, NavLink } from 'react-router-dom';
import history from '@commons/history';

import Home from '../containers/home';
import User from '../containers/user';

import classes from './style.less';

export default class Routers extends React.Component {
	render() {
		return (
			<Router history={history}>
				<main className={classes.main}>
					<nav className={classes.nav}>
						<h1>React Web</h1>
						<NavLink to="/home" activeClassName={classes.active}>Home</NavLink>
						<NavLink to="/user" activeClassName={classes.active}>User</NavLink>
					</nav>

					<section className={classes.content}>
						<Switch>
							<Route path="/home" component={Home} />
							<Route path="/user" component={User} />
							<Redirect form="/" to="/home" />
						</Switch>
					</section>
				</main>
			</Router>
		);
	}
}
