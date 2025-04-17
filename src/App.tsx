import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }
    const [filter, setFilter] = useState<FilterValues>('all')

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
    const getFilteredTasks = () => {

        let filteredTasks = tasks

        switch (filter) {
            case 'active':
                filteredTasks = tasks.filter(t => !t.isDone)
                break;
            case 'completed':
                filteredTasks = tasks.filter(t => t.isDone)
                break;
        }

        return filteredTasks
    }
    //
    // let filteredTasks = tasks
    // if (filter === 'active') {
    //     filteredTasks = tasks.filter(task => !task.isDone)
    // }
    // if (filter === 'completed') {
    //     filteredTasks = tasks.filter(task => task.isDone)
    // }

    return (
        <div className="app">
            <TodolistItem title="What to learn"
                          tasks={getFilteredTasks()}
                          deleteTask={deleteTask}
                          changeFilter={changeFilter}
                          addTask={addTask}
                          changeTaskStatus={changeTaskStatus}
                          activeFilter={filter}/>
        </div>
    )
}



