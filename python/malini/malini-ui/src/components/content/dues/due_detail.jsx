import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ModalHeader from '../utils/ModalHeader';

import { DataGrid } from '@material-ui/data-grid';
import {Button, IconButton, Tooltip, Typography, Box}  from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import {login_atom} from '../login/login_api';
import {useRecoilState, useRecoilValue} from 'recoil';
import {cus_due_atom, act_cus_due_atom, fetch_customer_dues, delete_cus_due} from './cus_due_api';

import { dialog_atom } from '../utils/DialogComp';
import DialogComp from '../utils/DialogComp';
import { message_atom } from '../utils/SnakbarComp';
import SnakbarComp from '../utils/SnakbarComp';
import {gridDateTime} from '../utils/app_utils';
import DueDetailEntry from './due_detail_entry';


const DueDetail = ({selected_customer, openDueDetailModal,toggleDueDetailModal}) => {
    const classes = useStyles();
    const login_data = useRecoilValue(login_atom);
    const user_name = login_data.user_name;

    const [due_list, setDue_list] = useRecoilState(cus_due_atom);
    const [act_cus_due_atom_res, setAct_cus_due_atom_res] = useRecoilState(act_cus_due_atom);
    const [act_message, setAct_message] = useRecoilState(message_atom);
    const [dialog_message, setDialog_message] = useRecoilState(dialog_atom);

    const [edit_marketing, setEdit_marketing] = useState(false);
    const [selected_mkt_due_row, setSeleted_mkt_due_row] = useState(null);

    useEffect(() => {
        if(selected_customer){
            let cus_id = selected_customer['cus_id'];
            const cus_due_res = fetch_customer_dues({cus_id});            
            cus_due_res.then(data => {
                if(data['status'] === 'error'){
                    setAct_message(cus_due_res);
                }else {
                    setDue_list(data);
                }
            });
        }
    }, [openDueDetailModal]);



    const onDialogClose = (ans) => {
        if(ans === 'Y'){
            let cus_id = selected_customer['cus_id'];
            let cus_due_id = setSeleted_mkt_due_row['cus_due_id'];
            let due_json = {cus_due_id,  updated_by: user_name};

            const res = delete_cus_due(due_json);
            res.then(data => {
                setAct_cus_due_atom_res(data);
                if(data.status === 'success'){
                    const cus_due_res = fetch_customer_dues({cus_id});
                    cus_due_res.then(cus_dues => setDue_list(cus_dues));
                }            
                setAct_message(data);
            });
        }
    };

    const onDeleteClick = (row) => {
        setSeleted_mkt_due_row(row);
        let title = 'Delete Due Detail Row';
        let content = 'Are you sure to DELETE row with buy Amt [' + row['mkt_amount'] + '] and payment [' + row['credit_amt'] + '] ?';
        setDialog_message({title, content});
    };

    const onAddNewClick = () => {
        setSeleted_mkt_due_row(null);
        setEdit_marketing(true);
    };

    const onEditClick = (row) => {
        setSeleted_mkt_due_row(row);
        setEdit_marketing(true);
    };

    const toggleEdit_marketingModal = () => {
        setEdit_marketing(!edit_marketing);
    };



    const renderEditButton = (params) => {
        return (            
            <IconButton onClick={() => {onEditClick(params.row);}}>
                <Tooltip title="Edit" arrow><EditIcon fontSize="small" color='primary'/></Tooltip>
            </IconButton>
        );
    }

    const renderDeleteButton = (params) => {
        return (            
            <IconButton onClick={() => {onDeleteClick(params.row) }}>
                <Tooltip title="Delete" arrow><DeleteIcon fontSize="small"  color='secondary'/></Tooltip>
            </IconButton>
        );
    }

    const columns = [
        { field: "cus_due_id", headerName: "Edit", renderCell: renderEditButton ,  width: 105}
        ,{ field: "", headerName: "Delete", renderCell: renderDeleteButton,  width: 120 }
        ,{ field: 'mkt_amount', headerName: 'Buy Amt', width: 180 }
        ,{ field: 'credit_amt', headerName: 'Payment', width: 180 }
        ,{ field: 'mkt_pay_date', headerName: 'Marketing/Payment Dt', width: 200 }
        ,{ field: 'comments', headerName: 'Comments', width: 300 }
        ,{ field: 'created_by', headerName: 'Created By', width: 200 }
        ,{ field: 'created_on', headerName: 'Created On', width: 160, valueGetter: gridDateTime }
        ,{ field: 'updated_by', headerName: 'Updated By', width: 200 }
        ,{ field: 'updated_on', headerName: 'Updated On', width: 160, valueGetter: gridDateTime }
        ];
    
    return (
        <Modal open={openDueDetailModal} onClose={toggleDueDetailModal} size='medium' className={classes.modal}  BackdropComponent={Backdrop}>
            <Fade in={openDueDetailModal}>
                <div className={classes.paper}>
                    <ModalHeader header='Due Details' toggleModal={toggleDueDetailModal}/>
                    <SnakbarComp />
                    <Box display='flex' p={1} >
                        <Box p={1} flexGrow={1}><Typography variant="h6" noWrap > Customer Marketing</Typography></Box>
                        <Box p={1}>
                            <Button type="button" onClick={onAddNewClick} size="small" color="primary" variant="outlined"> Add New</Button>
                        </Box>
                    </Box>
                    <div style={{ height: 500, width: '100%' }}>
                        <DataGrid rows={due_list} columns={columns}   disableSelectionOnClick rowsPerPageOptions={[]} rowHeight={30} headerHeight={32}/>
                    </div>

                    <DueDetailEntry selected_customer={selected_customer} selected_mkt_due_row={selected_mkt_due_row} edit_marketing={edit_marketing} toggleEdit_marketingModal = {toggleEdit_marketingModal} />
                </div>
            </Fade>
        </Modal>
    );
};

export default DueDetail;

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow:'scroll',
      marginTop: 10,
      marginBottom: 5
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    field:{
        marginBottom: theme.spacing(2)
    },
    btn: {marginLeft: theme.spacing(1)},
    area_btn: {margin: theme.spacing(1)},
    
  }));

