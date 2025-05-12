import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {CustomButton} from "./Button.tsx";
import TextField from "@mui/material/TextField";

type AddItemFormProps = {
    addItem: (title: string) => void;
}

export const AddItemForm = ({addItem}: AddItemFormProps) => {

    const [ItemTitle, setItemTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
        setError(null)
    }
    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        const trimmedTitle = ItemTitle.trim()
        if (event.key === 'Enter') {
            if (trimmedTitle) {
                addItem(trimmedTitle)
                setItemTitle('')
            } else {
                setError('Title should not be empty')
            }

        }
    }
    const createItemOnClickHandler = () => {
        const trimmedTitle = ItemTitle.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
            setItemTitle('')
        } else {
            setError('Title should not be empty')
        }
    }

    return (
        <div>
            {/*<input className={error ? 'error' : ''}*/}
            {/*       value={ItemTitle}*/}
            {/*       placeholder="Enter task title"*/}
            {/*       onChange={changeItemTitleHandler}*/}
            {/*       onKeyPress={createItemOnEnterHandler}*/}
            {/*/>*/}
            <TextField
                error={!!error}
                value={ItemTitle}
                size={'small'}
                // helperText={error}
                variant={"outlined"}
                label={error ? error : 'Enter task title'}
                onChange={changeItemTitleHandler}
                onKeyDown={createItemOnEnterHandler}
            />
            <CustomButton onClick={createItemOnClickHandler}/>
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </div>
    );
};

