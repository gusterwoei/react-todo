import * as React from 'react'
import { Component } from 'react'
import './app-toolbar.css'
import { RouterHistory } from 'react-router-dom'

interface Props {
	title?: string,
	showBackButton?: boolean,
	history: RouterHistory
	faIcon?: string,
	onRightIconClick?: (e) => any
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
				<div className='flex-grow-1'>{this.props.title}</div>
				<div className='right-icon' onClick={this.props.onRightIconClick ? this.props.onRightIconClick : null}>
					<i className={this.props.faIcon} />
				</div>
			</div>
		)
	}
}