import * as React from 'react';

// material-ui
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    IconButton,
    Collapse,
    Box,
    Grid
} from '@mui/material';

//type
import { KeyedObject } from 'types';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ProjectService from 'services/project.service';
import { ProjectDetails } from 'types/project';
import { UseApp } from 'hooks/useApp';
import { InputFieldDetails } from 'types/input-field';
import moment from 'moment-timezone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CostTable from './CostTable';
import { formatDateForTracker } from 'utils/date.utils';

interface ReportProjectListProps {
    projectType: number; // Type ID for the selected project type
    appliedFilters: any; // Array of applied filters
}

export default function ReportProjectList(props: ReportProjectListProps) {
    const { projectType, appliedFilters } = props;
    const { app, setApp } = UseApp();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [projectList, setProjectList] = React.useState<ProjectDetails[]>([]);
    const [open, setOpen] = React.useState<any>({});

    // Function to handle page change
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };

    // Function to handle rows per page change
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        setRowsPerPage(+event?.target?.value!);
        setPage(0);
    };

    const formatValue = (type: string, value: any) => {
        if (type === 'Date' && value) {
            const formattedDate = moment(value).tz(moment.tz.guess()).format('YYYY-MM-DD');
            return formattedDate;
        } else if (typeof value === 'object' && value !== null) {
            let result = 0;
            Object.keys(value)?.forEach((item) => {
                result = result + parseInt(value[item]);
            });
            return result;
        } else {
            if (typeof value !== 'object') return value;
        }
    };

    const handleCollapse = (stateOpen: boolean, index: number) => {
        setOpen((prev: any) => ({ ...prev, [index]: !stateOpen }));
    };

    const getDetailSection = (row: any) => {
        let list: any = [];
        row?.inputFields?.forEach((item: any) => {
            if (typeof item.value === 'object' && item.value !== null) {
                const value = app?.inputFieldList?.filter((field: any) => field.id === item.id);
                list.push({
                    label: value?.length ? value[0].name : '',
                    data: item.value
                });
            }
        });

        return list?.map((item: any, index: number) => {
            return (
                <Grid item lg={4} key={index}>
                    <CostTable label={item.label} data={item.data} />
                </Grid>
            );
        });
    };

    // Fetch project list data based on filters
    React.useEffect(() => {
        const getProjectList = async () => {
            const filters: any = {
                typeId: projectType,
                inputFields: appliedFilters?.inputFields
            };
            if (appliedFilters.startDate) filters.createdStartDate = appliedFilters.startDate;
            if (appliedFilters.endDate) filters.createdEndDate = appliedFilters.endDate;
            ProjectService.getProjectsAsync(filters).then((res: any) => {
                if (res?.length) {
                    setApp((prev: any) => ({ ...prev, projectList: res }));
                    res?.forEach((item: any) => {
                        item.open = true;
                    });
                }
                setProjectList(res);
            });
        };
        getProjectList();
    }, [projectType, appliedFilters]);

    return (
        <React.Fragment>
            <MainCard content={false} title="Projects">
                {/* table */}
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell sx={{ py: 3, minWidth: 180 }} align={'left'}>
                                    Title
                                </TableCell>
                                {app?.inputFieldList?.map((column: InputFieldDetails) => (
                                    <TableCell sx={{ py: 3 }} key={column.id} align={'center'} style={{ minWidth: 150 }}>
                                        {column.name}
                                    </TableCell>
                                ))}
                                <TableCell sx={{ py: 3, minWidth: 180 }} align={'center'}>
                                    Created At
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projectList
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                ?.filter((item: any) => {
                                    if (appliedFilters?.name?.length) {
                                        if (appliedFilters?.name?.filter((list: any) => list.id === item.id)?.length) return item;
                                        else return false;
                                    } else return item;
                                })
                                .map((row: KeyedObject, index: number) => (
                                    <React.Fragment key={index}>
                                        <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1}>
                                            <TableCell>
                                                <IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    onClick={() => handleCollapse(open[index], index)}
                                                >
                                                    {open[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align={'left'}>{row.name}</TableCell>
                                            {app?.inputFieldList?.map((column: any) => {
                                                const value = row?.inputFields?.filter((item: any) => item.id === column.id);
                                                return (
                                                    <TableCell key={column.id} align={'center'}>
                                                        {value?.length ? formatValue(column.type, value[0].value) : '-'}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell align={'left'}>{formatDateForTracker(row.createdAt)}</TableCell>
                                        </TableRow>
                                        {open[index] && (
                                            <TableRow>
                                                <TableCell
                                                    style={{ paddingBottom: 0, paddingTop: 0 }}
                                                    colSpan={app?.inputFieldList?.length + 2}
                                                >
                                                    <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 2 }}>
                                                            <Grid container spacing={3}>
                                                                {getDetailSection(row)}
                                                            </Grid>
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* table pagination */}
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={projectList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </MainCard>
        </React.Fragment>
    );
}
