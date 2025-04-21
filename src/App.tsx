import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

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

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

    // const changeFilter = (filter: FilterValues) => {
    //     setFilter(filter)
    // }
    // const [filter, setFilter] = useState<FilterValues>('all')

    const [todolists, setTodolists] = useState<Todolist[]>([
        { id: v1(), title: 'What to learn', filter: 'all' },
        { id: v1(), title: 'What to buy', filter: 'all' },
    ])
    const [tasks, setTasks] = useState<Task[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])

    const deleteTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        const newTask: Task = {id: v1(), title, isDone: false}
        const newTasks = [newTask, ...tasks];
        setTasks(newTasks)
    }

    const changeTaskStatus = (taskId:string, isDone:boolean) => {
        const newTasks = tasks.map(t=> t.id===taskId ? {...t, isDone } : t)
        setTasks(newTasks)
    }

    const changeFilter = (todolistId: string, newFilter: FilterValues) => {
        const newTodolists = todolists.map(todolist => {
            return todolist.id === todolistId ? { ...todolist, filter:newFilter } : todolist
        })
        setTodolists(newTodolists)
    }

      return (

        <div className="app">
            {todolists.map(todolist => {
                let filteredTasks = tasks
                if (todolist.filter === 'active') {
                    filteredTasks = tasks.filter(task => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                    filteredTasks = tasks.filter(task => task.isDone)
                }
                return (
                    <TodolistItem key={todolist.id}
                                  todolistsId={todolist.id}
                                  todolist={todolist}
                                  tasks={filteredTasks}
                                  deleteTask={deleteTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeTaskStatus}/>
                )
            })}
        </div>
    )
}



