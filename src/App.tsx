import './App.css'
import { useReducer, useState } from "react"
import { v1 } from "uuid"
import { TodolistItem } from "./components/TodolistItem"
import { AddItemForm } from "./components/AddItemForm"
import {
    AppBar, Container, CssBaseline, Grid, IconButton,
    Paper, Toolbar, Typography, createTheme, ThemeProvider
} from '@mui/material'
import Menu from '@mui/icons-material/Menu'
import { MenuButton } from "./components/MenuButton"
import { MaterialUISwitch } from "./components/UISwitch"

import {
    changeTaskStatusAC,
    createTaskAC,
    removeTaskAC,
    tasksReducer,
    updateTaskTitleAC,
    createTodolistInTasksAC,
    deleteTodolistInTasksAC
} from "./modal/tasks-reducer"

import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./modal/todolists-reducer"

export type ThemeMode = 'light' | 'dark'
export type FilterValues = 'all' | 'active' | 'completed'

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = {
    [key: string]: Task[]
}

const TodolistId1 = v1()
const TodolistId2 = v1()

export const App = () => {
    const initialTodolists: Todolist[] = [
        { id: TodolistId1, title: 'What to learn', filter: 'all' },
        { id: TodolistId2, title: 'What to buy', filter: 'all' }
    ]

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, initialTodolists)

    const initialTasks: TasksState = {
        [TodolistId1]: [
            { id: v1(), title: 'HTML & CSS', isDone: true },
            { id: v1(), title: 'JavaScript', isDone: true },
            { id: v1(), title: 'React', isDone: false },
        ],
        [TodolistId2]: [
            { id: v1(), title: 'Bread', isDone: true },
            { id: v1(), title: 'Milk', isDone: false },
            { id: v1(), title: 'Fish', isDone: true },
        ]
    }

    const [tasks, dispatchTasks] = useReducer(tasksReducer, initialTasks)

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: { main: '#087EA4' }
        }
    })

    const changeMode = () => {
        setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'))
    }
   //Task
    const deleteTask = (todolistId: string, taskId: string) => {
        dispatchTasks(removeTaskAC(todolistId, taskId))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
        if (title.trim()===' ')
            return dispatchTasks(updateTaskTitleAC(todolistId, taskId, title))

    }

    const addTask = (todolistId: string, title: string) => {
        dispatchTasks(createTaskAC(todolistId, title))
    }

    // Todolist
    const deleteTodolist = (todolistId: string) => {
        dispatchTodolists(deleteTodolistAC(todolistId))
        dispatchTasks(deleteTodolistInTasksAC(todolistId))
    }

    const addTodolist = (title: string) => {
        const newId = v1()
        dispatchTodolists(createTodolistAC(newId, title))
        dispatchTasks(createTodolistInTasksAC(newId))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        if (title.trim() === ' ')
            return dispatchTodolists(changeTodolistTitleAC(todolistId, title))
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatchTodolists(changeTodolistFilterAC(todolistId, filter))
    }

    const todolistComponents = todolists.map(tl => {
        const filteredTasks = tl.filter === 'active'
            ? tasks[tl.id]?.filter(t => !t.isDone) || []
            : tl.filter === 'completed'
                ? tasks[tl.id]?.filter(t => t.isDone) || []
                : tasks[tl.id] || []

        return (
            <Grid key={tl.id}>
                <Paper style={{ padding: '10px', height: '100%' }} elevation={5}>
                    <TodolistItem
                        todolist={tl}
                        tasks={filteredTasks}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        deleteTodolist={deleteTodolist}
                        updateTaskTitle={updateTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todolists
                    </Typography>
                    <MenuButton>Login</MenuButton>
                    <MenuButton>Logout</MenuButton>
                    <MenuButton background={theme.palette.primary.main}>FAQ</MenuButton>
                    <MaterialUISwitch onChange={changeMode} />
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: '10px' }}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {todolistComponents}
                </Grid>
            </Container>
        </ThemeProvider>
    )
}
