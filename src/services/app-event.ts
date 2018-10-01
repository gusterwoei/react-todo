/**
 * @author Guster
 * @email seongwoei.chua@veltra.com
 * @create date 2018-07-12 04:47:43
 * @modify date 2018-07-12 04:47:43
 * App Event specific for this application
*/

import { Util } from '../util';

export enum EventName {
    HIDE_MODAL = 'HIDE_MODAL',
    SHOW_MODAL = 'SHOW_MODAL',
}

export class AppEvent {
    _id: string
    name: EventName
    args: any = {}

    constructor(name: EventName, args?: any) {
        this._id = Util.guid()
        this.name = name
        this.args = args ? args : this.args
    }
}
