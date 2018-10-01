/**
 * @author Guster
 * @email seongwoei.chua@veltra.com
 * @create date 2018-07-12 05:15:33
 * @modify date 2018-07-12 05:15:33
 * 
 * @description A lightweight pub-sub event broadcast machanism, you can use this to emit and listen to custom events
 * globally throughout the app.
 *  
 * How to use?
 * -----------
 * 1. Register an object as an observer(event listener) via register(), then create a function decorated with @Subscribe()
 *      eg. @Subscribe() onEvent(event: AppEvent) { ... }
 * 2. Emit an event via post() or postSticky()
 * 3. Optionally, you can un-register an observer via unregister()
*/

import { AppEvent } from "./app-event";
import { Util } from "../util";

const META_KEY = 'eventBusMeta'
let META_VALUE: string = 'eventBusValue'
const META_METHOD_NAME = 'methodName'
export function Subscribe() {
    return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
        target[META_KEY] = true
        target[META_VALUE] = Util.guid()
        target[META_METHOD_NAME] = descriptor.value
    };
}

export class EventBus {
    private static _instance: EventBus
    private mObservers = {}
    private mStickyEvents: {[s: string]: AppEvent} = {}

    public static get(): EventBus {
        if (EventBus._instance == null) {
            EventBus._instance = new EventBus()
        }

        return this._instance
    }

    private constructor() { }

    /**
     * Register an object as an observer
     * 
     * @param observer any object with @Subscribe method defined
     */
    public register(observer: object) {
        // make sure the object has a method annotated with @subscribe
        let hasKey = observer[META_KEY]
        if (!hasKey) {
            throw 'EventBus subscriber must have at least 1 method annotated with @Subscribe'
        }

        if (this.mObservers[observer[META_VALUE]]) {
            console.info(`Subscriber already exists: ${observer[META_VALUE]}, abort.`)
            return
        }

        this.mObservers[observer[META_VALUE]] = observer

        // emit all sticky events
        for (let i in this.mStickyEvents) {
            let item = this.mStickyEvents[i]
            this.post(item)
            
            // remove the stick event after posting
            delete this.mStickyEvents[item._id]
        }
    }

    /**
     * Unregister an existing observer from the observer list
     * 
     * @param observer any object with @Subscribe method defined
     */
    public unregister(observer: object) {
        let hasKey = observer[META_KEY]

        if (!hasKey) return

        delete this.mObservers[observer[META_VALUE]]
    }

    /**
     * Emit an event to all the subscribed observers
     * 
     * @param event AppEvent
     */
    public post(event: AppEvent) {
        for (let key in this.mObservers) {
            let observer = this.mObservers[key]
            observer[META_METHOD_NAME](event)
        }
    }

    /**
     * Emit an event to all the subscribed observers and also the future subscribers.
     * However, once the event has been emitted it will be removed immediately
     * 
     * @param event AppEvent
     */
    public postSticky(event: AppEvent) {
        this.mStickyEvents[event._id] = event

        this.post(event)
    }
}