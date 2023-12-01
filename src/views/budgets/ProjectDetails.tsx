import React from 'react';
import { Dialog, DialogTitle, IconButton, DialogContent, List, ListItem, Grid, Typography, Divider, Chip } from '@mui/material';
import { IconX } from '@tabler/icons';
import { InputFieldDetails, ProjectInputFieldDetails } from 'types/input-field';
import { UseApp } from 'hooks/useApp';
import moment from 'moment-timezone';

// Props interface for ProjectDetails component
interface ProjectDetailsProps {
    project: {
        open: boolean;
        details: {
            typeId: number;
            name: string;
            typeName: string;
            inputFields: ProjectInputFieldDetails[];
        };
    };
    setProject: React.Dispatch<
        React.SetStateAction<{
            open: boolean;
            details: {
                typeId: number;
                name: string;
                typeName: string;
                inputFields: ProjectInputFieldDetails[];
            };
        }>
    >;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, setProject }) => {
    const { app } = UseApp();

    // Helper function to get the name for a given ID from inputFieldList
    const getValue = (id: number) => {
        const filter = app?.inputFieldList?.filter((input: InputFieldDetails) => input.id === id);
        if (filter.length) {
            return filter[0].name;
        } else {
            return '';
        }
    };

    const formatValue = (item: ProjectInputFieldDetails) => {
        const filter = app?.inputFieldList?.filter((input: InputFieldDetails) => input.id === item.id);
        if (filter.length && filter[0]?.type === 'Date' && item.value) {
            const formattedDate = moment(item.value).tz(moment.tz.guess()).format('YYYY-MM-DD');
            return formattedDate;
        } else {
            if (typeof item.value === 'object' && item.value !== null) {
                let total = 0;
                Object.keys(item.value)?.forEach((year: any) => {
                    if (item?.value[year]) {
                        total = total + parseInt(item?.value[year]);
                    }
                });
                return total;
            } else {
                return item.value;
            }
        }
    };

    return (
        <Dialog
            maxWidth={'md'}
            fullWidth={true}
            onClose={() => setProject((prev: any) => ({ ...prev, open: false }))}
            aria-labelledby="customized-dialog-title"
            open={project.open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Project Details
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setProject((prev: any) => ({ ...prev, open: false }))}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500]
                }}
            >
                <IconX />
            </IconButton>
            <DialogContent>
                <Typography variant="h4">Title: {project?.details?.name}</Typography>
                <Typography variant="h4" sx={{ mt: 2 }}>
                    Budget Type: <Chip label={project?.details?.typeName} color="primary" />
                </Typography>
                <List>
                    {project?.details?.inputFields?.map((item: ProjectInputFieldDetails) => {
                        return (
                            <React.Fragment key={item.id}>
                                <ListItem>
                                    <Grid container>
                                        <Grid item lg={5} xs={5}>
                                            <Typography variant="h4">{getValue(item.id)}</Typography>
                                        </Grid>
                                        <Grid item lg={7} xs={7}>
                                            {formatValue(item)}
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        );
                    })}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectDetails;
