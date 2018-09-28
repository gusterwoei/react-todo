import * as React from 'react'
import { Component } from 'react'
import './app-toolbar.css'
import { Link, RouterHistory } from 'react-router-dom'

interface Props {
	title?: string,
	showBackButton?: boolean,
	history: RouterHistory
}

export default class AppToolbar extends Component<Props> {
	constructor(props) {
		super(props)
	}

	private goBack() {
		this.props.history.goBack()
	}

	public render() {
		return (
			<div className='d-flex flex-row align-middle app-toolbar'>
				{this.props.showBackButton ?
					<div className='pr-3 pl-1 back-button' onClick={e => this.goBack()}>
						<i className='fa fa-arrow-left' />
					</div>
					: null
				}
				<div>{this.props.title}</div>
				{/* <div className='flex-grow-1' /> */}
			</div>
		)
	}
}