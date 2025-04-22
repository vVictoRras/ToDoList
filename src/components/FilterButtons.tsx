
import {Button} from "./Button.tsx";
import {FilterValues} from "../App.tsx";

export type FilterButtonProps = {
    filter: FilterValues;
    onClick: (filter: FilterValues) => void;
}

export const FilterButtons = ({filter,onClick}:FilterButtonProps) => {
    return (
        <div>
            <Button className={filter === 'all' ? 'active-filter' : ''}
                    title={'All'}
                    onClick={() => onClick('all')}/>
            <Button className={filter === 'active' ? 'active-filter' : ''}
                    title={'Active'}
                    onClick={() => onClick('active')}/>
            <Button className={filter === 'completed' ? 'active-filter' : ''}
                    title={'Completed'}
                    onClick={() => onClick('completed')}/>
        </div>
    );
};
