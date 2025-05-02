import {FilterValues} from "../App.tsx";
import {Button} from "@mui/material";

export type FilterButtonProps = {
    filter: FilterValues;
    onClick: (filter: FilterValues) => void;
}

export const FilterButtons = ({filter, onClick}: FilterButtonProps) => {
    return (
        <div>
            <Button variant={filter === 'all' ? 'contained' : 'outlined'}
                    title={'All'}
                    onClick={() => onClick('all')}>{"ALL"}</Button>
            <Button color={"primary"} variant={filter === 'active' ? 'contained' : 'outlined'}
                    title={'Active'}
                    onClick={() => onClick('active')}>{'Active'}</Button>
            <Button color={"secondary"} variant={filter === 'completed' ? 'contained' : 'outlined'}
                    title={'Completed'}
                    onClick={() => onClick('completed')}>{'Completed'}</Button>
        </div>
    );
};
