import { Task } from "../../models/task";

export interface TodoListModel {
	id?: number
	date?: string,
	task?: Task
}