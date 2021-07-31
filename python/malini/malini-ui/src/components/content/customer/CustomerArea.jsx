import React, {useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Button, IconButton, Tooltip, Typography, Box}  from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CustomerAreaEntry from './CustomerAreaEntry';

const CustomerArea = () => {

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

    const rows = [
        { id: 1, area_name: 'Snow', description: 'Jon', age: 35 }
      ];

    const columns = [
        { field: "Edit", headerName: "",renderCell: renderEditButton ,  width: 110}
        ,{ field: "Delete", headerName: "",renderCell: renderDeleteButton,  width: 120 }
        ,{ field: 'area_name', headerName: 'Area', width: 200 }
        ,{ field: 'description', headerName: 'Description', width: 300 }
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



