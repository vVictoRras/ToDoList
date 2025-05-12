import {v1} from "uuid"
import type {Task, TasksState} from "../App"

// Action Creators
export const removeTaskAC = (todolistId: string, taskId: string) => ({
    type: 'REMOVE_TASK',
    payload: {todolistId, taskId}
} as const)

export const createTaskAC = (todolistId: string, title: string) => ({
    type: 'CREATE_TASK',
    payload: {todolistId, title}
} as const)

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => ({
    type: 'CHANGE_TASK_STATUS',
    payload: {todolistId, taskId, isDone}
} as const)

export const updateTaskTitleAC = (todolistId: string, taskId: string, title: string) => ({
    type: 'UPDATE_TASK_TITLE',
    payload: {todolistId, taskId, title}
} as const)

export const createTodolistInTasksAC = (todolistId: string) => ({
    type: 'CREATE_TODOLIST_IN_TASKS',
    payload: {todolistId}
} as const)

export const deleteTodolistInTasksAC = (todolistId: string) => ({
    type: 'DELETE_TODOLIST_IN_TASKS',
    payload: {todolistId}
} as const)

// Все допустимые Action
type Actions =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof createTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof updateTaskTitleAC>
    | ReturnType<typeof createTodolistInTasksAC>
    | ReturnType<typeof deleteTodolistInTasksAC>

// Reducer
export const tasksReducer = (
    state: TasksState = {},
    action: Actions
): TasksState => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            const {todolistId, taskId} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].filter(task => task.id !== taskId)
            }
        }

        case 'CREATE_TASK': {
            const {todolistId, title} = action.payload
            const newTask: Task = {
                id: v1(),
                title,
                isDone: false
            }
            return {
                ...state,
                [todolistId]: [newTask, ...state[todolistId]]
            }
        }

        case 'CHANGE_TASK_STATUS': {
            const {todolistId, taskId, isDone} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].map(task =>
                    task.id === taskId ? {...task, isDone} : task
                )
            }
        }

        case 'UPDATE_TASK_TITLE': {
            const {todolistId, taskId, title} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].map(task =>
                    task.id === taskId ? {...task, title} : task
                )
            }
        }

        case 'CREATE_TODOLIST_IN_TASKS': {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }

        case 'DELETE_TODOLIST_IN_TASKS': {
            const newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        }

        default:
            return state
    }
}
