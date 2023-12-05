import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Stack } from '@mui/system';

const AddQuestionDialog = ({
    open,
    handleClose,
    onSubmit
}: {
    open: boolean;
    handleClose: VoidFunction;
    onSubmit: (data: any) => void;
}) => {
    const { errors, handleBlur, handleChange, handleSubmit, touched, values, resetForm, isValid } = useFormik({
        initialValues: {
            selectedcategories: '',
            title: '',
            answers: [{ text: '', correct: false }]
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().trim().required('Name is required'),
            answers: Yup.array().of(
                Yup.object().shape({
                    text: Yup.string().trim().required('Answer text is required'),
                    correct: Yup.boolean().required('Specify if the answer is correct or not')
                })
            )
        }),
        onSubmit: (formData) => {
            onSubmit({
                ...formData
            });
        }
    });

    type Answer = {
        text: string;
        correct: boolean;
    };

    const handleAnswerChange = (index: number, field: keyof Answer) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAnswers = values.answers.map((answer, i) => (i === index ? { ...answer, [field]: event.target.value } : answer));
        handleChange({ target: { name: 'answers', value: newAnswers } });
    };

    const handleCorrectChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAnswers = [...values.answers];
        newAnswers[index].correct = event.target.value === 'true';
        handleChange({ target: { name: 'answers', value: newAnswers } });
    };

    const handleAddAnswer = () => {
        const newAnswers = [...values.answers, { text: '', correct: false }];
        handleChange({ target: { name: 'answers', value: newAnswers } });
    };

    const handleDeleteAnswer = (index: number) => () => {
        const newAnswers = values.answers.filter((_, i) => i !== index);
        handleChange({ target: { name: 'answers', value: newAnswers } });
    };

    useEffect(() => {
        if (!open) {
            resetForm();
        }
        // eslint-disable-next-line
    }, [open]);

    return (
        <Dialog open={open} onClose={handleClose} fullWidth aria-labelledby="form-dialog-title" sx={{ '& .MuiDialog-paper': { p: 0 } }}>
            <form noValidate onSubmit={handleSubmit}>
                {open && (
                    <>
                        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
                        <Divider />
                        <DialogContent sx={{ p: 3 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel id="role-label">Assigned Role</InputLabel>
                                        <Select
                                            labelId="role-label"
                                            id="selectedcategories"
                                            value={values.selectedcategories}
                                            name="selectedcategories"
                                            label="Assigned Role"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={Boolean(touched.selectedcategories && errors.selectedcategories)}
                                        >
                                            <MenuItem value="">Select category</MenuItem>
                                            {/* Add your role options dynamically here */}
                                            <MenuItem value="category1">category 1</MenuItem>
                                            <MenuItem value="category2">category 2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Name"
                                        id="name"
                                        type="text"
                                        value={values.title}
                                        name="title"
                                        autoFocus
                                        autoComplete="off"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.title && errors.title)}
                                    />
                                </Grid>
                                {values.answers.map((answer, index) => (
                                    <React.Fragment key={index}>
                                        <Grid item xs={7}>
                                            <TextField
                                                fullWidth
                                                required
                                                label={`Answer ${index + 1}`}
                                                id={`answer-${index}`}
                                                type="text"
                                                value={answer.text}
                                                name={`answers[${index}].text`}
                                                onBlur={handleBlur}
                                                onChange={handleAnswerChange(index, 'text')}
                                                error={Boolean(
                                                    touched.answers &&
                                                        errors.answers &&
                                                        (errors.answers as any[]).length > 0 &&
                                                        (errors.answers as any[])[index]?.text
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    aria-label={`Correct ${index + 1}`}
                                                    name={`answers[${index}].correct`}
                                                    value={answer.correct.toString()}
                                                    onChange={handleCorrectChange(index)}
                                                >
                                                    <FormControlLabel value="true" control={<Radio />} label="Correct" />
                                                    <FormControlLabel value="false" control={<Radio />} label="Incorrect" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Button variant="outlined" color="secondary" onClick={handleDeleteAnswer(index)}>
                                                Delete
                                            </Button>
                                        </Grid>
                                    </React.Fragment>
                                ))}
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" onClick={handleAddAnswer}>
                                        Add Answer
                                    </Button>
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

export default AddQuestionDialog;
