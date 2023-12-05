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
    Stack,
    Grid,
    TextField
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';

const UpdateTrainingDialog = ({
    open,
    handleClose,
    onSubmit,
    details
}: {
    open: boolean;
    handleClose: VoidFunction;
    onSubmit: (sitedetails: any) => void;
    details: any;
}) => {
    const { errors, handleBlur, handleChange, handleSubmit, touched, values, resetForm, isValid } = useFormik({
        initialValues: {
            name: '',
            description: '',
            link: '',
            selectedRole: '' // new field for assigned role
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().trim().required('Name is required'),
            description: Yup.string().trim().required('Description is required'),
            link: Yup.string().trim().url('Invalid URL format').required('Link is required'),
            selectedRole: Yup.string().trim().required('Assigned Role is required')
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
                        <DialogTitle id="form-dialog-title">Add Site</DialogTitle>
                        <Divider />
                        <DialogContent sx={{ p: 3 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Site Name"
                                        id="Site-name"
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
                                        multiline
                                        rows={4}
                                        label="Description"
                                        id="description"
                                        value={values.description}
                                        name="description"
                                        inputProps={{ maxLength: '250' }}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.description && errors.description)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Link"
                                        id="link"
                                        type="text"
                                        value={values.link}
                                        name="link"
                                        autoComplete="off"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.link && errors.link)}
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
                                            Save
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

export default UpdateTrainingDialog;
