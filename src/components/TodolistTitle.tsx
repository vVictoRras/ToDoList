
import {EditableSpan} from "./EditableSpan.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

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
            <EditableSpan task={false} oldTitle={title} onClick={changeTodoTitleHandler}/>
                {/*<CustomButton*/}
                {/*    title={'X'}*/}
                {/*    onClick={onClick}/>*/}
            <IconButton onClick={onClick}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
};

