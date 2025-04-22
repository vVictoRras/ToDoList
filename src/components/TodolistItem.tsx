import {FilterValues, Task, Todolist} from "../App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {TodolistTitle} from "./TodolistTitle.tsx";
import {FilterButtons} from "./FilterButtons.tsx";

type Props = {
    todolist: Todolist
    tasks: Task[],
    deleteTask: (todolistId:string,taskId: string) => void,
    changeFilter: (todolistId:string,filter: FilterValues) => void,
    addTask: (todolistId:string,title: string) => void,
    changeTaskStatus: (todolistId:string,taskId: string, isDone: boolean) => void,
    deleteTodolist:(todolistId:string) => void

}


export const TodolistItem = ({
                                 deleteTodolist,
                                 todolist: {id,title, filter},
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 addTask,
                                 changeTaskStatus,

                             }: Props) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(null)
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask(id,newTaskTitle);
            setNewTaskTitle("")
        }
    }
    const addNewTask = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle !== '') {
            addTask(id,trimmedTitle)
            setNewTaskTitle('')
        } else {
            setError('Title should not be empty')
        }
    }

    const changeFilterTaskHandler = (filter: FilterValues) => {
        changeFilter(id ,filter)
    }
    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }
    return (
        <div>
            <TodolistTitle title={title} onClick={deleteTodolistHandler}/>

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
                            changeTaskStatus(id,task.id, newStatusValue)

                        }
                        const deleteTaskHandler = () => {
                            deleteTask(id,task.id)
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
                <FilterButtons filter={filter} onClick={changeFilterTaskHandler}/>
            </div>
        </div>
    )
}