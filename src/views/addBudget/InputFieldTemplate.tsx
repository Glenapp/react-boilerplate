import React, { useEffect, useMemo, useState } from 'react';
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
    Select,
    MenuItem,
    Grid,
    TextField,
    Autocomplete
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import UserService from 'services/user.service';

interface InputFieldProps {
    field: any;
    form: any;
    setForm: any;
    handleChange: any;
    submit: any;
    handleDateChange: any;
}

const InputFieldTemplate: React.FC<InputFieldProps> = ({ field, form, setForm, handleChange, submit, handleDateChange }) => {
    const [autoFocus, setAutoFocus] = useState<string>('');
    const [searchedUsers, setSearchedUsers] = useState<any>([]);
    const [searchedValues, setSearchedValues] = useState<any>({});
    const options = useMemo(() => searchedUsers.map((option: any) => option), [searchedUsers]);

    const handleAutocompleteChange = (selectedValue: any, currentField: any) => {
        setSearchedValues((prev: any) => ({ ...prev, [currentField.id]: selectedValue?.email ? selectedValue?.email : '' }));
        setForm({ ...form, [currentField.id]: selectedValue?.id ? selectedValue?.id : '' });
        setAutoFocus(currentField.id);
    };

    const handleSearch = (e: any, field1: any) => {
        setAutoFocus((prevAutoFocus: any) => {
            return prevAutoFocus !== null ? prevAutoFocus : field1.id;
        });
        const param = {
            name: e.target.value,
            roleId: field1?.metadata
        };
        UserService.getUsersAsync(param).then((res) => {
            setSearchedUsers(res);
        });
    };

    return (
        <Grid item lg={6} md={6} xs={12}>
            {field.type === 'Text' || field.type === 'Number' ? (
                <FormControl fullWidth error={submit && field.isRequired && !form[field.id]}>
                    <InputLabel>{field.name}</InputLabel>
                    <OutlinedInput
                        autoFocus={autoFocus == field.id ? true : false}
                        type={field.type}
                        value={form[field.id]}
                        name={field?.id?.toString()}
                        onChange={handleChange}
                        label={field.name}
                        disabled={field.disabled}
                        required={field.isRequired}
                        inputProps={{
                            min: 0 // Disallow negative numbers
                        }}
                        onKeyDown={(e) => {
                            // Prevent typing the minus sign (-) or hyphen key (–)
                            if ((e.key === '-' || e.key === '–') && field.type === 'Number') {
                                e.preventDefault();
                            }
                        }}
                    />
                    <FormHelperText>{field.description}</FormHelperText>
                    {submit && field.isRequired && !form[field.id] && <FormHelperText error>{field.name} is required</FormHelperText>}
                </FormControl>
            ) : field.type === 'radio' ? (
                <FormControl>
                    <FormLabel>{field.label}</FormLabel>
                    <RadioGroup
                        row
                        aria-label="color"
                        value={form[field.key] ? form[field.key] : ''}
                        onChange={handleChange}
                        name={field?.key?.toString()}
                    >
                        {field?.options?.map((option: string) => (
                            <FormControlLabel
                                key={option}
                                value={option}
                                control={
                                    <Radio
                                        required={field.isRequired}
                                        sx={{
                                            color: 'primary.main',
                                            '&.Mui-checked': { color: 'primary.main' }
                                        }}
                                        autoFocus={autoFocus === field.key ? true : false}
                                    />
                                }
                                label={option}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            ) : field.type === 'Dropdown' ? (
                <>
                    <FormControl fullWidth error={submit && field.isRequired && !form[field.id]}>
                        <InputLabel id={field.id}>{field.name}</InputLabel>
                        <Select
                            fullWidth
                            name={field?.id?.toString()}
                            value={form[field.id] ? form[field.id] : ''}
                            onChange={handleChange}
                            label={field.name}
                            disabled={field.disabled}
                            required={field.isRequired}
                            autoFocus={autoFocus === field.id ? true : false}
                        >
                            <MenuItem value="">
                                <em>Select</em>
                            </MenuItem>
                            {field?.metadata?.options?.map((option: string) => (
                                <MenuItem value={option} key={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{field.description}</FormHelperText>
                        {submit && field.isRequired && !form[field.id] && <FormHelperText error>{field.name} is required</FormHelperText>}
                    </FormControl>
                </>
            ) : field.type === 'Date' ? (
                <React.Fragment>
                    <DatePicker
                        label={field.name}
                        value={form[field.id] ? form[field.id] : new Date()}
                        onChange={(val) => handleDateChange(val, field.id)}
                        renderInput={(params) => <TextField fullWidth {...params} placeholder={'dd/mm/yyyy'} />}
                    />
                    <FormHelperText>{field.description}</FormHelperText>
                </React.Fragment>
            ) : field.type === 'Search' ? (
                <React.Fragment>
                    <Autocomplete
                        key={field.id}
                        options={options}
                        getOptionLabel={(option) => (option?.email ? option?.email : '')}
                        id={field.id.toString()}
                        value={searchedValues[field.id]}
                        onChange={(e, selectedValue) => handleAutocompleteChange(selectedValue, field)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={field.name}
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search'
                                }}
                                name={field.id.toString()}
                                autoFocus={field.id === autoFocus}
                                onChange={(e) => handleSearch(e, field)}
                            />
                        )}
                    />
                </React.Fragment>
            ) : (
                ''
            )}
        </Grid>
    );
};

export default InputFieldTemplate;
