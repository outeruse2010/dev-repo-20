import React, {useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Button, IconButton, Tooltip, Typography, Box}  from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import {login_atom} from '../login/login_api';
import {useRecoilState, useRecoilValue} from 'recoil';
import { dialog_atom } from '../utils/DialogComp';
import DialogComp from '../utils/DialogComp';
import { message_atom } from '../utils/SnakbarComp';
import SnakbarComp from '../utils/SnakbarComp';
import {gridDate, gridDateTime} from '../utils/app_utils';
import {sale_expense_atom, act_sale_expense_atom, fetch_daily_sale_expenses, delete_daily_sale_expense} from './sale_expense_api';
import DailySaleExpenseEntry from './daily_sale_expense_entry';

const DailySaleExpense = () => {
    const login_data = useRecoilValue(login_atom);
    const user_name = login_data.user_name;

    const [openDia, setOpenDia] = useState(false);
    const [act_message, setAct_message] = useRecoilState(message_atom);
    const [dialog_message, setDialog_message] = useRecoilState(dialog_atom);
    const [act_sale_expense_res, setAct_sale_expense_res] = useRecoilState(act_sale_expense_atom);
    const [sale_expense_list, setSale_expense_list] = useRecoilState(sale_expense_atom);
    const [selected_sale_expense, setSelected_sale_expense] = useState(null);
    const [openSaleExpenseModal, setOpenSaleExpenseModal] = useState(false);



    useEffect(() => {
        const sale_exp_res = fetch_daily_sale_expenses();            
        sale_exp_res.then(data => {
            if(data['status'] === 'error'){
                setAct_message(sale_exp_res);
            }else {
                setSale_expense_list(data);
            }
        });
    }, []);

    
    const toggleSaleExpenseModal = () => {        
        setOpenSaleExpenseModal(!openSaleExpenseModal);
    };

    const onAddNewClick = () => {
        setSelected_sale_expense(null);
        toggleSaleExpenseModal();
    }

    const onDeleteClick = (row) => {
        setSelected_sale_expense(row);
        let title = 'Delete Sale Expense';
        let content = 'Are you sure to DELETE sale expense type ?';
        setDialog_message({title, content});
        setOpenDia(true);
    };

    const onEditClick = (row) => {
        setSelected_sale_expense(row);
        setOpenSaleExpenseModal(true);
    };

    const onDialogClose = (ans) => {
        if(ans === 'Y'){
            let sale_expense_id = selected_sale_expense['sale_expense_id'];
            let expense_name = selected_sale_expense['expense_name'];

            let input_json = {sale_expense_id, expense_name, updated_by: user_name};

            const res = delete_daily_sale_expense(input_json);
            res.then(data => {
                setAct_sale_expense_res(data);
                if(data.status === 'success'){
                    const sale_exp_res = fetch_daily_sale_expenses();
                    sale_exp_res.then(sale_exps => setSale_expense_list(sale_exps));
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
        { field: "sale_expense_id", headerName: "Edit", renderCell: renderEditButton ,  width: 105}
        ,{ field: "", headerName: "Delete", renderCell: renderDeleteButton,  width: 120 }
        ,{ field: 'expense_name', headerName: 'Expense', width: 180 }
        ,{ field: 'cash_sale_amount', headerName: 'Cash Sale', width: 180 }
        ,{ field: 'expense_amt', headerName: 'Expense', width: 180 },
        ,{ field: 'sale_expense_date', headerName: 'Sale/Exp Date', width: 160, valueGetter: gridDate }
        ,{ field: 'comments', headerName: 'Comments', width: 300 }
        ,{ field: 'created_by', headerName: 'Created By', width: 200 }
        ,{ field: 'created_on', headerName: 'Created On', width: 160, valueGetter: gridDateTime }
        ,{ field: 'updated_by', headerName: 'Updated By', width: 200 }
        ,{ field: 'updated_on', headerName: 'Updated On', width: 160, valueGetter: gridDateTime }
        ];


    return (
        <div>
            <SnakbarComp />
            <Box display='flex' p={1} >
                <Box p={1} flexGrow={1}><Typography variant="h6" noWrap >Daily Sale Expenses</Typography></Box>
                <Box p={1}>
                <Button type="button" onClick={onAddNewClick} size="small" color="primary" variant="outlined" startIcon={<AddIcon />}> Add New </Button>
                </Box>
            </Box>

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid rows={sale_expense_list} columns={columns}   disableSelectionOnClick rowsPerPageOptions={[]} rowHeight={30} headerHeight={32}/>
            </div>

            <DailySaleExpenseEntry selected_sale_expense={selected_sale_expense} openSaleExpenseModal={openSaleExpenseModal} toggleSaleExpenseModal={toggleSaleExpenseModal} />
            <DialogComp show={openDia} onDialogClose={(ans)=> onDialogClose(ans)}/>
                     
        </div>
    )
};


export default DailySaleExpense;