import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { Stack } from '@mui/system';

const UpdateRolesDialog = ({
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
            status: 'active'
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().trim().required(` Name is required`)
        }),
        onSubmit: (formData) => {
            onSubmit({
                ...formData
            });
            // alert(JSON.stringify(formData));
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
                        <DialogTitle id="form-dialog-title">Edit Roles</DialogTitle>
                        <Divider />
                        <DialogContent sx={{ p: 3 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        label={`Name`}
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
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Status</FormLabel>
                                        <RadioGroup row aria-label="status" name="status" value={values.status} onChange={handleChange}>
                                            <FormControlLabel value="active" control={<Radio />} label="Active" />
                                            <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                                        </RadioGroup>
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

export default UpdateRolesDialog;
