import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Box, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectSection from './ProjectSection';
import { sections } from './Sectiondata';
import { UseApp } from 'hooks/useApp';
import ProjectService from 'services/project.service';
import { ProjectInputFieldDetails } from 'types/input-field';
import { CostsState } from './interfaces/interfaces';

interface FormTemplateProps {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    form: any; // Adjust the type based on your actual form type
    setForm: React.Dispatch<React.SetStateAction<any>>;
    inputFieldsData: any[]; // Adjust the type based on your actual inputFieldsData type
    selectedProjectType: number; // Adjust the type based on your actual selectedProjectType type
}

const FormTemplate: React.FC<FormTemplateProps> = ({ title, setTitle, form, setForm, inputFieldsData, selectedProjectType }) => {
    const { id } = useParams();
    const { setApp } = UseApp();
    const navigate = useNavigate();
    const [autoFocus, setAutoFocus] = useState<string>('');
    const [submit, setSubmit] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmit(true);
        let inputFields: ProjectInputFieldDetails[] = [];
        Object.keys(form)?.forEach((key: string) => {
            inputFields.push({ id: parseInt(key), value: form[key] });
        });
        const result = inputFieldsData?.filter((item: any) => item.required && !form[item.key]);
        if (!result?.length) {
            const obj: any = {
                name: title,
                typeId: selectedProjectType,
                inputFields: inputFields
            };
            if (id) {
                obj.id = parseInt(id);
                ProjectService.updateProjectAsync(obj).then((res: any) => {
                    navigate('/budgets');
                    setApp((prev) => ({
                        ...prev,
                        popupMessage: {
                            message: 'Budget Updated Successfully!',
                            type: 'success',
                            show: true
                        }
                    }));
                });
            } else {
                ProjectService.createProjectAsync(obj)
                    .then((res: any) => {
                        navigate('/budgets');
                        setApp((prev) => ({
                            ...prev,
                            popupMessage: {
                                message: 'Budget Added Successfully',
                                type: 'success',
                                show: true
                            }
                        }));
                    })
                    .catch((err: any) => console.log(err));
            }
        } else {
            setAutoFocus(result[0].key);
        }
    };

    return (
        <form noValidate onSubmit={handleSubmit}>
            <FormControl fullWidth error={submit && !title}>
                <InputLabel>Title</InputLabel>
                <OutlinedInput
                    type={'text'}
                    value={title}
                    name={'name'}
                    onChange={(e) => setTitle(e.target.value)}
                    label={'Title'}
                    required={true}
                />
                {submit && !title && <FormHelperText error>{title} is required</FormHelperText>}
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                {sections.map((section, index) => (
                    <ProjectSection
                        key={index}
                        color={section.color}
                        heading={section.heading}
                        data={inputFieldsData}
                        filter={section.filter}
                        form={form}
                        setForm={setForm}
                        autoFocus={autoFocus}
                        submit={submit}
                        setAutoFocus={setAutoFocus}
                    />
                ))}

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="inherit" sx={{ width: 300, mr: 2 }} onClick={() => navigate('/budgets')}>
                        Cancel
                    </Button>
                    <AnimateButton>
                        <Button
                            disableElevation
                            disabled={false}
                            sx={{ width: 300 }}
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            {id ? 'Update' : 'Submit'}
                        </Button>
                    </AnimateButton>
                </Box>
            </LocalizationProvider>
        </form>
    );
};

export default FormTemplate;
