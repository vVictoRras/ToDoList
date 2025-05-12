import type {TasksState} from '../App'
import {v1} from "uuid";



const initialState: TasksState = {}

export const tasksReducer = (tasks: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'CREATE-TODOLIST-IN-TASKS': {
            const {id} = action.payload
            return {...tasks, [id]: []}
        }
        case 'DELETE_TODOLIST': {
            const {id} = action.payload
            delete tasks[id];
            return {...tasks}
        }
        case "REMOVE-TASK": {
            const {todolistId, taskId} = action.payload
            return {
                ...tasks,
                [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)
        }}
        case "CREATE_TASK":{
            const newTask = {id:v1(), title: action.payload.title, isDone: false}
            return {...tasks, [action.payload.todolistId]: [newTask, ...tasks[action.payload.todolistId]]}
        }
        case "UPDATE_TASK_TITLE": {
            const {todolistId, taskId, title} = action.payload
            return {
                ...tasks,
                [todolistId]: tasks[todolistId].map(task =>
                    task.id === taskId ? {...task, title} : task
                )
            }
        }
        case 'CHANGE_TASK':{
            const { todolistId, taskId, isDone } = action.payload
            return {
                ...tasks,
                [todolistId]: tasks[todolistId].map(task =>
                    task.id === taskId ? { ...task, isDone } : task
                )
            }
        }
        default:
            return tasks
    }
}

type Actions = ReturnType<typeof createTodolistInTasksAC> | ReturnType<typeof removeTaskAC> | ReturnType<typeof changeTaskStatusAC> | ReturnType<typeof updateTaskTitleAC> | ReturnType<typeof CreateTaskAC>

export const removeTaskAC =(payload:{todolistId:string ,taskId: string}) => {
    return {
        type: 'REMOVE-TASK',
        payload
    } as const
}

export const createTaskAC =(payload:{todolistId:string,title:string}) =>{
    return{
        type: 'CREATE_TASK',
        payload
    }as const
}

export const changeTaskStatusAC =(payload:{todolistId: string, taskId: string, isDone: boolean}) =>{
    return{
        type: 'CHANGE_TASK',
        payload
    }as const
}

export const updateTaskTitleAC =(payload:{todolistId: string, taskId: string, updateTitle: string})=>{
    return{
        type: 'UPDATE_TASK_TITLE',
        payload
    }as const
}

export const createTodolistInTasksAC = (todolistId: string) => ({
    type: 'CREATE-TODOLIST-IN-TASKS',
    todolistId
} as const)