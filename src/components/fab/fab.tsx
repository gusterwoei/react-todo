/**
 * @author Guster
 * @email seongwoei.chua@veltra.com
 * @create date 2018-09-27 11:47:59
 * @modify date 2018-09-27 11:47:59
 * @desc Floating Action Button
*/

import * as React from 'react';
import { Component } from 'react';
import './fab.css'

interface Props {
	// onClick?: (e) => any
}

export default class FloatingActionButton extends Component<Props> {
	render() {
		return (
			<div className='fab'>
				<div className="fab-wrapper">
					<i className="fa fa-plus my-float" />
				</div>
			</div>
		)
	}
}
