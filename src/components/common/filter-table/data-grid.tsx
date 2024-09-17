'use client';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { GridToolbar } from '@mui/x-data-grid/components/toolbar';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { DataGridProps } from '@mui/x-data-grid/models/props/DataGridProps';

// // table columns
// export const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 120 },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     flex: 2,
//     minWidth: 160,
//     valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
//   },
//   { field: 'firstName', headerName: 'First name', flex: 1, minWidth: 164 },
//   { field: 'lastName', headerName: 'Last name', flex: 0.75, minWidth: 164 },
//   {
//     field: 'age',
//     headerName: 'Age',
//     flex: 0.5,
//     minWidth: 120
//   }
// ];

// // table rows
// export const rows: GridRowsProp = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lancaster', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lancaster', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
// ];

// ==============================|| TABLE - BASIC DATA GRID ||============================== //

export interface DataGridTableProps extends DataGridProps {
    width?: number | string;
    height?: number | string;
}

export const DataGridTable = ({ props, handleUpdate }: { props: DataGridTableProps; handleUpdate?: () => void }) => {
    const init: DataGridProps = {
        autoHeight: false,
        initialState: {
            pagination: {
                paginationModel: {
                    pageSize: 10
                }
            }
        },
        // slots: { toolbar: GridToolbar },
        onPaginationModelChange(model, details) {
            // console.log(model)
        },
        onSortModelChange: (model, details) => {
            // console.log(model)
        },
        onStateChange: (params) => {
            // console.log(params)
        },
        pageSizeOptions: [10, 20, 100],
        ...props
    };

    return (
        <Box minWidth={props.width} height={props.height}>
            <DataGrid {...init} />
        </Box>
    );
};

export const DataGridHeader = ({ mainTitle, subTitle }: { mainTitle?: string; subTitle?: string }) => (
    <Stack spacing={1}>
        <Typography variant="h4" whiteSpace={"normal"}>{mainTitle}</Typography>
        <Typography variant="h5" color={'#28a745'}>
            {subTitle}
        </Typography>
    </Stack>
);
