import * as React from 'react';
import { Component } from 'react'
import './todo-list-page.css'
import AppToolbar from '../app-toolbar/app-toolbar';

export default class TodoListPage extends Component {

   public render() {
      return (
         <div className='todo-list-page'>
            <AppToolbar title='My Todo' />
            <div className='page-content'>
               <h2>Home</h2>
            </div>
         </div>
      )
   }
}
