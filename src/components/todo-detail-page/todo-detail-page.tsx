import * as React from 'react'
import { Component } from 'react';
import AppToolbar from '../app-toolbar/app-toolbar';
import './todo-detail-page.css';
import { Task } from '../../models/task';
import { StorageService } from '../../services/storage-service';
import { RouterHistory } from 'react-router-dom';
import AppModal from '../app-modal/app-modal';
import { EventBus } from '../../services/event-bus';
import { AppEvent, EventName } from '../../services/app-event';

interface Props {
   task?: Task,
   history?: RouterHistory
}
interface State {
   task?: Task,
   subtaskTitle?: string
}

export default class TodoDetailPage extends Component<Props, State> {
   private mTask: Task
   private mSubTaskTitle: string = ''
   mIsNewTask: boolean = false;

   constructor(props) {
      super(props)

      if (props.location && props.location.state) {
         // come from <Link>
         this.mTask = props.location.state.task
      } else {
         this.mTask = new Task('')
         this.mIsNewTask = true
      }

      this.state = {
         task: this.mTask
      }
   }

   private createSubtaskField(args: { title: string, completed?: boolean }, index?: number) {
      let elem =
         <div key={index} className='input-group mb-1'>
            <div className="input-group-prepend">
               <span className="input-group-text" id="basic-addon1">+</span>
            </div>
            <input
               type='text'
               placeholder='Add a subtask'
               className='form-control'
               value={args.title}
               disabled={this.mTask.completed}
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

   private deleteTask() {
      StorageService.get().deleteTask(this.mTask)
      this.props.history.goBack()

      // emitting an event to AppModal to hide
      EventBus.get().post(new AppEvent(EventName.HIDE_MODAL))
   }

   private toggleComplete() {
      this.mTask.completed = !this.mTask.completed
      StorageService.get().saveTask(this.mTask)

      this.refresh()
   }

   private submit(e) {
      try {
         if (this.mTask.title.trim() == '') {
            throw new ErrorEvent('Title must not be empty')
         }

         // add the remaining subtask if any
         if (this.mSubTaskTitle.trim() != '') {
            this.mTask.subtasks.push({ title: this.mSubTaskTitle })
         }

         // save to the local storage
         StorageService.get().saveTask(this.mTask)

         this.props.history.goBack()
      } catch (err) {
         alert(err.type)
      }
   }

   public render() {
      return (
         <div className='page-root todo-detail-page'>
            {/* toolbar */}
            <AppToolbar
               title={this.mIsNewTask ? 'Add a new task' : 'Update task'}
               showBackButton={true}
               history={this.props.history}
               faIcon={this.mIsNewTask ? null : 'far fa-trash-alt'}
               onRightIconClick={e => {
                  // toggle the delete dialog modal
                  let modal = $('#myModal')
                  modal['modal']('toggle')
               }} />

            <div className='page-content'>
               <div className="input-group mb-3">
                  <div className="input-group-prepend">
                     <div className="input-group-text">
                        {/* complete checkbox */}
                        {!this.mIsNewTask ? 
                           <input type='checkbox' checked={this.mTask.completed} onChange={e => this.toggleComplete()} /> :
                           null
                        }
                     </div>
                  </div>

                  {/* title */}
                  <input
                     type='text'
                     className='form-control title'
                     placeholder='What would you like to do?'
                     required={true}
                     disabled={this.mTask.completed}
                     value={this.mTask ? this.mTask.title : ''}
                     onChange={e => {
                        // update title
                        this.mTask.title = e.target.value
                        this.refresh()
                     }} />
               </div>

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

               {/* notes */}
               <textarea className='note' placeholder='Add a note' value={this.mTask.note} rows={6} onChange={e => {
                  this.mTask.note = e.target.value
                  this.refresh()
               }} />

               {/* submit button */}
               <button className='btn btn-primary mt-3 btn-submit' onClick={e => this.submit(e)} disabled={this.mTask.completed}>
                  {this.mIsNewTask ? 'Complete' : 'Update'}
               </button>

               {/* delete modal */}
               <AppModal
                  title={`"${this.mTask.title}" will be deleted forever.`}
                  body='You will not be able to undo this action.'
                  positiveButtonText='Delete'
                  onPositiveButtonClick={e => this.deleteTask()} />
            </div>
         </div>
      )
   }
}
