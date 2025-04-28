
import {Button} from "./Button.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type TodolistTitleProps={
    title: string,
    onClick : ()=> void
    changeTodoHandler:(updateTitle: string)=>void
}


export const TodolistTitle = ({changeTodoHandler,title,onClick}:TodolistTitleProps) => {


    const changeTodoTitleHandler = (updateTitle: string) => {
        changeTodoHandler(updateTitle)
    }
    return (
        <div  className={'container'}>
                {/*<h3>{title}</h3>*/}
            <EditableSpan oldTitle={title} onClick={changeTodoTitleHandler}/>
                <Button
                    title={'X'}
                    onClick={onClick}/>
        </div>
    );
};

