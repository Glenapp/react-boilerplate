/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CardContent, CardHeader, FormControl, InputAdornment, MenuItem, OutlinedInput, Select } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { IconSearch } from '@tabler/icons';
import { debounce } from 'lodash';
import AddIcon from '@mui/icons-material/Add';
import CustomCard from './CustomCard';

type TitleCarsProps = {
    title: string;
    filters?: any; // will change to BaseFilter after integration of clients and teams
    onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onSelectChange?: (event: any) => void;
    onSearchChange?: (event: any) => void;
    placeholder?: string;
};
const TitleCard = (props: TitleCarsProps) => {
    const { title, filters, onButtonClick, onSelectChange, onSearchChange, placeholder } = props;

    const debounceOnSearchChange = onSearchChange ? debounce(onSearchChange, 500) : () => {};

    return (
        <CustomCard sx={{ mb: '1.55rem' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
                id="titlecarddiv"
            >
                <CardHeader title={title} className="titlecardinndiv" />
                <CardContent className="titlecardinndiv">
                    <Stack direction="row" spacing={2} className="titlecrddiv" alignItems="center">
                        {!!onSelectChange && (
                            <FormControl className="titleinputs">
                                <Select name="filters-type" sx={{ p: 0 }} value={filters?.type} onChange={onSelectChange} size="small">
                                    <MenuItem value={'active'}>Show Active</MenuItem>
                                    <MenuItem value={'Archived'}>Show Archived</MenuItem>
                                    <MenuItem value={'All'}>Show All</MenuItem>
                                </Select>
                            </FormControl>
                        )}

                        {!!filters && !!onSearchChange && (
                            <FormControl className="titleinputs">
                                <OutlinedInput
                                    id="filters-name-search"
                                    type="text"
                                    name="filters-name"
                                    onChange={debounceOnSearchChange}
                                    inputProps={{}}
                                    placeholder={placeholder || 'Search by name'}
                                    autoComplete="off"
                                    size="small"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconSearch stroke={1.5} size="16px" />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        )}

                        {!!onButtonClick && (
                            <Button
                                color="secondary"
                                variant="contained"
                                sx={{
                                    border: '1.084px solid',
                                    borderColor: 'grey.200',
                                    boxShadow: '0px 1.97516px 13.16774px 0px rgba(0, 0, 0, 0.02)',
                                    borderRadius: '12px',
                                    alignSelf: 'center',
                                    '& .MuiSvgIcon-root': {
                                        fontSize: '22px'
                                    }
                                }}
                                onClick={onButtonClick}
                                id="titlecardbtndiv"
                                startIcon={<AddIcon />}
                            >
                                Add New
                            </Button>
                        )}
                    </Stack>
                </CardContent>
            </Box>
        </CustomCard>
    );
};

export default TitleCard;
