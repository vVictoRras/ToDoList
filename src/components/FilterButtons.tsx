import {FilterValues} from "../App.tsx";
import Button from "@mui/material/Button";
import {Box} from "@mui/material";
import {FilterButtonsContainerSX} from "./TodoListStyles.tsx";

export type FilterButtonProps = {
    filter: FilterValues;
    onClick: (filter: FilterValues) => void;
}

export const FilterButtons = ({filter, onClick}: FilterButtonProps) => {
    return (
        <div>
            <Box  sx={FilterButtonsContainerSX}>
                <Button size={'small'}
                        color={"success"}
                        variant={filter === 'all' ? 'contained' : 'outlined'}
                        onClick={() => onClick('all')}>ALL</Button>
                <Button size={'small'}
                        color={"primary"}
                        variant={filter === 'active' ? 'contained' : 'outlined'}
                        onClick={() => onClick('active')}>Active</Button>
                <Button size={'small'}
                        color={"secondary"}
                        variant={filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={() => onClick('completed')}>Completed</Button>
            </Box>
        </div>
    );
};
