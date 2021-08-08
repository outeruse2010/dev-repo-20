import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const ModalHeader = ({header, toggleModal}) => {
    const classes = useStyles();

    return (
        <Box display="flex" p={1} bgcolor="background.paper">
            <Box p={1} width="100%">
                <Typography variant="h6" >{header}</Typography>
            </Box>
            <Box p={1} flexShrink={1}>
                <IconButton onClick={toggleModal} ><CloseIcon color='primary' /></IconButton>
            </Box>
        </Box>
    )
}

export default ModalHeader;

const useStyles = makeStyles((theme) => ({
    
    field:{
        marginBottom: theme.spacing(1)
    }
  }));
