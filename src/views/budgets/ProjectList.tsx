import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
    Button,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    OutlinedInput
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import styled from '@emotion/styled';

//type
import { KeyedObject } from 'types';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ProjectDelete from './ProjectDelete';
import { UseApp } from 'hooks/useApp';
import ProjectService from 'services/project.service';
import ProjectTypeService from 'services/project-type.service';
import { ProjectTypeDetails } from 'types/project-type';
import { InputFieldDetails } from 'types/input-field';
import { IconSearch } from '@tabler/icons';
import { ProjectDetails } from 'types/project';
import useAuth from 'hooks/useAuth';

// table columns
interface ColumnProps {
    id: string | number;
    fieldType: string;
    label: string;
    minWidth: number;
    align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
    format?: (value: Date | number) => string | boolean;
}

// Component Props
interface ProjectListProps {
    project: {
        open: boolean;
        id?: number;
        details: any;
    };
    setProject?: any;
}

const OutlineInputStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    }
}));

const ProjectList: React.FC<ProjectListProps> = ({ project, setProject }) => {
    const { app, setApp } = UseApp();
    const { checkPermission } = useAuth();
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [showDelete, setShowDelete] = React.useState(false);
    const [projectList, setProjectList] = React.useState<ProjectDetails[]>([]);
    const [selectedProjectType, setSelectedProjectType] = React.useState<number>(1);
    const [projectTypes, setProjectTypes] = React.useState<ProjectTypeDetails[]>([]);
    const [columns, setColumns] = React.useState<ColumnProps[]>([]);
    const [searchValue, setSearchValue] = React.useState<string>('');

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        setRowsPerPage(+event?.target?.value!);
        setPage(0);
    };

    const handleEdit = (id: number) => {
        navigate('/update-budget/' + id);
    };

    const handleDeleteOpen = (id: number) => {
        setShowDelete(true);
        setProject((prev: any) => ({ ...prev, id: id, details: {} }));
    };

    const handleDelete = () => {
        setShowDelete(false);
        if (project.id) {
            ProjectService.deleteProjectAsync(project.id).then((res: any) => {
                getProjectList();
                setApp((prev) => ({
                    ...prev,
                    popupMessage: {
                        message: 'Project Delete Successfully!',
                        type: 'success',
                        show: true
                    }
                }));
            });
        }
    };

    const getProjectDetails = (id: number) => {
        ProjectService.getProjectAsync(id).then((res) => {
            setProject((prev: any) => ({ ...prev, id: id, open: true, details: res }));
        });
    };

    const getProjectList = React.useCallback(() => {
        const obj = {
            typeId: app.selectedBudgetType
        };
        ProjectService.getProjectsAsync(obj).then((res: any) => {
            setProjectList(res);
        });
    }, [app.selectedBudgetType]);

    const checkFilter = (list: ProjectDetails[]) => {
        if (searchValue) {
            const checkInputFilter = (item: any, id: number) => {
                return item?.find((val: any) => val.id === id)?.value?.toString();
            };
            if (app.selectedBudgetType === 1) {
                const clarityID = app?.inputFieldList?.find((item: any) => item.name === 'Clarity ID')?.id;
                return list?.filter(
                    (item) =>
                        item?.name?.toLowerCase().includes(searchValue?.toLowerCase()) ||
                        checkInputFilter(item?.inputFields, clarityID)?.toLowerCase()?.includes(searchValue?.toLowerCase())
                );
            } else {
                const mu3Id = app?.inputFieldList?.find((item: any) => item.name === 'MU3')?.id;
                const mu4Id = app?.inputFieldList?.find((item: any) => item.name === 'MU4')?.id;
                return list?.filter(
                    (item) =>
                        item?.name?.toLowerCase().includes(searchValue?.toLowerCase()) ||
                        checkInputFilter(item?.inputFields, mu3Id)?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
                        checkInputFilter(item?.inputFields, mu4Id)?.toLowerCase()?.includes(searchValue?.toLowerCase())
                );
            }
        } else {
            return list;
        }
    };

    const handleProjectTypeChange = (e: any) => {
        setApp((prev) => ({
            ...prev,
            selectedBudgetType: e.target.value
        }));
    };

    // Fetch project types
    React.useEffect(() => {
        const fetchProjectTypes = () => {
            ProjectTypeService.getProjectTypesAsync()
                .then((res: any) => {
                    setProjectTypes(res);
                })
                .catch((err) => console.log(err));
        };
        fetchProjectTypes();
    }, []);

    const updateInputFieldList = React.useCallback(
        (res: any) => {
            setApp((prev) => ({
                ...prev,
                inputFieldList: res
            }));
        },
        [setApp]
    );

    React.useEffect(() => {
        const getInputFields = () => {
            ProjectTypeService.getInputFieldsByProjectTypeAsync(app.selectedBudgetType).then((res: InputFieldDetails[]) => {
                updateInputFieldList(res);
            });
        };
        getProjectList();
        getInputFields();
    }, [app.selectedBudgetType, getProjectList, updateInputFieldList]);

    React.useEffect(() => {
        if (app.inputFieldList?.length) {
            const col: ColumnProps[] = [
                {
                    id: 'name',
                    fieldType: 'info',
                    label: 'Name',
                    minWidth: 150,
                    align: 'center'
                },
                {
                    id: 'typeName',
                    fieldType: 'info',
                    label: 'Type',
                    minWidth: 100,
                    align: 'center'
                }
            ];
            let filteredInputs = [];
            if (app.selectedBudgetType === 1) {
                filteredInputs = app?.inputFieldList?.filter((item: any) => item.name === 'Clarity ID' || item.name === 'Project Type');
            } else {
                filteredInputs = app?.inputFieldList?.filter(
                    (item: any) => item.name === 'MU3' || item.name === 'MU4' || item.name === 'Director' || item.name === 'Vendor Names'
                );
            }
            filteredInputs?.forEach((item: InputFieldDetails) => {
                col.push({
                    id: item.id,
                    fieldType: 'input',
                    label: item.name,
                    minWidth: 150,
                    align: 'center'
                });
            });
            setColumns(col);
        }
    }, [app.inputFieldList, app.selectedBudgetType]);

    return (
        <React.Fragment>
            <MainCard
                content={false}
                title="Budgets"
                secondary={
                    <Stack direction="row" spacing={2} alignItems="center">
                        <OutlineInputStyle
                            id="input-search-header"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search"
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch stroke={1.5} size="1rem" />
                                </InputAdornment>
                            }
                            aria-describedby="search-helper-text"
                            inputProps={{ 'aria-label': 'weight' }}
                        />
                        {/* <CSVExport data={rows} filename={'sticky-header-table.csv'} header={header} /> */}
                        {/* <SecondaryAction link="https://next.material-ui.com/components/tables/" /> */}
                        <FormControl sx={{ minWidth: 200, ml: 3 }}>
                            <InputLabel id="demo-simple-select-label">Budget Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={app.selectedBudgetType}
                                label="Budget Type"
                                onChange={handleProjectTypeChange}
                            >
                                {projectTypes?.map((item: ProjectTypeDetails) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {checkPermission('add_budget') && (
                            <Button variant="contained" component={RouterLink} to="/add-budget">
                                {app.selectedBudgetType === 1 ? 'Add Project Budget' : 'Add BAU Run'}
                            </Button>
                        )}
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
                            {checkFilter(projectList)
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: KeyedObject, index: number) => (
                                    <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            const value =
                                                column.fieldType === 'info'
                                                    ? row[column.id]
                                                    : row?.inputFields?.find((item: any) => item.id === column.id)?.value;
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value ? value : '-'}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell align="center">
                                            <Stack direction="row" justifyContent="center" alignItems="center">
                                                <IconButton color="primary" size="large" onClick={() => getProjectDetails(row.id)}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                                {checkPermission('update_budget') && (
                                                    <IconButton color="primary" size="large" onClick={() => handleEdit(row.id)}>
                                                        <EditOutlinedIcon />
                                                    </IconButton>
                                                )}
                                                {checkPermission('delete_budget') && (
                                                    <IconButton color="inherit" size="large" onClick={() => handleDeleteOpen(row.id)}>
                                                        <DeleteOutlineOutlinedIcon />
                                                    </IconButton>
                                                )}
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
                    count={projectList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </MainCard>
            <ProjectDelete show={showDelete} handleDelete={handleDelete} handleClose={() => setShowDelete(false)} />
        </React.Fragment>
    );
};

export default ProjectList;
