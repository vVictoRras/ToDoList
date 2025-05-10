import type {Task, TasksState} from '../App'


const initialState: TasksState = {}

export const tasksReducer = (state: Task[] = initialState, action: Actions): Task[] => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // {...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)}
            return state.filter(el => el.id !== action.payload.taskId)
        }
        default:
            return state
    }
}

type Actions = RemoveTaskACType

type RemoveTaskACType ={
    type: 'REMOVE-TASK',
    payload: {
        taskId: string
    }
}
export const removeTaskAC =(taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId
        }
    } as const
}
