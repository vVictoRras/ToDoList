import {FilterValues, Task, Todolist} from "../App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";
import {TodolistTitle} from "./TodolistTitle.tsx";
import {FilterButtons} from "./FilterButtons.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type Props = {
    todolist: Todolist
    tasks: Task[],
    deleteTask: (todolistId:string,taskId: string) => void,
    changeFilter: (todolistId:string,filter: FilterValues) => void,
    addTask: (todolistId:string,title: string) => void,
    changeTaskStatus: (todolistId:string,taskId: string, isDone: boolean) => void,
    deleteTodolist:(todolistId:string) => void
    updateTaskTitle: (todolistId: string, taskId: string,updateTitle:string) => void
    changeTodolistTitle: (todolistId: string,updateTitle:string)=>void

}

export const TodolistItem = ({
                                 deleteTodolist,
                                 todolist: {id,title, filter},
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 addTask,
                                 changeTaskStatus,
                                 updateTaskTitle,
                                 changeTodolistTitle

                             }: Props) => {

    // const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setNewTaskTitle(e.currentTarget.value)
    //     setError(null)
    // }


    const changeFilterTaskHandler = (filter: FilterValues) => {
        changeFilter(id ,filter)
    }
    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }
    const addTaskHandler = (title:string) => {
      addTask(id,title)
    }
    const changeTodoHandler = (updateTitle:string) => {
        changeTodolistTitle(id,updateTitle)
    }
    return (
        <div>
            <TodolistTitle title={title}
                           onClick={deleteTodolistHandler}
                           changeTodoHandler={changeTodoHandler}/>
            <AddItemForm  addItem={addTaskHandler} />

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

                        const updateTaskTitleHandler = (updateTitle: string) => {
                            updateTaskTitle(id,task.id,updateTitle)
                        }
                        return (
                            <li key={task.id}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={changeTaskStatusHandler}
                                />
                                <EditableSpan oldTitle={task.title} onClick={updateTaskTitleHandler}/>
                                {/*<span className={task.isDone ? 'is-done' : ''}>{task.title}</span>*/}
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