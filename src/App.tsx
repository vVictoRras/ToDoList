import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm.tsx";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import Menu from '@mui/icons-material/Menu';
import {MenuButton} from "./components/MenuButton.tsx";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {MaterialUISwitch} from "./components/UISwitch.tsx";
import {
    changeTaskStatusAC,
    createTaskAC, createTodolistInTasksAC,
    removeTaskAC,
    tasksReducer,
    updateTaskTitleAC
} from "./modal/tasks-reducer.ts";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC, createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./modal/todolists-reducer.ts";

type ThemeMode = 'dark' | 'light'


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

export type FilterValues = 'all' | 'active' | 'completed'

const todolistId1 = v1()
const todolistId2 = v1()

export const App = () => {

    const initState:Todolist[]=[
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, initState)

    const startState: TasksState={
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Fish', isDone: true},
            {id: v1(), title: 'Water', isDone: true},
        ]
    }

    const [tasks, dispatchTasks] = useReducer(tasksReducer,startState)


    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }
    const deleteTask = (todolistId: string, taskId: string) => {
        dispatchTasks(removeTaskAC(todolistId, taskId))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    const updateTaskTitle = (todolistId: string, taskId: string, updateTitle: string) => {
        dispatchTasks(updateTaskTitleAC(todolistId, taskId, updateTitle))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatchTasks(createTaskAC(todolistId, title))
    }

    //delete todolist
    const deleteTodolist = (todolistId: string) => {
              dispatchTodolists(deleteTodolistAC(todolistId))

    }
    // create todolist
    const addTodolist = (newTodoTitle: string) => {
        const newTodolistId = v1()
        dispatchTodolists(createTodolistAC(newTodolistId, newTodoTitle))
        dispatchTasks(createTodolistInTasksAC(newTodolistId))
    }
    // update (change) todolist title
    const changeTodolistTitle = (todolistId: string, updateTitle: string) => {
        // setTodolists(todolists.map(todo => todo.id === todolistId ? {...todo, title: updateTitle} : todo))
        dispatchTodolists(changeTodolistTitleAC({id: todolistId, title: updateTitle}))
    }
    // update todolist filter
    const changeFilter = (todolistId: string, newFilter: FilterValues) => {
        // const newTodolists = todolists.map(todolist => {
        //     return todolist.id === todolistId ? {...todolist, filter: newFilter} : todolist
        // })
        // setTodolists(newTodolists)
        dispatchTodolists(changeTodolistFilterAC({id: todolistId, filter: newFilter}))

    }

    const todolistComponents = todolists.map(tl => {

        let filteredTasks: Array<Task> = [];
        if (tl.filter === 'all') {
            filteredTasks = tasks[tl.id]
        }

        if (tl.filter === 'active') {
            filteredTasks = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === 'completed') {
            filteredTasks = tasks[tl.id].filter(t => t.isDone)
        }

        return (
            <Grid key={tl.id} >
                <Paper style={{padding: '10px', height: '100%'}}
                       elevation={5}>
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
        <div className={"app"}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Todolists
                        </Typography>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>Log out</MenuButton>
                        <MenuButton background={theme.palette.primary.main}>FAQ</MenuButton>
                        <MaterialUISwitch onChange={changeMode}/>
                    </Toolbar>

                </AppBar>
                <Container fixed>
                    <Grid container style={{padding: '10px'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={3}>
                        {todolistComponents}
                    </Grid>
                </Container>

            </ThemeProvider>
        </div>

    )
}



