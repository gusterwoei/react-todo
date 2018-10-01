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
import * as dateformat from 'dateformat'
import FloatingActionButton from '../fab/fab';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { StorageService } from '../../services/storage-service';
import { Util } from '../../util';

interface State {
   data: TodoListModel[]
}

export default class TodoListPage extends Component<any, State> {

   constructor(props) {
      super(props)

      this.getTasks()
   }

   private getTasks() {
      // let tasks = Util.getDummyTasks()
      let tasks = StorageService.get().getTasks()
      let mData: TodoListModel[] = []

      // sort tasks by date descendingly
      tasks = tasks.sort((a, b) => {
         return b.datetime.getTime() - a.datetime.getTime()
      })

      let year: number, month: number, day: number
      tasks.forEach((task, index) => {
         if (task.datetime.getFullYear() !== year || task.datetime.getMonth() !== month || task.datetime.getDate() !== day) {
            // add header
            let header: TodoListModel = {}
            let today = new Date()

            // today
            if (Util.isToday(task.datetime, today)) {
               header.date = 'Today'
            } else {
               header.date = `${task.datetime.getFullYear()}/${task.datetime.getMonth() + 1}/${task.datetime.getDate()}`
            }

            year = task.datetime.getFullYear()
            month = task.datetime.getMonth()
            day = task.datetime.getDate()
            mData.push(header)
         }

         // add list model
         let model: TodoListModel = {}
         model = {}
         model.id = index
         model.task = task
         mData.push(model)
      })

      this.state = {
         data: mData
      }
   }

   render() {
      return (
         <div className='page-root todo-list-page'>
            <AppToolbar title='React Todo' history={this.props.history} />
            <div className='page-content'>

               {/* placeholder */}
               {!this.state.data || this.state.data.length == 0 ?
                  <p className='text-center placeholder'>No task for you today :)</p>
                  : null
               }

               {/* tasks */}
               {this.state.data.map(item =>
                  <div key={item.date ? item.date : item.id}>
                     {item.date ?
                        // date header
                        <h5 className='mt-3 ml-1'>{item.date}</h5>
                        :
                        // task item
                        <Link to={{ pathname: '/detail', state: { task: item.task } }}>
                           <div className='card p-3 mb-2 list-item' style={{ 'backgroundColor': item.task.completed ? '#EEE' : null }}>
                              <div className='row align-middle d-flex flex-row justify-content-end pr-3 pl-3'>
                                 {/* title */}
                                 <span className='flex-grow-1'>
                                    {item.task.completed ?
                                       <del>{item.task ? item.task.title : ''}</del> :
                                       item.task ? item.task.title : ''
                                    }
                                 </span>

                                 <span>{item.task ? dateformat(item.task.datetime, 'hh:MM TT') : ''}</span>

                                 {/* complete flag */}
                                 {/* <div style={{ 'minWidth': '36px' }}>
                                    {item.task.completed ?
                                       <i className="fas fa-check-circle pl-3 check-icon" /> :
                                       null
                                    }
                                 </div> */}

                              </div>
                           </div>
                        </Link>
                     }
                  </div>
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
