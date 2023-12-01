import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';
import FormTemplate from './FormTemplate';
import ProjectTypeService from 'services/project-type.service';
import { ProjectTypeDetails } from 'types/project-type';
import { useParams } from 'react-router-dom';
import ProjectService from 'services/project.service';
import { ProjectDetails } from 'types/project';
import { ProjectInputFieldDetails } from 'types/input-field';
import { UseApp } from 'hooks/useApp';

interface FormInput {
    [key: string]: any;
}

const AddBudget: React.FC = () => {
    const { app, setApp } = UseApp();
    const [projectTypes, setProjectTypes] = useState<ProjectTypeDetails[]>([]);
    const [formFields, setFormFields] = useState<ProjectInputFieldDetails[]>([]);
    const [form, setForm] = useState<FormInput>({});
    const [title, setTitle] = useState<string>('');
    const { id } = useParams();

    // Handle project type change
    const handleProjectType = (type: number | string) => {
        if (type && typeof type === 'number') {
            setApp((prev: any) => ({
                ...prev,
                selectedBudgetType: type
            }));
        }
    };

    // Fetch project types
    useEffect(() => {
        const fetchProjectTypes = () => {
            ProjectTypeService.getProjectTypesAsync()
                .then((res: any) => {
                    setProjectTypes(res);
                })
                .catch((err) => console.log(err));
        };
        fetchProjectTypes();
    }, []);

    // Fetch project details when an ID is provided in the URL
    useEffect(() => {
        if (id) {
            ProjectService.getProjectAsync(parseInt(id))
                .then((res: ProjectDetails) => {
                    if (res?.typeId) {
                        setApp((prev: any) => ({
                            ...prev,
                            selectedBudgetType: res?.typeId
                        }));
                    }
                    if (res?.name) setTitle(res?.name);
                    if (res?.inputFields) {
                        let formInputs: any = {};
                        res?.inputFields?.forEach((item: ProjectInputFieldDetails) => {
                            formInputs[item.id] = item.value;
                        });
                        setForm(formInputs);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [id]);

    // Fetch project fields based on selected project type
    useEffect(() => {
        const fetchProjectFeilds = () => {
            ProjectTypeService.getInputFieldsByProjectTypeAsync(app.selectedBudgetType).then((res) => {
                if (res) {
                    setFormFields(res);
                }
            });
        };
        fetchProjectFeilds();
    }, [app.selectedBudgetType]);

    return (
        <Card>
            <CardHeader
                title={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h3">{id ? 'Update Budget' : 'Add Budget'}</Typography>
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel id="demo-simple-select-label">Budget Type</InputLabel>
                            <Select
                                disabled={id ? true : false}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={app.selectedBudgetType}
                                label="Budget Type"
                                onChange={(e) => handleProjectType(e.target.value)}
                            >
                                {projectTypes?.map((item: ProjectTypeDetails) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                }
            />
            <CardContent>
                <FormTemplate
                    inputFieldsData={formFields}
                    selectedProjectType={app.selectedBudgetType}
                    title={title}
                    setTitle={setTitle}
                    form={form}
                    setForm={setForm}
                />
            </CardContent>
        </Card>
    );
};

export default AddBudget;
