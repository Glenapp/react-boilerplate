import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import CustomCard from 'ui-component/common/CustomCard';
import SmallWidthTooltip from 'ui-component/common/SmallWidthTooltip';
import Chip from 'ui-component/extended/Chip';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteTwoTone';
import { DEFAULT_PAGE_SIZE, INITIAL_PAGE, ROWS_PER_PAGE_OPTIONS } from 'constant';
import CreateSubAdminDialog from './Components/CreateSubAdminDialog';
import UpdateSubAdminDialog from './Components/UpdateSubAdminDialog';
import DeleteConfirmationDialog from 'ui-component/common/DeleteConfirmationDialog';

const CreateSubAdminPage = () => {
    const [page, setPage] = useState<number>(INITIAL_PAGE);

    const [createDialogOpened, setCreateDialogOpened] = useState<boolean>(false);
    const [updateDialogOpened, setUpdateDialogOpened] = useState<any | null>(null);
    const [deleteDialogOpened, setDeleteDialogOpened] = useState<any | null>(null);
    const [rowsPerPage, setRowsPerPage] = useState<number>(DEFAULT_PAGE_SIZE);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
        const rowLimit = parseInt(event?.target.value!, 10);
        setRowsPerPage(rowLimit);
        setPage(0);
    };

    async function createSubAdminAsync(data: any) {
        alert(JSON.stringify(data, null, 2));
        setCreateDialogOpened(false);
    }

    async function updateSubAdminAsync(data: any) {
        alert(JSON.stringify(data, null, 2));
        setCreateDialogOpened(false);
    }

    async function deleteSubadminAsync(SubadminToDelete: any) {
        alert('delete');
    }

    return (
        <>
            <CustomCard
                title={'create Sub Admin'}
                sx={{
                    mb: '1.55rem',
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Typography fontWeight={500} fontSize={'1.125rem'}>
                    {'Create Sub Admin'}
                </Typography>
                <Button
                    color="secondary"
                    variant="contained"
                    sx={{
                        alignSelf: 'center',
                        '& .MuiSvgIcon-root': {
                            fontSize: '22px'
                        },
                        border: '1.084px solid',
                        borderColor: 'grey.200',
                        boxShadow: '0px 1.97516px 13.16774px 0px rgba(0, 0, 0, 0.02)',
                        borderRadius: '12px'
                    }}
                    onClick={() => {
                        setCreateDialogOpened(true);
                    }}
                >
                    Add New
                </Button>
            </CustomCard>
            <MainCard smallTitle darkTitle content={false}>
                <TableContainer component={Paper}>
                    <Table
                        id="sites"
                        sx={{
                            minWidth: { sm: 650, xs: 'initial' },
                            '& tbody tr td:nth-of-type(1)': {
                                paddingLeft: '25px'
                            },
                            '& thead tr th:nth-of-type(1)': {
                                paddingLeft: '25px'
                            }
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Admin name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Created At</TableCell>
                                <TableCell sx={{ pr: 2 }} align="right">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell scope="row" align="left">
                                    <Typography align="left" variant="subtitle1" component="div">
                                        {'Alex'}
                                    </Typography>
                                </TableCell>
                                <TableCell scope="row" align="left">
                                    <Typography align="left" variant="subtitle1" component="div">
                                        {'Alex@gmail.com'}
                                    </Typography>
                                </TableCell>

                                <TableCell scope="row" align="left">
                                    <Typography align="left" variant="subtitle1" component="div">
                                        <Chip label={'Active'} chipcolor={'success'} size="small" />
                                    </Typography>
                                </TableCell>
                                <TableCell scope="row" align="left">
                                    <Typography align="left" variant="subtitle1" component="div">
                                        {'05/11/23'}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap' }} align="right">
                                    <SmallWidthTooltip title="Edit" placement="top" arrow>
                                        <span>
                                            <IconButton color="secondary">
                                                <EditTwoToneIcon onClick={() => setUpdateDialogOpened(true)} />
                                            </IconButton>
                                        </span>
                                    </SmallWidthTooltip>

                                    <SmallWidthTooltip title="Delete" placement="top" arrow>
                                        <IconButton>
                                            <DeleteOutlineOutlinedIcon onClick={() => setDeleteDialogOpened(true)} />
                                        </IconButton>
                                    </SmallWidthTooltip>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row" align="left">
                                    <Typography align="left" variant="subtitle1" component="div">
                                        {'Author'}
                                    </Typography>
                                </TableCell>
                                <TableCell scope="row" align="left">
                                    <Typography align="left" variant="subtitle1" component="div">
                                        {'Author@gmail.com'}
                                    </Typography>
                                </TableCell>

                                <TableCell scope="row" align="left">
                                    <Typography align="left" variant="subtitle1" component="div">
                                        <Chip label={'Inactive'} chipcolor={'error'} size="small" />
                                    </Typography>
                                </TableCell>
                                <TableCell scope="row" align="left">
                                    <Typography align="left" variant="subtitle1" component="div">
                                        {'05/11/23'}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap' }} align="right">
                                    <SmallWidthTooltip title="Edit" placement="top" arrow>
                                        <span>
                                            <IconButton color="secondary">
                                                <EditTwoToneIcon onClick={() => setUpdateDialogOpened(true)} />
                                            </IconButton>
                                        </span>
                                    </SmallWidthTooltip>

                                    <SmallWidthTooltip title="Delete" placement="top" arrow>
                                        <IconButton>
                                            <DeleteOutlineOutlinedIcon />
                                        </IconButton>
                                    </SmallWidthTooltip>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                    component="div"
                    count={0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </MainCard>
            <CreateSubAdminDialog
                open={createDialogOpened}
                handleClose={() => setCreateDialogOpened(false)}
                onSubmit={(data: any) => createSubAdminAsync(data)}
            />
            <UpdateSubAdminDialog
                open={!!updateDialogOpened}
                handleClose={() => setUpdateDialogOpened(null)}
                onSubmit={(data: any) => updateSubAdminAsync(data)}
                details={updateDialogOpened || ({} as any)}
            />
            <DeleteConfirmationDialog
                open={!!deleteDialogOpened}
                handleClose={() => {
                    setDeleteDialogOpened(null);
                }}
                deleteItem={deleteSubadminAsync}
                details={deleteDialogOpened || ({} as any)}
            />
        </>
    );
};

export default CreateSubAdminPage;
