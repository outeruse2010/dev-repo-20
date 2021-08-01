import React, {useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Button, IconButton, Tooltip, Typography, Box}  from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CustomerAreaEntry from './CustomerAreaEntry';
import {cus_area_atom, fetch_customer_areas} from './customer_api';

import {useRecoilState, useRecoilValue} from 'recoil';

const CustomerArea = () => {

    const [cus_area_list, setCus_area_list] = useRecoilState(cus_area_atom);

    useEffect(() => {
            const input = {user:"Test"};
            const cus_area_res = fetch_customer_areas(input);
            cus_area_res.then(data => setCus_area_list(data));
        }, []);

    const [openAreaModal, setOpenAreaModal] = useState(false);

    const toggleAreaModal = () => setOpenAreaModal(!openAreaModal);

    const renderEditButton = (params) => {
        return (            
            <IconButton aria-label="delete" onClick={() => {
                    console.log('***Row: ', params.row);  }}>
                <Tooltip title="Edit" arrow><EditIcon fontSize="small" /></Tooltip>
            </IconButton>
        );
    }

    const renderDeleteButton = (params) => {
        return (            
            <IconButton aria-label="delete" onClick={() => {
                    console.log('***Row: ', params.row);  }}>
                <Tooltip title="Delete" arrow><DeleteIcon fontSize="small" /></Tooltip>
            </IconButton>
        );
    }

    const rows = useRecoilValue(cus_area_atom);

    const columns = [
        { field: "area_id", headerName: "Edit", renderCell: renderEditButton ,  width: 105}
        ,{ field: "", headerName: "Delete", renderCell: renderDeleteButton,  width: 120 }
        ,{ field: 'area_name', headerName: 'Area', width: 180 }
        ,{ field: 'description', headerName: 'Description', width: 300 }
        ,{ field: 'created_by', headerName: 'Created By', width: 200 }
        ,{ field: 'created_on', headerName: 'Created On', width: 150 }
        ,{ field: 'updated_on', headerName: 'Updated On', width: 160 }
        ];

    return (
        <div>
            <Box display='flex' p={1} >
                <Box p={1} flexGrow={1}><Typography variant="h6" noWrap > Customer Areas </Typography></Box>
                <Box p={1}>
                <Button type="button" onClick={toggleAreaModal} variant="contained" size="small" color="primary" > Add new</Button>
                </Box>
            </Box>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns}   disableSelectionOnClick rowsPerPageOptions={[]}/>
            </div>

            <CustomerAreaEntry openAreaModal={openAreaModal} toggleAreaModal={toggleAreaModal} />
        </div>
    );
}

export default CustomerArea;



