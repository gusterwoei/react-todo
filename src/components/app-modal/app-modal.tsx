/**
 * @author Guster
 * @email seongwoei.chua@veltra.com
 * @create date 2018-10-01 09:28:24
 * @modify date 2018-10-01 09:28:24
 * @desc App modal
*/

import * as React from 'react';
import { Component } from "react";
import { EventBus, Subscribe } from '../../services/event-bus';
import { AppEvent, EventName } from '../../services/app-event';

interface Props {
   title?: string,
   body?: string,
   negativeButtonText?: string
   onNegativeButtonClick?: (e) => any
   positiveButtonText?: string
   onPositiveButtonClick?: (e) => any
}

export default class AppModal extends Component<Props> {

   @Subscribe()
   public onEvent(event: AppEvent) {
      switch (event.name) {
         case EventName.HIDE_MODAL:
            this.hide()
            break;
         case EventName.SHOW_MODAL:
            this.show()
            break;
      }
   }

   componentWillMount() {
      EventBus.get().register(this)
   }

   componentWillUnmount() {
      EventBus.get().unregister(this)
   }

   public show() {
      let modal = $('#myModal')
      modal['modal']('show')
   }

   public hide() {
      let modal = $('#myModal')
      modal['modal']('hide')
   }

   public render() {
      return (
         <div id='myModal' className="modal fade" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">{this.props.title}</h5>
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  {this.props.body && this.props.body.trim() != '' ?
                     <div className="modal-body">
                        <p>{this.props.body}</p>
                     </div>
                     : null
                  }
                  <div className="modal-footer">
                     <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={this.props.onNegativeButtonClick ? this.props.onNegativeButtonClick : e => {
                           this.hide()
                        }}>
                        {this.props.negativeButtonText ? this.props.negativeButtonText : 'Close'}
                     </button>
                     <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.props.onPositiveButtonClick ? this.props.onPositiveButtonClick : null}>
                        {this.props.positiveButtonText ? this.props.positiveButtonText : 'Save changes'}
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
