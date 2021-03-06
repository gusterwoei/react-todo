/**
 * @author Guster
 * @email seongwoei.chua@veltra.com
 * @create date 2018-09-27 10:00:22
 * @modify date 2018-09-27 10:00:22
 * @desc Task
*/

import { Util } from "../util";

export class Task {
	id: string
	title: string
	note: string
	datetime: Date
	subtasks: { title: string, completed?: boolean }[] = []
	completed: boolean = false
	
	constructor(title: string) {
		this.title = title
		this.datetime = new Date()
		this.id = Util.guid()
	}
}