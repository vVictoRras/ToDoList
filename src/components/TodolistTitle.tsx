
import {Button} from "./Button.tsx";
type TodolistTitleProps={
    title: string,
    onClick : ()=> void
}


export const TodolistTitle = ({title,onClick}:TodolistTitleProps) => {
    return (
        <div  className={'container'}>
                <h3>{title}</h3>
                <Button
                    title={'X'}
                    onClick={onClick}/>
        </div>
    );
};

