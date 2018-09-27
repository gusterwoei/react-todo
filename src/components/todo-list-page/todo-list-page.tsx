/**
 * @author Guster
 * @email seongwoei.chua@veltra.com
 * @create date 2018-09-27 11:20:03
 * @modify date 2018-09-27 11:20:03
*/

import * as React from 'react';
import { Component } from 'react'
import './todo-list-page.css'
import AppToolbar from '../app-toolbar/app-toolbar';
import { TodoListModel } from '../interfaces/todo-list-model';
import { Util } from '../../util';
import * as dateformat from 'dateformat'
import FloatingActionButton from '../fab/fab';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

interface State {
	data: TodoListModel[]
}

export default class TodoListPage extends Component<any, State> {

	constructor(props) {
		super(props)

		this.getTasks()
	}

	private getTasks() {
		let tasks = Util.getDummyTasks()
		let mData: TodoListModel[] = []

		let year: number, month: number, day: number
		tasks.forEach((task, index) => {
			let model: TodoListModel = {}
			if (task.datetime.getFullYear() !== year || task.datetime.getMonth() !== month || task.datetime.getDate() !== day) {
				model.date = 'abc'

				year = task.datetime.getFullYear()
				month = task.datetime.getMonth()
				day = task.datetime.getDate()
			}

			model.id = index
			model.task = task
			mData.push(model)
		})

		this.state = {
			data: mData
		}
	}

	private addNewTask() {

	}

	render() {
		return (
			<div className='page-root todo-list-page'>
				<AppToolbar title='React Todo' />
				<div className='page-content'>
					<h2>Today Tasks</h2>

					{this.state.data.map(item =>
						<Link key={item.id} to={{ pathname: '/detail', state: { task: item.task } }}>
							<div className='card p-3 mb-3 list-item'>
								<div className='row align-middle d-flex flex-row pr-3 pl-3'>
									<span className='flex-grow-1'>{item.task ? item.task.title : ''}</span>
									<span>{item.task ? dateformat(item.task.datetime, 'hh:MM TT') : ''}</span>
									<div><i className="fas fa-check-circle pl-3 check-icon" /></div>
								</div>
							</div>
						</Link>
					)}

					{/* FAB */}
					<Link to='/detail'>
						<FloatingActionButton />
					</Link>

				</div>
			</div>
		)
	}
}
