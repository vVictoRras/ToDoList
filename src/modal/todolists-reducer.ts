import {Todolist} from "../App.tsx";
import {v1} from "uuid";
import {FilterValues} from "../App.tsx";

export const deleteTodolistAC = (id: string)=> {
    return {type: 'DELETE_TODOLIST', payload: { id }} as const
}
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>


export const createTodolistAC = (title: string) => {
    const id = v1()
    return {type: 'CREATE_TODOLIST', payload: {id,title}} as const
}
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>

export const changeTodolistTitleAC = (payload:{id:string, title:string}) => {
    return {type: 'CHANGE_TODOLIST', payload} as const
}
export type ChangeTodolistAction = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistFilterAC = (payload:{id:string, filter:FilterValues}) => {
    return {type: 'FILTER_TODOLIST', payload} as const
}
export type FilterTodolistAction = ReturnType<typeof changeTodolistFilterAC>

type Actions =  DeleteTodolistAction | CreateTodolistAction | ChangeTodolistAction | FilterTodolistAction

const InitialState : Todolist[] =[]

export const todolistsReducer = (state: Todolist[] = InitialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'DELETE_TODOLIST':
            return state.filter(el => el.id !== action.payload.id)
        case 'CREATE_TODOLIST':
            const newTodolist:Todolist={id: action.payload.id, title: action.payload.title, filter:'all'}
            return [...state,newTodolist]
        case 'CHANGE_TODOLIST':
            return state.map(el=>el.id===action.payload.id ? {...el, title: action.payload.title}: el)
        case 'FILTER_TODOLIST':
            return state.map(el=>el.id===action.payload.id ? {...el, filter: action.payload.filter}: el)
        default:
            return state;
    }
}


