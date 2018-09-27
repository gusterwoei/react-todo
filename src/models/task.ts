import { Util } from "../util";

/**
 * @author Guster
 * @email seongwoei.chua@veltra.com
 * @create date 2018-09-27 10:00:22
 * @modify date 2018-09-27 10:00:22
 * @desc Task
*/

export class Task {
	id: string
	title: string
	note: string
	datetime: Date
	subtasks: { title: string, completed?: boolean }[] = []

	constructor(title: string) {
		this.title = title
		this.datetime = new Date()
		this.id = Util.guid()
	}
}