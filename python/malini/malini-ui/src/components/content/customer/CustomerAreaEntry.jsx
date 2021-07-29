import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';

const CustomerAreaEntry = ({selected_area, openAreaModal, toggleAreaModal}) => {
    const classes = useStyles();
    const action = selected_area ? 'Update' : 'Add New';

    return (
        <div>
            <Modal open={openAreaModal} onClose={toggleAreaModal} 
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500,}}
            >
                <Fade in={openAreaModal}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">{action} Customer Area</h2>                    
                        <Divider/>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default CustomerAreaEntry




const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));


