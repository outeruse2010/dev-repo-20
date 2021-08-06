import React, {useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Button, IconButton, Tooltip, Typography, Box}  from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CustomerAreaEntry from './CustomerAreaEntry';
import {cus_area_atom, act_cus_area_atom, fetch_customer_areas, delete_cus_area} from './customer_api';

import {useRecoilState, useRecoilValue} from 'recoil';
import { dialog_atom } from '../utils/DialogComp';
import DialogComp from '../utils/DialogComp';
import { message_atom } from '../utils/SnakbarComp';
import SnakbarComp from '../utils/SnakbarComp';

const CustomerArea = () => {

    const [cus_area_list, setCus_area_list] = useRecoilState(cus_area_atom);
    const [act_cus_area_res, setAct_cus_area_res] = useRecoilState(act_cus_area_atom);
    const [dialog_message, setDialog_message] = useRecoilState(dialog_atom);
    const [act_message, setAct_message] = useRecoilState(message_atom);


    useEffect(() => {
            const cus_area_res = fetch_customer_areas();
            if (cus_area_res['status'] === 'error'){
                setAct_message(cus_area_res);
            }else{
                cus_area_res.then(data => setCus_area_list(data));
            }
            
        }, []);

    const [openAreaModal, setOpenAreaModal] = useState(false);
    const [selected_area, setSelected_area] = useState(null);

    const toggleAreaModal = () => {        
        setOpenAreaModal(!openAreaModal);
    };

    const onAddNewClick = () => {
        setSelected_area(null);
        toggleAreaModal();
    }

    const onDeleteClick = (row) => {
        setSelected_area(row);
        let title = 'Delete Customer Area';
        let content = 'Are you sure to DELETE area [' + row['area_name'] + '] ?';
        setDialog_message({title, content});
    };

    const onEditClick = (row) => {
        setSelected_area(row);
        setOpenAreaModal(true);
    };

    const onDialogClose = (ans) => {
        if(ans === 'Y'){
            let area_id = selected_area['area_id'];
            let area_name = selected_area['area_name'];

            let cus_area_json = {area_id, area_name, updated_by: 'Test'};

            const res = delete_cus_area(cus_area_json);
            res.then(data => {
                setAct_cus_area_res(data);
                if(data.status === 'success'){
                    const input = {user:"Test"};
                    const cus_area_res = fetch_customer_areas(input);
                    cus_area_res.then(cus_areas => setCus_area_list(cus_areas));
                }            
                setAct_message(data);
            });
        }
    };
     

    const renderEditButton = (params) => {
        return (            
            <IconButton onClick={() => {onEditClick(params.row);}}>
                <Tooltip title="Edit" arrow><EditIcon fontSize="small"/></Tooltip>
            </IconButton>
        );
    }

    const renderDeleteButton = (params) => {
        return (            
            <IconButton onClick={() => {onDeleteClick(params.row) }}>
                <Tooltip title="Delete" arrow><DeleteIcon fontSize="small"/></Tooltip>
            </IconButton>
        );
    }

    const rows = useRecoilValue(cus_area_atom);
    console.log('***rows: ', rows);

    const columns = [
        { field: "area_id", headerName: "Edit", renderCell: renderEditButton ,  width: 105}
        ,{ field: "", headerName: "Delete", renderCell: renderDeleteButton,  width: 120 }
        ,{ field: 'area_name', headerName: 'Area', width: 180 }
        ,{ field: 'description', headerName: 'Description', width: 300 }
        ,{ field: 'created_by', headerName: 'Created By', width: 200 }
        ,{ field: 'created_on', headerName: 'Created On', width: 150 }
        ,{ field: 'updated_by', headerName: 'Updated By', width: 200 }
        ,{ field: 'updated_on', headerName: 'Updated On', width: 160 }
        ];

    return (
        <div>
            <Box display='flex' p={1} >
                <Box p={1} flexGrow={1}><Typography variant="h6" noWrap > Customer Areas </Typography></Box>
                <Box p={1}>
                <Button type="button" onClick={onAddNewClick} size="small" color="primary" variant="outlined"> Add New Area</Button>
                </Box>
            </Box>

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid rows={rows} columns={columns}   disableSelectionOnClick rowsPerPageOptions={[]}/>
            </div>

            <CustomerAreaEntry selected_area={selected_area} openAreaModal={openAreaModal} toggleAreaModal={toggleAreaModal} />
            <DialogComp onDialogClose={(ans)=> onDialogClose(ans)}/>
            <SnakbarComp />
        </div>
    );
}

export default CustomerArea;



