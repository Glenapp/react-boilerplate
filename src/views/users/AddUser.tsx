import {
    DialogTitle,
    DialogContent,
    Dialog,
    FormControl,
    InputLabel,
    OutlinedInput,
    IconButton,
    Select,
    MenuItem,
    Button,
    SelectChangeEvent,
    Autocomplete,
    TextField
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, FormEvent, ChangeEvent, useMemo } from 'react';
import { UseApp } from 'hooks/useApp';
import UserService from 'services/user.service';

interface AddMemberProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    getAllMembers: any;
}

interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'dropdown';
    required: boolean;
    options?: { id: number; label: string }[];
}

interface MemberList {
    name: string;
    id: number;
}

const AddUser: React.FC<AddMemberProps> = ({ open, setOpen, getAllMembers }) => {
    const [form, setForm] = useState<any>({
        firstName: '',
        lastName: '',
        email: '',
        roleId: '',
        parentId: ''
    });
    const formFields: FormField[] = [
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        {
            name: 'roleId',
            label: 'Role',
            type: 'dropdown',
            required: true,
            options: [
                { id: 1, label: 'VP' },
                { id: 2, label: 'Director' },
                { id: 3, label: 'Manager' }
            ]
        }
    ];
    const [searchedUsers, setSearchedUsers] = useState<any[]>([]);
    const [searchedValue, setSearchedValue] = useState<any>({});
    const options = useMemo(() => searchedUsers.map((option: any) => option), [searchedUsers]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = e.target;
        setForm((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        UserService.createUserAsync(form).then((res) => {
            setOpen(false);
            getAllMembers();
        });
    };

    const handleAutocompleteChange = (selectedValue: any) => {
        setSearchedValue(selectedValue);
        setForm({ ...form, parentId: selectedValue?.id ? selectedValue?.id : '' });
    };

    const handleParentSearh = (e: any) => {
        const param = {
            name: e.target.value,
            roleId: form?.roleId === 2 ? 1 : 2
        };
        UserService.getUsersAsync(param).then((res: any) => {
            setSearchedUsers(res);
        });
    };

    return (
        <Dialog open={open} maxWidth={'sm'} fullWidth onClose={() => setOpen(false)}>
            <DialogTitle id="alert-dialog-title">Add User</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setOpen(false)}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500]
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    {formFields?.map((item: any) => {
                        return item.type === 'text' || item.type === 'email' ? (
                            <FormControl fullWidth sx={{ mb: 2 }} key={item.name}>
                                <InputLabel>{item.label}</InputLabel>
                                <OutlinedInput
                                    type={item.type}
                                    value={form[item.name] || ''}
                                    name={item.name}
                                    onChange={handleChange}
                                    label={item.label}
                                    required={item.required}
                                />
                            </FormControl>
                        ) : item.type === 'dropdown' ? (
                            <FormControl fullWidth key={item.name} sx={{ mb: 2 }}>
                                <InputLabel>{item.label}</InputLabel>
                                <Select
                                    fullWidth
                                    name={item.name}
                                    value={form[item.name] || ''}
                                    label={item.label}
                                    onChange={handleChange}
                                    required={item.required}
                                >
                                    <MenuItem value="">
                                        <em>Select</em>
                                    </MenuItem>
                                    {item?.options?.map((option: any) => (
                                        <MenuItem value={option.id} key={option.id}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ) : (
                            ''
                        );
                    })}
                    {form?.roleId === 2 || form?.roleId === 3 ? (
                        <Autocomplete
                            options={options}
                            getOptionLabel={(option) => (option?.email ? option?.email : '')}
                            id={'parent'}
                            value={searchedValue}
                            onChange={(e, selectedValue) => handleAutocompleteChange(selectedValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={form?.roleId === 2 ? 'Add VP' : form?.roleId === 3 ? 'Add Director' : ''}
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search'
                                    }}
                                    name={'parentId'}
                                    onChange={(e) => handleParentSearh(e)}
                                    required
                                />
                            )}
                        />
                    ) : (
                        ''
                    )}

                    <AnimateButton>
                        <Button sx={{ mt: 2 }} disabled={false} fullWidth size="large" type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </AnimateButton>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddUser;
