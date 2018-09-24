import * as React from 'react';
import './app.css';
import logo from '../../logo.svg';

export default class App extends React.Component {
	public render() {
		return (
		   <div className="App">
		      <header className="header">
		         <img src={logo} className="logo" alt="logo" />
		         <h1 className="title">Welcome to React</h1>
		      </header>
		      <p className="intro">
		         To get started, edit <code>src/App.tsx</code> and save to reload.
		      </p>
		   </div>
		);
	}
};