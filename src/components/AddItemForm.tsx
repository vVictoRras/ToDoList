import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button.tsx";

type AddItemFormProps = {
      addItem:(title: string) => void;
}

export const AddItemForm = ({addItem}:AddItemFormProps) => {

    const [ItemTitle, setItemTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItem(ItemTitle);
            setItemTitle("")
        }
    }
    const addItemOnClickHandler = () => {
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
            <input className={error ? 'error' : ''}
                   value={ItemTitle}
                   placeholder="Enter task title"
                   onChange={changeItemTitleHandler}
                   onKeyPress={createItemOnEnterHandler}
            />
            <Button title={'+'} onClick={addItemOnClickHandler}/>

            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

