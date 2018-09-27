import * as React from 'react'
import { Component } from 'react';
import AppToolbar from '../app-toolbar/app-toolbar';
import './todo-detail-page.css';
import { Task } from '../../models/task';
import { unstable_batchedUpdates } from 'react-dom';

interface Props {
	task?: Task
}
interface State {
	task?: Task,
	subtaskTitle?: string
}

export default class TodoDetailPage extends Component<Props, State> {
	private mTask: Task = new Task('');
	private mSubTaskTitle: string = '';

	constructor(props) {
		super(props)

		if (props.location && props.location.state) {
			// come from <Link>
			this.mTask = props.location.state.task
		}

		this.state = {
			task: this.mTask
		}
	}

	private createSubtaskField(args: { title: string, completed?: boolean }, index?: number) {
		let elem =
			<div className='input-group mb-1'>
				<div className="input-group-prepend">
					<span className="input-group-text" id="basic-addon1">+</span>
				</div>
				<input
					type='text'
					placeholder='Add a subtask'
					className='form-control'
					value={args.title}
					onChange={e => {
						// subtask title
						if (index === undefined) {
							// from the empty field
							this.mSubTaskTitle = e.target.value
						} else {
							// when field is being edited
							args.title = e.target.value
						}
						this.refresh()
					}}
					onKeyDown={e => {
						if (e.keyCode != 13) return
						if (this.mSubTaskTitle.trim() == '') return

						// add subtask to list and create a new subtask field
						this.mTask.subtasks.push({ title: this.mSubTaskTitle })
						this.mSubTaskTitle = ''
						this.refresh()

						console.log('TASK', this.mTask)
					}} />
			</div>

		return elem
	}

	private refresh() {
		this.setState({
			task: this.mTask,
			subtaskTitle: this.mSubTaskTitle
		})
	}

	public render() {
		return (
			<div className='page-root todo-detail-page'>
				<AppToolbar title='Add a new task' />
				<div className='page-content'>
					<form>
						{/* title */}
						<div className='mb-3'>
							<input
								type='text'
								className='form-control title'
								placeholder='What would you like to do?'
								value={this.mTask ? this.mTask.title : ''}
								onChange={e => {
									// update title
									this.mTask.title = e.target.value

									this.refresh()
								}} />
						</div>

						{/* <hr /> */}

						{/* subtasks */}
						{
							this.mTask && this.mTask.subtasks && this.mTask.subtasks.length > 0 ?
								this.mTask.subtasks.map((item, index) =>
									this.createSubtaskField(item, index)
								) : null
						}
						{
							this.createSubtaskField({ title: this.mSubTaskTitle })
						}

					</form>
				</div>
			</div>
		)
	}
}
