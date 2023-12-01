import {
    Box,
    Button,
    Paper,
    Popover,
    List,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Chip,
    FormControl,
    InputLabel,
    Select,
    TextField,
    Autocomplete
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useState } from 'react';
import CheckboxListPopupContainer from './CheckboxListPopoverContainer';
import { UseApp } from 'hooks/useApp';
import { ProjectInputFieldDetails } from 'types/input-field';
import ClearIcon from '@mui/icons-material/Clear';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// Define the props interface for ReportFilters
interface ReportFiltersProps {
    projectType: number;
    appliedFilters: any;
    setAppliedFilters: any;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ReportFilters: React.FC<ReportFiltersProps> = ({ projectType, appliedFilters, setAppliedFilters }) => {
    const { app } = UseApp();
    const [anchorEls, setAnchorEls] = useState<any>({});
    const [filterList, setFilterList] = useState<ProjectInputFieldDetails[]>([]);
    const [dateFiltersList, setDateFilters] = useState<any>([]);

    // Function to update anchor elements for popovers
    function updateAnchorEls(anchorType: string | number, anchorEl: HTMLButtonElement | null) {
        setAnchorEls({ name: anchorType, element: anchorEl });
    }

    // Function to get the value of a filter by ID
    const getFilterValue = (id: any, projectFilter?: boolean | undefined) => {
        let result;
        if (!projectFilter) {
            if (appliedFilters?.inputFields?.filter((item: ProjectInputFieldDetails) => item.id === id)?.length) {
                result = appliedFilters?.inputFields?.filter((item: ProjectInputFieldDetails) => item.id === id)[0].value;
            }
        } else {
            result = appliedFilters[id];
        }
        return result;
    };

    // Function to handle filter input change
    const handleFilterInputChange = (value: any, id: any, projectFilter?: boolean | undefined) => {
        setAppliedFilters((prevData: any) => {
            let newData = { ...prevData };
            const inputData = [...prevData.inputFields];
            let startDate: Date | string = newData.startDate;
            let endDate: Date | string = newData.endDate;
            let year: string | number = newData.year;
            let name: string[] = newData.name;
            if (!projectFilter) {
                const existingItem = inputData?.find((item: any) => item.id === id);
                if (existingItem) {
                    existingItem.value = value;
                } else {
                    const newItem = { id: id, value: value };
                    inputData.push(newItem);
                }
            } else {
                if (id === 'year') {
                    startDate = value ? new Date(value, 0, 1) : '';
                    endDate = value ? new Date(value, 11, 31) : '';
                    year = value;
                }
                if (id === 'name') {
                    name = value;
                }
            }
            newData = { ...prevData, name: name, inputFields: inputData, startDate: startDate, endDate: endDate, year: year };
            return newData;
        });
    };

    // Function to handle selected filter menus change
    const onSelectedFilterMenusChange = (reportFilter: any, checked: boolean) => {};

    useEffect(() => {
        let list: any = [];
        if (projectType === 1) {
            list.push({ id: 'name', name: ' Project Name', type: 'Search', projectFilter: true, metadata: { options: app.projectList } });
            app.inputFieldList?.forEach((item: any) => {
                if (item.name === 'Project Status') {
                    list.push(item);
                }
            });
        } else {
            list.push({ id: 'name', name: ' Project Name', type: 'Search', projectFilter: true });
            app.inputFieldList?.forEach((item: any) => {
                if (
                    item.name === 'MU3' ||
                    item.name === 'MU4' ||
                    item.name === 'Director' ||
                    item.name === 'Type of Spend' ||
                    item.name === 'Vendor Names'
                ) {
                    list.push(item);
                }
            });
        }
        list = list.concat(dateFiltersList);
        setFilterList(list);
    }, [app.inputFieldList, projectType, dateFiltersList, app.projectList]);

    useEffect(() => {
        let dateFilters = [];
        const previousYearsList = [];
        const nextYearList = [];
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        for (let index = 1; index <= 2; index++) {
            previousYearsList.push(currentYear - index);
        }
        for (let index = 1; index <= 3; index++) {
            nextYearList.push(currentYear + index);
        }
        const yearsList = [...previousYearsList, currentYear, ...nextYearList];
        const quarterList = ['First Quarter', 'Second Quarter', 'Third Quarter', 'Fourth Quarter'];
        const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', ' Oct', 'Nov', 'Dec'];
        dateFilters.push(
            { id: 'year', name: 'Year', type: 'Dropdown', metadata: { options: yearsList }, projectFilter: true },
            { id: 'quarter', name: 'Quarter', type: 'Dropdown', metadata: { options: quarterList }, projectFilter: true },
            { id: 'month', name: 'Month', type: 'Dropdown', metadata: { options: monthList }, projectFilter: true }
        );
        setDateFilters(dateFilters);
    }, []);

    return (
        <Paper
            sx={{
                mt: { xs: '1rem', sm: '1.55rem' },
                mb: { xs: '1rem', sm: '1.55rem' },
                borderRadius: 0,
                background: 'transparent'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: { md: 'center', xs: 'initial' },
                    flexDirection: { md: 'row', xs: 'column' },
                    gap: { md: 2, xs: 2 }
                }}
            >
                {/* List of filters*/}
                <Box
                    display="flex"
                    p={1.5}
                    sx={{
                        borderRadius: 4,
                        rowGap: 1.5,
                        border: '1.084px solid',
                        borderColor: 'grey.200',
                        boxShadow: '0px 3px 20px 0px rgba(0, 0, 0, 0.02)',
                        flexWrap: { md: 'wrap', xs: 'wrap' },
                        backgroundColor: 'background.paper'
                    }}
                >
                    <Button
                        name="filter"
                        onClick={(e) => updateAnchorEls('Filter', e.currentTarget)}
                        sx={{
                            letterSpacing: '1px',
                            color: 'grey.900',
                            minWidth: 'auto',
                            px: { lg: 2.5, sm: 1 },
                            gap: { xl: 1.25, lg: 0.5, xs: 0.5 },
                            '&::after': {
                                position: 'absolute',
                                content: { sm: '""', xs: 'initial' },
                                right: 0,
                                width: 1.25,
                                height: '100%',
                                backgroundColor: 'grey.200'
                            }
                        }}
                    >
                        Filters
                        <ChevronRightIcon
                            sx={{
                                fontSize: '.8rem',
                                color: 'grey.900'
                            }}
                        />
                    </Button>
                    {filterList?.map((item: any) => {
                        return (
                            <Button
                                key={item.id}
                                name="filter"
                                onClick={(e) => updateAnchorEls(item.id, e.currentTarget)}
                                sx={{
                                    letterSpacing: '1px',
                                    color: 'grey.900',
                                    minWidth: 'auto',
                                    px: { lg: 2.5, sm: 1 },
                                    gap: { xl: 1.25, lg: 0.5, xs: 0.5 },
                                    '&::after': {
                                        position: 'absolute',
                                        content: { sm: '""', xs: 'initial' },
                                        right: 0,
                                        width: 1.25,
                                        height: '100%',
                                        backgroundColor: 'grey.200'
                                    }
                                }}
                            >
                                {item.name}
                                <ChevronRightIcon
                                    sx={{
                                        fontSize: '.8rem',
                                        color: 'grey.900'
                                    }}
                                />
                                {(typeof getFilterValue(item.id, item.projectFilter) !== 'object' &&
                                    getFilterValue(item.id, item.projectFilter)) ||
                                (typeof getFilterValue(item.id, item.projectFilter) === 'object' &&
                                    getFilterValue(item.id, item.projectFilter)?.length) ? (
                                    <Chip
                                        size="small"
                                        sx={{
                                            mt: -2,
                                            ml: 0.5,
                                            height: '20px',
                                            width: '20px',
                                            position: 'absolute',
                                            right: '5px',
                                            top: '11px',
                                            '& span': {
                                                padding: '0',
                                                lineHeight: '100%'
                                            }
                                        }}
                                        label={'*'}
                                        color="secondary"
                                    />
                                ) : (
                                    ''
                                )}
                            </Button>
                        );
                    })}
                </Box>

                {/* End of list of filters*/}
                <Box gap={2} display={'flex'}>
                    {appliedFilters?.inputFields?.length || appliedFilters?.name?.length || appliedFilters?.year ? (
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{
                                border: '.658px solid primary.main',
                                borderRadius: '12px',
                                py: { xs: '5px', sm: 1.25 },
                                whiteSpace: 'nowrap'
                            }}
                            onClick={() =>
                                setAppliedFilters({
                                    inputFields: [],
                                    startDate: '',
                                    endDate: '',
                                    name: []
                                })
                            }
                            endIcon={<ClearIcon />}
                        >
                            Clear All Filters
                        </Button>
                    ) : (
                        ''
                    )}
                </Box>

                {/* List of filters (menu items)*/}
                <Popover
                    id={anchorEls.name === 'Filter' ? 'Filter' : undefined}
                    open={anchorEls.name === 'Filter'}
                    anchorEl={anchorEls.element || null}
                    onClose={() => updateAnchorEls('', null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                >
                    <Box sx={{ maxHeight: 300 }}>
                        <CheckboxListPopupContainer sx={{ p: 1 }}>
                            <>
                                {app?.inputFieldList
                                    ?.filter((item: any) => item.isSearchable)
                                    ?.map((item: any) => {
                                        return (
                                            <List key={item.id}>
                                                <MenuItem>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={true}
                                                                onChange={(e, checked) => onSelectedFilterMenusChange(item, checked)}
                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                            />
                                                        }
                                                        label={item.name}
                                                    />
                                                </MenuItem>
                                            </List>
                                        );
                                    })}
                            </>
                        </CheckboxListPopupContainer>
                    </Box>
                </Popover>
                {/* End of list of filters (menu items)*/}

                {filterList?.map((item: any) => {
                    return (
                        <Popover
                            key={item.id}
                            id={anchorEls.name === item.id ? item.id : undefined}
                            open={anchorEls.name === item.id}
                            anchorEl={anchorEls.element || null}
                            onClose={() => updateAnchorEls('', null)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                        >
                            <CheckboxListPopupContainer sx={{ p: 1 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    {item.type === 'Search' ? (
                                        <Autocomplete
                                            multiple
                                            limitTags={2}
                                            value={
                                                getFilterValue(item.id, item?.projectFilter)
                                                    ? getFilterValue(item.id, item?.projectFilter)
                                                    : []
                                            }
                                            id="checkboxes-tags-demo"
                                            onChange={(event, newValue) => {
                                                handleFilterInputChange(newValue, item.id, item?.projectFilter);
                                            }}
                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                            options={item?.metadata?.options ? item?.metadata?.options : []}
                                            disableCloseOnSelect
                                            getOptionLabel={(option: any) => option?.name}
                                            renderOption={(props, option, { selected }) => (
                                                <li {...props}>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                    {option?.name}
                                                </li>
                                            )}
                                            renderInput={(params) => <TextField {...params} label={item.name} />}
                                        />
                                    ) : item.type === 'Dropdown' ? (
                                        <FormControl sx={{ minWidth: 200, ml: 3 }}>
                                            <InputLabel id="demo-simple-select-label">Select</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={getFilterValue(item.id, item?.projectFilter)}
                                                label="Select"
                                                onChange={(e) => handleFilterInputChange(e.target.value, item.id, item?.projectFilter)}
                                            >
                                                <MenuItem value={''}>Clear</MenuItem>
                                                {item?.metadata?.options?.map((option: any) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    ) : item.type === 'Date' ? (
                                        <DatePicker
                                            label={item.name}
                                            value={
                                                getFilterValue(item.id, item?.projectFilter)
                                                    ? getFilterValue(item.id, item?.projectFilter)
                                                    : new Date()
                                            }
                                            onChange={(val) => handleFilterInputChange(val, item.id, item?.projectFilter)}
                                            renderInput={(params) => <TextField fullWidth {...params} />}
                                            mask="__-__-____"
                                        />
                                    ) : (
                                        ''
                                    )}
                                </LocalizationProvider>
                            </CheckboxListPopupContainer>
                        </Popover>
                    );
                })}
            </Box>
        </Paper>
    );
};

export default ReportFilters;
