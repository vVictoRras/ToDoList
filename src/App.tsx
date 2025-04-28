import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm.tsx";

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

export const App = () => {


    const changeFilter = (todolistId: string, newFilter: FilterValues) => {
        const newTodolists = todolists.map(todolist => {
            return todolist.id === todolistId ? {...todolist, filter: newFilter} : todolist
        })
        setTodolists(newTodolists)
    }
    // const changeFilter = (filter: FilterValues) => {
    //     setFilter(filter)
    // }
    // const [filter, setFilter] = useState<FilterValues>('all')

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
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
        ],
    })

    const deleteTask = (todolistId: string, taskId: string) => {
        // /** Берем таски тудулиста по его `id`: */
        // const todolistTasks = tasks[todolistId]
        // /** Удаляем нужную таску: */
        // const newTodolistTasks = todolistTasks.filter(task => task.id !== taskId)
        // /** Перезаписываем массив тасок нужного тудулиста на новый (отфильтрованный): */
        // tasks[todolistId] = newTodolistTasks
        // /** Устанавливаем в state копию объекта, чтобы React отреагировал перерисовкой: */
        // setTasks({ ...tasks })

        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})

        // const filteredTasks = tasks.filter(task => {
        //     return task.id !== taskId
        // })
        // setTasks(filteredTasks)
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        // const newTasks = tasks.map(t=> t.id===taskId ? {...t, isDone } : t)
        // setTasks(newTasks)
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task)})
    }

    const updateTaskTitle = (todolistId: string, taskId: string,updateTitle:string) => {
      setTasks({...tasks,[todolistId]:tasks[todolistId].map(task=>task.id===taskId ? {...task, title:updateTitle} : task)})
    }
    //delete todolist
    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTask = (todolistId: string, title: string) => {
        // const newTask: Task = {id: v1(), title, isDone: false}
        // const newTasks = [newTask, ...tasks];
        // setTasks(newTasks)
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    // create todolist
    const addTodolist = (title: string) => {
        const id=v1()
        const newTodolist: Todolist =  {id, title, filter: "all"}
        setTodolists([...todolists,newTodolist])
        setTasks({...tasks, [id]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},]})
    }

    // update todolist title
    const changeTodolistTitle = (todolistId: string,updateTitle:string) => {
        setTodolists([...todolists].map(todo=>todo.id===todolistId ? {...todo, title:updateTitle} : todo))
    }
    // // update todolist filter
    // const changeTodolistFilter = () => {
    //
    // }

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
            <TodolistItem key={tl.id}
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
        )
    })

    return (

        <div className="app">
            <AddItemForm  addItem={addTodolist}/>
            {todolistComponents}
        </div>
    )
}



