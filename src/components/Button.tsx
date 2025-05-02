import ControlPoint from "@mui/icons-material/ControlPoint";
import {IconButton} from "@mui/material";

type Props = {
    onClick?: () => void
   }

export const CustomButton = ({onClick}: Props) => {
    return <IconButton  onClick={onClick}>
        <ControlPoint/>
    </IconButton>

}