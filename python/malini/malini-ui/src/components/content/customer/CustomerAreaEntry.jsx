import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Divider from '@material-ui/core/Divider';

import {TextField, Button, Typography}  from '@material-ui/core';

import {useRecoilState} from 'recoil';

import {cus_area_atom,act_cus_area_atom, add_cus_area, fetch_customer_areas} from './customer_api';


const CustomerAreaEntry = ({selected_area, openAreaModal, toggleAreaModal}) => {
    const classes = useStyles();
    const action = selected_area ? 'Update' : 'Add New';
    const [area_name, setArea_name] = useState('');
    const [description, setDescription] = useState('');
    const [areaNameErr, setAreaNameErr] = useState(false);
    const [cus_area_list, setCus_area_list] = useRecoilState(cus_area_atom);
    const [act_cus_area_res, setAct_cus_area_res] = useRecoilState(act_cus_area_atom);

    const onSubmit = (e) => {
        e.preventDefault();
        if(!area_name){
            setAreaNameErr(true);
            return;
        }
        const cus_area_json = {area_name, description, 'created_by': 'Test'};
        const res = add_cus_area(cus_area_json);
        res.then(data => {
            // console.log('***add res: ',data);
            setAct_cus_area_res(data);
            if(data.status === 'success'){
                const input = {user:"Test"};
                const cus_area_res = fetch_customer_areas(input);
                cus_area_res.then(cus_areas => setCus_area_list(cus_areas));
            }   
        });
    }

    return (        
            <Modal open={openAreaModal} onClose={toggleAreaModal} 
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                BackdropComponent={Backdrop}>
                <Fade in={openAreaModal}>
                    <div className={classes.paper}>
                        <Typography variant="h6" className={classes.field} >{action} Customer Area</Typography>                    
                        
                        <form onSubmit={onSubmit} noValidate autoComplete="off">
                            <TextField onChange={e=>{setArea_name(e.target.value);setAreaNameErr(false);}} error={areaNameErr} label="Area Name" fullWidth variant="outlined" required className={classes.field}/>
                            <TextField onChange={e=>{setDescription(e.target.value);}} label="Description" multiline rows={3} fullWidth variant="outlined" className={classes.field}/> 
                            <Button type="submit" variant="contained" color="primary" size="small">{action}</Button>
                        </form>
                    </div>
                </Fade>
            </Modal>
    )
}

export default CustomerAreaEntry;

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    field:{
        marginBottom: theme.spacing(2)
    }
  }));


