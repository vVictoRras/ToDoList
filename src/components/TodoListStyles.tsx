import {SxProps} from "@mui/material";

export const FilterButtonsContainerSX: SxProps = {
    display: 'flex',
    justifyContent: "space-around",
}
export const GetListItemSX=(isDone:boolean): SxProps => ({
    p: 0,
    justifyContent: "space-between",
    opacity: isDone ? 0.5 : 1
})