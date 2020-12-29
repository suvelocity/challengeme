import { makeStyles } from '@material-ui/core/styles';
import useDebounceHook from './debounceHook';

export const useDebounce = useDebounceHook;

export function randomLocation() {
    return Math.round(Math.random() * 20) - 10;
}

export function getModalStyle() {
    const top = 50 + randomLocation();
    const left = 50 + randomLocation();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export const useModalStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        maxHeight: '90%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: 8,
        overflowY: 'auto'
    },
    formValidationError: {
        color: "red",
        fontSize: "0.8em",
    },
}));