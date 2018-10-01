import { Task } from "../models/task";

/**
 * @author Guster
 * @email seongwoei.chua@veltra.com
 * @create date 2018-07-09 02:40:40
 * @modify date 2018-07-09 02:40:40
 * @desc A service class that handles all web storage functions
*/

export class StorageService {
	private static _instance: StorageService

	private constructor() { }

	public static get() {
		if (StorageService._instance == null) {
			StorageService._instance = new StorageService()
		}
		return StorageService._instance
	}

	public putItem(key: string, value: string) {
		if (!window.localStorage) return

		window.localStorage.setItem(key, value)
	}

	public getItem(key: string): string | null {
		if (!window.localStorage) return ''

		let value = window.localStorage.getItem(key)
		return value
	}

	public removeItem(key: string) {
		return window.localStorage.removeItem(key)
	}

	// ============================= APP MISC SETTINGS =============================

	public saveTask(task: Task) {
		let json = this.getItem('tasks')
		let tasks: Task[] = []
		if (json) {
			tasks = JSON.parse(json)
		}

		let index = -1
		tasks.find((item, i) => {
			if (item.id == task.id) {
				index = i
				return true
			}

			return false
		})

		if (index >= 0) {
			// update task
			tasks[index] = task
		} else {
			tasks.push(task)
		}

		this.putItem('tasks', JSON.stringify(tasks))
	}

	public getTasks(): Task[] {
		let json = this.getItem('tasks')
		if (json) {
			let tasks = JSON.parse(json) as Task[]
			tasks.forEach(item => {
				item.datetime = new Date(item.datetime)
			})

			return tasks
		}

		return []
	}

	public deleteTask(task: Task) {
		let tasks = this.getTasks()
		let index = tasks.findIndex(item => {
			return item.id == task.id
		})
		
		if (index >= 0) {
			tasks.splice(index, 1)
			this.putItem('tasks', JSON.stringify(tasks))
		}
	}

}