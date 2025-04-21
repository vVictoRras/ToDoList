import {FilterValues, Task, Todolist} from "../App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    todolist: Todolist
    todolistsId:string
    // title: string,
    tasks: Task[],
    deleteTask: (taskId: string) => void,
    changeFilter: (todolistsId:string,filter: FilterValues) => void,
    addTask: (title: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean) => void,
    activeFilter?: FilterValues
}


export const TodolistItem = ({
                                 todolistsId,
                                 todolist: {title, filter},
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 addTask,
                                 changeTaskStatus,
                                 // activeFilter
                             }: Props) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    // let filteredTasks = tasks
    // if (todolist.filter === 'active') {
    //     filteredTasks = tasks.filter(task => !task.isDone)
    // }
    // if (todolist.filter === 'completed') {
    //     filteredTasks = tasks.filter(task => task.isDone)
    // }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(null)
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }
    const addNewTask = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle !== '') {
            addTask(trimmedTitle)
            setNewTaskTitle('')
        } else {
            setError('Title should not be empty')
        }
    }

    const changeFilterTaskHandler = (activeFilter:FilterValues) => {
        changeFilter(todolistsId ,activeFilter)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={error ? 'error' : ''}
                       value={newTaskTitle}
                       placeholder="Enter task title"
                       onChange={changeTaskTitleHandler}
                       onKeyPress={createTaskOnEnterHandler}
                />
                <button onClick={addNewTask}>+
                </button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newStatusValue)
                            console.log("changeTaskStatus", task.id, newStatusValue)
                        }
                        const deleteTaskHandler = () => {
                            deleteTask(task.id)
                        }

                        return (
                            <li key={task.id}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={changeTaskStatusHandler}
                                />
                                <span className={task.isDone ? 'is-done' : ''}>{task.title}</span>
                                <Button title={'x'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={() => changeFilterTaskHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilterTaskHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilterTaskHandler('completed')}/>
            </div>
        </div>
    )
}