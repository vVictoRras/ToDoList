import {FilterValues, Task} from "../App.tsx";
import {Button} from "./Button.tsx";

type Props = {
    title: string,
    tasks: Task[],
    deleteTask: (taskId: number) => void,
    changeFilter: (filter:FilterValues) => void,
}


export const TodolistItem = ({title, tasks, deleteTask,changeFilter}: Props) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
            <ul>
                {tasks.map(task => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} />
                            <span>{task.title}</span>
                            <Button title={'x'} onClick={() => deleteTask(task.id)} />
                        </li>
                    )
                })}
            </ul>
                )}
            <div>
                <Button title={'All'} onClick={()=>changeFilter('all')} />
                <Button title={'Active'} onClick={()=>changeFilter('active')} />
                <Button title={'Completed'} onClick={()=>changeFilter('completed')} />
            </div>
        </div>
    )
}