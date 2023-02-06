import { ReactElement, useEffect, useState } from 'react';
import { DataGrid, GridColumns, GridToolbar,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector, } from '@mui/x-data-grid';
import { Theme, styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
    

const organizeJobs = (jobs: any)=> {
	const op: any = []
  
	jobs.props.forEach((jobElement: any) => {
	  console.log(jobElement.job.id)
	  op.push(jobElement.job)
	});
  
	return op;
  };




  function customCheckbox(theme: Theme) {
    return {
      '& .MuiCheckbox-root svg': {
        width: 16,
        height: 16,
        backgroundColor: 'transparent',
        border: `1px solid ${
          theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
        }`,
        borderRadius: 2,
      },
      '& .MuiCheckbox-root svg path': {
        display: 'none',
      },
      '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
        backgroundColor: '#1890ff',
        borderColor: '#1890ff',
      },
      '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
        position: 'absolute',
        display: 'table',
        border: '2px solid #fff',
        borderTop: 0,
        borderLeft: 0,
        transform: 'rotate(45deg) translate(-50%,-50%)',
        opacity: 1,
        transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
        content: '""',
        top: '50%',
        left: '39%',
        width: 5.71428571,
        height: 9.14285714,
      },
      '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
        width: 8,
        height: 8,
        backgroundColor: '#1890ff',
        transform: 'none',
        top: '39%',
        border: 0,
      },
    };
  }
  
  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    color:
      theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
      borderRight: `1px solid ${
        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: `1px solid ${
        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
    },
    '& .MuiDataGrid-cell': {
      color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
    },
    ...customCheckbox(theme),
  }));
  
  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  
    return (
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        page={page + 1}
        count={pageCount}
        // @ts-expect-error
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event: React.ChangeEvent<unknown>, value: number) =>
          apiRef.current.setPage(value - 1)
        }
      />
    );
  }

const SpreadSheet = (props: any): ReactElement =>{
    const op: any = organizeJobs(props)
	console.log("OP\n")
	console.log(op)
    const [data,setData] = useState([]);

    const getJobData = async () => {
		setData(op);
    }

    useEffect (() => {
        getJobData();
    });

    

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
    }));


//New view
  return (
  <div style={{ height: 400, width: '100%' }}>
              <StyledDataGrid
                  columns={columns} rows={rows} 
                  checkboxSelection
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  components={{
                      Pagination: CustomPagination,
                    Toolbar: GridToolbar 
                  }} />
          </div>
  );
}

export default SpreadSheet;