import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Grid,
    TextField
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { Stack } from '@mui/system';

const UpdateUserDialog = ({
    open,
    handleClose,
    onSubmit,
    details
}: {
    open: boolean;
    handleClose: VoidFunction;
    onSubmit: (data: any) => void;
    details: any;
}) => {
    const { errors, handleBlur, handleChange, handleSubmit, touched, values, resetForm, isValid } = useFormik({
        initialValues: {
            name: '',
            email: '',
            selectedRole: '', // new field for assigned role
            selectedSite: '' // new field for assigned site
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().trim().required('Name is required'),
            email: Yup.string().trim().email('Invalid email format').required('Email is required')
        }),
        onSubmit: (formData) => {
            onSubmit({
                ...formData
            });
        }
    });

    useEffect(() => {
        if (open) {
            // resetForm({
            //     values: {
            // name: '',
            // description: ''
            //     }
            // });  for sett the onload value
        }
        // eslint-disable-next-line
    }, [open]);

    return (
        <Dialog open={open} onClose={handleClose} fullWidth aria-labelledby="form-dialog-title" sx={{ '& .MuiDialog-paper': { p: 0 } }}>
            <form noValidate onSubmit={handleSubmit}>
                {open && (
                    <>
                        <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
                        <Divider />
                        <DialogContent sx={{ p: 3 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Name"
                                        id="name"
                                        type="text"
                                        value={values.name}
                                        name="name"
                                        autoFocus
                                        autoComplete="off"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.name && errors.name)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Email"
                                        id="email"
                                        type="text"
                                        value={values.email}
                                        name="email"
                                        autoComplete="off"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.email && errors.email)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel id="role-label">Assigned Role</InputLabel>
                                        <Select
                                            labelId="role-label"
                                            id="selectedRole"
                                            value={values.selectedRole}
                                            name="selectedRole"
                                            label="Assigned Role"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={Boolean(touched.selectedRole && errors.selectedRole)}
                                        >
                                            <MenuItem value="">Select Role</MenuItem>
                                            {/* Add your role options dynamically here */}
                                            <MenuItem value="role1">Role 1</MenuItem>
                                            <MenuItem value="role2">Role 2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel id="site-label">Assigned Site</InputLabel>
                                        <Select
                                            labelId="site-label"
                                            id="selectedSite"
                                            name="selectedSite"
                                            value={values.selectedSite}
                                            label="Assigned Site"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={Boolean(touched.selectedSite && errors.selectedSite)}
                                        >
                                            <MenuItem value="">Select Site</MenuItem>
                                            {/* Add your site options dynamically here */}
                                            <MenuItem value="site1">Site 1</MenuItem>
                                            <MenuItem value="site2">Site 2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ p: 3, pt: 0 }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <Button type="button" variant="outlined" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" variant="contained" color="secondary" disabled={!isValid}>
                                            Update
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </>
                )}
            </form>
        </Dialog>
    );
};

export default UpdateUserDialog;
