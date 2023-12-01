import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import {
    Stack,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    TablePagination
} from '@mui/material';
import { IconPlus } from '@tabler/icons';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface ColumnProps {
    id: string | number;
    label: string;
    minWidth: number;
    align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
}

const UsersList = (props: any) => {
    const { setOpen, users } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const columns: ColumnProps[] = [
        {
            id: 'username',
            label: 'Username',
            minWidth: 150,
            align: 'left'
        },
        {
            id: 'email',
            label: 'Email',
            minWidth: 200,
            align: 'center'
        },

        {
            id: 'roleName',
            label: 'Role',
            minWidth: 150,
            align: 'center'
        },
        {
            id: 'parentId',
            label: 'Parent',
            minWidth: 150,
            align: 'center'
        }
    ];

    const handleChangePage = () => {
        setPage(0);
    };

    const handleChangeRowsPerPage = () => {
        setRowsPerPage(10);
    };

    return (
        <React.Fragment>
            <MainCard
                content={false}
                title="Users"
                secondary={
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Button variant="contained" startIcon={<IconPlus />} onClick={() => setOpen(true)}>
                            Add User
                        </Button>
                    </Stack>
                }
            >
                {/* table */}
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell sx={{ py: 3 }} key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell sx={{ py: 3, minWidth: 100 }} align={'center'}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => (
                                <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={index}>
                                    {columns?.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {value ? value : '-'}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell align="center">
                                        <Stack direction="row" justifyContent="center" alignItems="center">
                                            <IconButton color="primary" size="large" onClick={() => console.log('visible')}>
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton color="primary" size="large" onClick={() => console.log('edit')}>
                                                <EditOutlinedIcon />
                                            </IconButton>
                                            <IconButton color="error" size="large" onClick={() => console.log('delete')}>
                                                <DeleteOutlineOutlinedIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* table pagination */}
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={users?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </MainCard>
        </React.Fragment>
    );
};

export default UsersList;
