import { ReactElement, useEffect, useState } from 'react';
import { DataGrid, GridColumns, GridToolbar } from "@mui/x-data-grid";
const organizeJobs = (jobs: any) => {
	const op : any =[]
  
	jobs.props.forEach((jobElement: any) => {
	  console.log(jobElement.job.id)
	  op.push(jobElement.job)

	});
  
	return op;
  };

const DataGridForJobs = (props: any): ReactElement => {
	const op: any = organizeJobs(props)
    const [data,setData] = useState([]);

    const getJobData = async () => {
		setData(op);
    }

    useEffect (() => {
        getJobData();
    },[]);

    

    const columns: GridColumns = [  
      {field : "id", headerName : "JOB ID", width:150, headerAlign:'center'},
  {field : "companyName", headerName : "Company Name", width:250, headerAlign:'center'},
      {field : "role", headerName : "Role", width:150, headerAlign:'center'},
      {field : "status", headerName : "Status" , width:150, headerAlign:'center'},
      {field : "createdAt", headerName : "Created At" , width:150, headerAlign:'center'},
      {field : "updatedAt", headerName : "Updated At" , width:150, headerAlign:'center'},
  ];

    const rows = data.map((row: any) => ({
        id : row.id,
		companyName : row.companyName,
        role : row.role,
        status : row.status,
        createdAt : row.createdAt,
        updatedAt : row.updatedAt
    }))

    console.log(data)
    return <div style = {{height : 650, width : "100%"}}>
        <DataGrid
              rows={rows}
              columns={columns}
              components={{ Toolbar: GridToolbar }} 
              disableColumnMenu />
      </div>
}

export default DataGridForJobs;