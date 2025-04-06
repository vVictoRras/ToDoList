import {FilterValues, Task} from "../App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    title: string,
    tasks: Task[],
    deleteTask: (taskId: string) => void,
    changeFilter: (filter: FilterValues) => void,
    addTask: (title: string) => void,
}


export const TodolistItem = ({title, tasks, deleteTask, changeFilter, addTask}: Props) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }
    const addNewTask = () => {
        addTask(newTaskTitle);
        setNewTaskTitle("")
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyPress={createTaskOnEnterHandler}
                />
                <button onClick={addNewTask}>+
                </button>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {

                        const deleteTaskHandler = () => {
                            deleteTask(task.id)
                        }

                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'} onClick={() => changeFilter('all')}/>
                <Button title={'Active'} onClick={() => changeFilter('active')}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed')}/>
            </div>
        </div>
    )
}