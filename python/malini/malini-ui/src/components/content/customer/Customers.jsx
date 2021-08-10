import React, {useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Button, Typography, Box}  from '@material-ui/core';

import {customer_atom, act_customer_atom, fetch_customers, delete_customer} from './customer_api';

import {login_atom} from '../login/login_api';
import {useRecoilState, useRecoilValue} from 'recoil';
import { dialog_atom } from '../utils/DialogComp';
import DialogComp from '../utils/DialogComp';
import { message_atom } from '../utils/SnakbarComp';
import SnakbarComp from '../utils/SnakbarComp';
import CustomerEntry from './CustomerEntry';
import { gridDateTime } from '../utils/app_utils';
import GridActionMenu from '../utils/grid_action_menu';

const Customers = () => {
    const login_data = useRecoilValue(login_atom);
    const user_name = login_data.user_name;
    const [customer_list, setCustomer_list] = useRecoilState(customer_atom);
    const [act_customer_res, setAct_customer_res] = useRecoilState(act_customer_atom);
    const [dialog_message, setDialog_message] = useRecoilState(dialog_atom);
    const [act_message, setAct_message] = useRecoilState(message_atom);
    const [openCustomerModal, setOpenCustomerModal] = useState(false);
    const [selected_customer, setSelected_customer] = useState(null);
    
    useEffect(() => {
            const customer_res = fetch_customers();
            customer_res.then(data => setCustomer_list(data));
        }, []);

    const toggleCustomerModal = () => {        
        setOpenCustomerModal(!openCustomerModal);
    };

    const onAddNewClick = () => {
        setSelected_customer(null);
        toggleCustomerModal();
    }

    const onDeleteClick = (row) => {
        setSelected_customer(row);
        let title = 'Delete Customer';
        let content = 'Are you sure to DELETE customer [' + row['first_name'] + '] ?';
        setDialog_message({title, content});
    };

    const onEditClick = (row) => {
        setSelected_customer(row);
        setOpenCustomerModal(true);
    };

    const onDialogClose = (ans) => {
        if(ans === 'Y'){
            let cus_id = selected_customer['cus_id'];
            let cus_sr = selected_customer['cus_sr'];
            let first_name = selected_customer['first_name'];

            let customer_json = {cus_id, cus_sr, first_name, updated_by: user_name};

            const res = delete_customer(customer_json);
            res.then(data => {
                setAct_customer_res(data);
                if(data.status === 'success'){                    
                    const customer_res = fetch_customers();
                    customer_res.then(customers => setCustomer_list(customers));
                }            
                setAct_message(data);
            });
        }
    };
     
    const cus_grid_menus = ['Edit', 'Delete'];

    const onGirdMenuClick = (menu_item, row) => {
        switch (menu_item) {
            case cus_grid_menus[0]: //Edit
                onEditClick(row);
                break;
            case cus_grid_menus[1]: //Delete
                onDeleteClick(row);
                break;
        
            default:
                break;
        }
    };

    

    const renderGridMenuButton = (params) => {
        return (            
            <GridActionMenu menu_items={cus_grid_menus} row={params.row} onGirdMenuClick={onGirdMenuClick} />
        );
    }

    const rows = useRecoilValue(customer_atom);

    const columns = [
        { field: "", headerName: "", renderCell: renderGridMenuButton, width: 20 }
        ,{ field: 'cus_sr', headerName: 'Serial', width: 115 }
        ,{ field: 'full_name', headerName: 'Name', width: 200 }
        ,{ field: 'area_name', headerName: 'Location', width: 200 }
        ,{ field: 'total_due', headerName: 'Due (Rs.)', width: 160 }
        ,{ field: 'total_mkt_amount', headerName: 'Marketing (Rs.)', width: 160 }
        ,{ field: 'total_credit_amt', headerName: 'Paid (Rs.)', width: 160 }
        ,{ field: 'address', headerName: 'Address', width: 200 }
        ,{ field: 'email', headerName: 'Email', width: 150 }
        ,{ field: 'phone', headerName: 'Phone', width: 200 }
        ,{ field: 'comments', headerName: 'Comments', width: 200 }
        ,{ field: 'created_by', headerName: 'Created By', width: 160 }
        ,{ field: 'created_on', headerName: 'Created On', width: 160, valueGetter: gridDateTime }
        ,{ field: 'updated_by', headerName: 'Updated By', width: 160 }
        ,{ field: 'updated_on', headerName: 'Updated On', width: 160, valueGetter: gridDateTime }
        ];

    return (
        <div>
            <Box display='flex' p={1} >
                <Box p={1} flexGrow={1}><Typography variant="h6" noWrap > Customers </Typography></Box>
                <Box p={1}>
                <Button type="button" onClick={onAddNewClick} size="small" color="primary" variant="outlined"> Add New Customer</Button>
                </Box>
            </Box>

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} disableSelectionOnClick rowsPerPageOptions={[]} rowHeight={30} headerHeight={32} autoHeight={true}/>
            </div>

            <CustomerEntry selected_customer={selected_customer} openCustomerModal={openCustomerModal} toggleCustomerModal={toggleCustomerModal} />
            <DialogComp onDialogClose={(ans)=> onDialogClose(ans)}/>
            <SnakbarComp />
        </div>
    );
}

export default Customers;
