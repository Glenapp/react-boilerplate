import React, { useState } from 'react';
import ProjectReportChart from './ProjectReportChart';
import { Tab, Tabs, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ProjectTypeDetails } from 'types/project-type';
import ProjectTypeService from 'services/project-type.service';
import ReportProjectList from './ReportProjectList';
import { UseApp } from 'hooks/useApp';
import ReportFilters from './ReportFilters';
import InputFieldService from 'services/input-field.service';
import { useNavigate, useParams } from 'react-router-dom';

const Reports: React.FC = () => {
    const { setApp } = UseApp();
    const { type } = useParams();
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = React.useState<string | undefined>(type);
    const [selectedProjectType, setSelectedProjectType] = React.useState<number>(1);
    const [projectTypes, setProjectTypes] = React.useState<ProjectTypeDetails[]>([]);
    const [appliedFilters, setAppliedFilters] = useState<any>({
        inputFields: [],
        startDate: '',
        endDate: '',
        name: [],
        year: '',
        quarter: '',
        month: ''
    });

    // Define the list of tabs with their values and labels.
    const tabsList: { value: string; label: string }[] = [
        { value: 'summary', label: 'summary' },
        { value: 'graphical', label: 'Graphical' }
    ];

    // Handle tab changes when a tab is clicked.
    const handleChange = (e: React.ChangeEvent<{}>, value: string) => {
        navigate('/reports/' + value);
        setSelectedTab(value);
    };

    const handleProjectType = (e: any) => {
        setSelectedProjectType(e.target.value);
    };

    const updateInputFieldList = React.useCallback(
        (res: any) => {
            setApp((prev) => ({
                ...prev,
                inputFieldList: res
            }));
        },
        [setApp]
    );

    React.useEffect(() => {
        // Fetch project input fields based on the selected project type
        const getProjectInputFields = () => {
            const obj = {
                projectTypeId: selectedProjectType,
                isSearchable: true
            };
            InputFieldService.getInputFiledsAsync(obj).then((res: any) => {
                updateInputFieldList(res);
            });
        };
        getProjectInputFields();
    }, [selectedProjectType, updateInputFieldList]);

    React.useEffect(() => {
        // Fetch project types
        const getProjectTypes = () => {
            ProjectTypeService.getProjectTypesAsync().then((res: any) => {
                setProjectTypes(res);
            });
        };
        getProjectTypes();
    }, []);

    React.useEffect(() => {
        setSelectedTab(type);
    }, [type]);

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    {tabsList?.map((item: any) => (
                        <Tab key={item.value} label={item.label} value={item.value} />
                    ))}
                </Tabs>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {selectedTab === 'summary' ? (
                        <FormControl sx={{ minWidth: 200, ml: 3 }}>
                            <InputLabel id="demo-simple-select-label">Budget Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedProjectType}
                                label="Budget Type"
                                onChange={handleProjectType}
                            >
                                {projectTypes?.map((item: ProjectTypeDetails) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ) : (
                        ''
                    )}
                </Box>
            </Box>
            {selectedTab === 'summary' ? (
                <ReportFilters projectType={selectedProjectType} appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters} />
            ) : (
                ''
            )}
            {selectedTab === 'summary' ? (
                <ReportProjectList projectType={selectedProjectType} appliedFilters={appliedFilters} />
            ) : (
                <ProjectReportChart selectedTab={selectedTab} />
            )}
        </div>
    );
};

export default Reports;
