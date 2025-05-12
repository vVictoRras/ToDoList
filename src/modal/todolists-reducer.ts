import {Todolist} from "../App.tsx";
import {FilterValues} from "../App.tsx";
import {v1} from "uuid";





export const deleteTodolistAC = (id: string)=> {
    return {type: 'DELETE_TODOLIST', payload: {id:id}} as const
}

export const createTodolistAC = (title: string, id: string) => {
    return {
        type: 'CREATE_TODOLIST',
        payload: {id:id,title:title} as const
    }}
    // export type CreateTodolistAction = ReturnType<typeof createTodolistAC>

    export const changeTodolistTitleAC = (payload: { id: string, title: string }) => {
        return {type: 'CHANGE_TODOLIST', payload} as const
    }
    // export type ChangeTodolistAction = ReturnType<typeof changeTodolistTitleAC>

    export const changeTodolistFilterAC = (payload: { id: string, filter: FilterValues }) => {
        return {type: 'FILTER_TODOLIST', payload} as const
    }
    // export type FilterTodolistAction = ReturnType<typeof changeTodolistFilterAC>

    type Actions = ReturnType<typeof deleteTodolistAC> | ReturnType<typeof createTodolistAC> | ReturnType<typeof changeTodolistTitleAC> | ReturnType<typeof changeTodolistFilterAC>

    const InitialState: Todolist[] = []

    export const todolistsReducer = (todolists: Todolist[] = InitialState, action: Actions): Todolist[] => {
        switch (action.type) {
            case 'DELETE_TODOLIST':
                return todolists.filter(el => el.id !== action.payload.id)
            case 'CREATE_TODOLIST':
                return [...todolists, {id: action.payload.id, title:action.payload.title, filter: "all"}]
            case 'CHANGE_TODOLIST':
                return todolists.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
            case 'FILTER_TODOLIST':
                return todolists.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
            default:
                return todolists;
        }
    }


