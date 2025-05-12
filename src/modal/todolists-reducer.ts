import type { Todolist, FilterValues } from "../App"

// Action Creators
export const deleteTodolistAC = (id: string) => ({
    type: 'DELETE_TODOLIST',
    payload: { id }
} as const)

export const createTodolistAC = (id: string, title: string) => ({
    type: 'CREATE_TODOLIST',
    payload: { id, title }
} as const)

export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE_TODOLIST_TITLE',
    payload: { id, title }
} as const)

export const changeTodolistFilterAC = (id: string, filter: FilterValues) => ({
    type: 'CHANGE_TODOLIST_FILTER',
    payload: { id, filter }
} as const)

// Типизация всех возможных Action
type Actions =
    | ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof createTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>

// Начальное состояние
const initialState: Todolist[] = []

// Редьюсер
export const todolistsReducer = (
    state: Todolist[] = initialState,
    action: Actions
): Todolist[] => {
    switch (action.type) {
        case 'DELETE_TODOLIST':
            return state.filter(todo => todo.id !== action.payload.id)

        case 'CREATE_TODOLIST':
            return [
                ...state,
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    filter: 'all'
                }
            ]

        case 'CHANGE_TODOLIST_TITLE':
            return state.map(todo =>
                todo.id === action.payload.id
                    ? { ...todo, title: action.payload.title }
                    : todo
            )

        case 'CHANGE_TODOLIST_FILTER':
            return state.map(todo =>
                todo.id === action.payload.id
                    ? { ...todo, filter: action.payload.filter }
                    : todo
            )

        default:
            return state
    }
}
