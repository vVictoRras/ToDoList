import {ChangeEvent, useState} from 'react';

type EditableSpanProps = {
    // className?: string;
     oldTitle: string;
     onClick: (updateTitle: string)=>void;
}

export const EditableSpan = ({oldTitle,onClick}: EditableSpanProps) => {
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
            <input
                autoFocus
                value={updateTitle}
                onBlur={editHandler}
                onChange={updateTitleHandler}
            />
            : <span
                onDoubleClick={editHandler}

            >{oldTitle}</span>
        //className={task.isDone ? 'is-done' : ''}


    );
};

