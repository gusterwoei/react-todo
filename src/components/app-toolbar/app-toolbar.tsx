import * as React from 'react'
import { Component } from 'react'
import './app-toolbar.css'

interface Props {
   title?: string
}

export default class AppToolbar extends Component<Props> {

   constructor(props) {
      super(props)
   }

   public render() {
      return (
         <div className='d-sm-flex flex-row app-toolbar'>
            <div>{this.props.title}</div>
            <div className='flex-grow-1' />
            {/* <img alt='' src='../../logo.svg' /> */}
         </div>
      )
   }
}
