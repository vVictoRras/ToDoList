import {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanProps = {
     task: boolean;
     oldTitle: string;
     onClick: (updateTitle: string)=>void;
}

export const EditableSpan = ({oldTitle,onClick,task}: EditableSpanProps) => {
    const [edit, setEdit] = useState(false);
    const [updateTitle, setUpdateTitle] = useState(oldTitle);
    const [error, setError] = useState<string | null>(null);


        const editHandler = () => {
            setEdit(!edit)
            if (edit) {
                onClick(updateTitle)
            }
        }
    const updateTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)

        setError(null)
    }

    return (
        edit ?
            <TextField
                autoFocus
                value={updateTitle}
                onBlur={editHandler}
                onChange={updateTitleHandler}
            />
            : <span className={task ? 'is-done' : ''}
                onDoubleClick={editHandler}

            >{oldTitle}</span>

    );
};

