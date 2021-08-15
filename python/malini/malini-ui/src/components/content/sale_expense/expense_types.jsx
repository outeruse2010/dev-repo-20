import React, {useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Button, IconButton, Tooltip, Typography, Box}  from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {expense_type_atom, act_expense_type_atom, fetch_expense_types, delete_expense_type} from './sale_expense_api';

import {login_atom} from '../login/login_api';
import {useRecoilState, useRecoilValue} from 'recoil';
import { dialog_atom } from '../utils/DialogComp';
import DialogComp from '../utils/DialogComp';
import { message_atom } from '../utils/SnakbarComp';
import SnakbarComp from '../utils/SnakbarComp';
import {gridDate, gridDateTime} from '../utils/app_utils';
import ExpenseTypeEntry from './expense_type_entry';

const ExpenseTypes = () => {

    const login_data = useRecoilValue(login_atom);
    const user_name = login_data.user_name;

    const [openDia, setOpenDia] = useState(false);
    const [act_message, setAct_message] = useRecoilState(message_atom);
    
    const [act_expense_type_res, setAct_expense_type_res] = useRecoilState(act_expense_type_atom);
    const [dialog_message, setDialog_message] = useRecoilState(dialog_atom);
    const [expense_type_list, setExpense_type_list] = useRecoilState(expense_type_atom);
    const [selected_expense_type, setSelected_expense_type] = useState(null);
    const [openExpenseTypeModal, setOpenExpenseTypeModal] = useState(false);



    useEffect(() => {
        const expense_types_res = fetch_expense_types();            
        expense_types_res.then(data => {
            if(data['status'] === 'error'){
                setAct_message(expense_types_res);
            }else {
                setExpense_type_list(data);
            }
        });
    }, []);

    
    const toggleExpenseTypeModal = () => {        
        setOpenExpenseTypeModal(!openExpenseTypeModal);
    };

    const onAddNewClick = () => {
        setSelected_expense_type(null);
        toggleExpenseTypeModal();
    }

    const onDeleteClick = (row) => {
        setSelected_expense_type(row);
        let title = 'Delete Expense Type';
        let content = 'Are you sure to DELETE expense type [' + row['expense_name'] + '] ?';
        setDialog_message({title, content});
        setOpenDia(true);
    };

    const onEditClick = (row) => {
        setSelected_expense_type(row);
        setOpenExpenseTypeModal(true);
    };

    const onDialogClose = (ans) => {
        if(ans === 'Y'){
            let expense_type_id = selected_expense_type['expense_type_id'];
            let expense_name = selected_expense_type['expense_name'];

            let input_json = {expense_type_id, expense_name, updated_by: user_name};

            const res = delete_expense_type(input_json);
            res.then(data => {
                setAct_expense_type_res(data);
                if(data.status === 'success'){
                    const exp_type_res = fetch_expense_types();
                    exp_type_res.then(exp_types => setExpense_type_list(exp_types));
                }            
                setAct_message(data);
            });
        }
        setOpenDia(false);
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
        { field: "expense_type_id", headerName: "Edit", renderCell: renderEditButton ,  width: 105}
        ,{ field: "", headerName: "Delete", renderCell: renderDeleteButton,  width: 120 }
        ,{ field: 'expense_name', headerName: 'Expense', width: 180 }
        ,{ field: 'comments', headerName: 'Description', width: 300 }
        ,{ field: 'created_by', headerName: 'Created By', width: 200 }
        ,{ field: 'created_on', headerName: 'Created On', width: 160, valueGetter: gridDateTime }
        ,{ field: 'updated_by', headerName: 'Updated By', width: 200 }
        ,{ field: 'updated_on', headerName: 'Updated On', width: 160, valueGetter: gridDateTime }
        ];


    return (
        <div>
            <SnakbarComp />
            <Box display='flex' p={1} >
                <Box p={1} flexGrow={1}><Typography variant="h6" noWrap > Expense Types</Typography></Box>
                <Box p={1}>
                <Button type="button" onClick={onAddNewClick} size="small" color="primary" variant="outlined"> Add New Expense Type</Button>
                </Box>
            </Box>

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid rows={expense_type_list} columns={columns}   disableSelectionOnClick rowsPerPageOptions={[]} rowHeight={30} headerHeight={32}/>
            </div>

            <ExpenseTypeEntry selected_expense_type={selected_expense_type} openExpenseTypeModal={openExpenseTypeModal} toggleExpenseTypeModal={toggleExpenseTypeModal} />
            <DialogComp show={openDia} onDialogClose={(ans)=> onDialogClose(ans)}/>
                     
        </div>
    )
};

export default ExpenseTypes;
