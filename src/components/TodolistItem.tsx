import {FilterValues, Task, Todolist} from "../App.tsx";
import {ChangeEvent} from "react";
import {TodolistTitle} from "./TodolistTitle.tsx";
import {FilterButtons} from "./FilterButtons.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Checkbox, IconButton, List, ListItem} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {GetListItemSX} from "./TodoListStyles.tsx";

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
    const updateTaskTitleHandler = (taskId:string,updateTitle: string) => {
        updateTaskTitle(id,taskId,updateTitle)
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
                <List >
                    {tasks.map(task => {
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(id,task.id, newStatusValue)

                        }
                        const deleteTaskHandler = () => {
                            deleteTask(id,task.id)
                        }

                        // const updateTaskTitleHandler = (updateTitle: string) => {
                        //     updateTaskTitle(id,task.id,updateTitle)
                        // }
                        return (
                            <ListItem key={task.id}
                            sx={GetListItemSX(task.isDone) }
                            >
                                {/*<input type="checkbox"*/}
                                {/*       checked={task.isDone}*/}
                                {/*       onChange={changeTaskStatusHandler}*/}
                                {/*/>*/}
                                <div>
                                    <Checkbox  onChange={changeTaskStatusHandler}
                                               checked={task.isDone}
                                    />
                                    <EditableSpan task={task.isDone} oldTitle={task.title} onClick={(updateTitle)=>updateTaskTitleHandler(task.id,updateTitle)}/>
                                </div>

                                {/*<CustomButton title={'x'} onClick={deleteTaskHandler}/>*/}
                                <IconButton onClick={deleteTaskHandler}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
            <div>
                <FilterButtons filter={filter} onClick={changeFilterTaskHandler}/>
            </div>
        </div>
    )
}