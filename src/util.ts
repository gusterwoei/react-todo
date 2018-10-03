/**
import { Task } from './models/task';
 * @author Guster
 * @email seongwoei.chua@veltra.com
 * @create date 2018-09-27 10:20:04
 * @modify date 2018-09-27 10:20:04
*/

import { Task } from "./models/task";

export class Util {
   public static guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	public static getDummyTasks(): Task[] {
		let tasks: Task[] = []

		tasks.push(new Task('Normal weight text.'))
		tasks.push(new Task('Light weight text'))
		tasks.push(new Task('Italic text.'))
		tasks.push(new Task('Change a selection to our monospace font stack with .text-monospace.'))
		tasks.push(new Task('Font weight and italics'))
		tasks.push(new Task('Convey meaning through color with a handful of color utility classes.'))
		tasks.push(new Task('Contextual text classes also work well on anchors with the provided hover and focus states'))

		return tasks
	}
	
	public static isToday(date: Date, today: Date): any {
		return date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && date.getDate() == today.getDate()
	}
	
}