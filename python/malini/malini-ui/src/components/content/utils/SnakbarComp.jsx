import React, {useState} from 'react';
import {Snackbar, Alert} from '@material-ui/core'
import {atom, useResetRecoilState, useRecoilValue} from 'recoil';

export default message_atom = atom({key: 'message_atom', default: {} });

const SnakbarComp = () => {
    const [open, setOpen] = useState(false);
    const res = useRecoilValue(message_atom);
    let message = '', severity = null;
    if(res){
        message = res.message;
        severity = res.status;
    }

    const handleClose = () {
        if(!open){
            useResetRecoilState(message_atom);
        }
        setOpen(!open);
    }

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SnakbarComp
