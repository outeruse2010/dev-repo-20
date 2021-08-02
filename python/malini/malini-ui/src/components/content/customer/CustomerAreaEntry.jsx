import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Divider from '@material-ui/core/Divider';

import {TextField, Button, Typography}  from '@material-ui/core';

import {useRecoilState} from 'recoil';

import {cus_area_atom,act_cus_area_atom, add_cus_area, fetch_customer_areas} from './customer_api';
import SnakbarComp, {message_atom} from '../utils/SnakbarComp';
import { ClassRounded } from '@material-ui/icons';



const CustomerAreaEntry = ({selected_area, openAreaModal, toggleAreaModal}) => {
    const classes = useStyles();
    const action = selected_area ? 'Update' : 'Add New';
    const [area_name, setArea_name] = useState('');
    const [description, setDescription] = useState('');
    const [areaNameErr, setAreaNameErr] = useState(false);
    const [cus_area_list, setCus_area_list] = useRecoilState(cus_area_atom);
    const [act_cus_area_res, setAct_cus_area_res] = useRecoilState(act_cus_area_atom);
    const [act_message, setAct_message] = useRecoilState(message_atom);
    console.log('****selected_area: ',selected_area);

    useEffect(()=> {
        console.log('****useEffect selected_area: ',selected_area);
        if(selected_area){
            console.log(' are nm: ', selected_area['area_name']);
            setArea_name(selected_area['area_name']);
            setDescription(selected_area.description);
        }
    }, []);
    

    const onReset = () => {
        setArea_name('');
        setDescription('');
        toggleAreaModal();
    }

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
            setAct_message(data);
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
                        
                        <form onSubmit={onSubmit} onReset={onReset} noValidate autoComplete="off">
                            <TextField onChange={e=>{setArea_name(e.target.value);setAreaNameErr(false);}} error={areaNameErr} label="Area Name" fullWidth variant="outlined" required className={classes.field}/>
                            <TextField onChange={e=>{setDescription(e.target.value);}} label="Description" multiline rows={3} fullWidth variant="outlined" className={classes.field}/> 
                            <Button type="submit" variant="contained" color="primary" size="small">{action}</Button>
                            {(action === 'Add New') && <Button type="reset" variant="contained" size="small" className={classes.btn}>Reset</Button>}
                            {(action === 'Update') && <Button type="reset" variant="contained" size="small" className={classes.btn}>Cancel</Button>}
                        </form>
                        <SnakbarComp />
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
    },
    btn: {marginLeft: theme.spacing(1)}
  }));


