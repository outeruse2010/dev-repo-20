import React, {useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Button, IconButton, Tooltip, Typography, Box}  from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CustomerAreaEntry from './CustomerAreaEntry';
import {fetch_customer_areas} from './customer_api';

const api_url = (url) => ("http://127.0.0.1:5000/"+url); 

export const fetch_graphql_post = (url, query) => {
    const api = api_url(url);
    let response = {};

        fetch(api, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        query: query
                    })
                } ).then(res => res.json)
                .then(data=> {console.log('****data: ',data); response = data.data;})
                .catch(err => console.log('err'));
    return response;

}

const CustomerArea = () => {

    useEffect(()=>{
        console.log('*****useEffect====');
        // let qry = "query cus_area_query{ cusAreas { area_id, area_name, description, created_on, created_by, updated_on, updated_by, deleted}}";
        // fetch_graphql_post('graphql_cus_area_list', qry);
        // const url = api_url('fetch_customer_areas');
        // const input = {"user": "Test"};
        // fetch(url, {method: "POST", headers: { "Content-Type": "application/json" }, 
        //            data:input }).then(res=> res.json()).then(res_json=> console.log(res_json));
        // fetch(url).then(res=> res.json()).then(res_json=> console.log(res_json));
        
        const input = {user:"Test"};
        const cus_area_res = fetch_customer_areas(input);
        cus_area_res.then(data=> {console.log('*******data: ',data); });


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



