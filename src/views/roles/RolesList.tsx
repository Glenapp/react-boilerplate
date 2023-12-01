import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    Button,
    List,
    ListItemButton,
    ListItemText,
    Typography,
    Box,
    Switch,
    FormControlLabel,
    FormGroup
} from '@mui/material';
import { IconPlus } from '@tabler/icons';
import RoleService from 'services/role.service';
import PermissionService from 'services/permission.service';
import { Permission } from 'types/permission';
import { UseApp } from 'hooks/useApp';

interface Role {
    id: number;
    name: string;
}

interface ModulePermissionsProps {
    name: string;
    permissions: string[];
}

interface PermissionSwitchProps {
    permission: any;
}

export default function RolesList() {
    const { setApp } = UseApp();
    const [rolesList, setRolesList] = useState<Role[]>([]);
    const [selectedRole, setSelectedRole] = useState<Role>();
    const [permissionsList, setPermissionList] = useState<Permission[]>([]);
    const [permissionSections, setPermisssionSections] = useState<any>([]);

    const handleChangePermission = (permission: any) => {
        const payload = {
            status: !permission.status
        };
        PermissionService.updatePermissionStatus(permission.id, payload).then((res) => {
            setPermissionList(res);
            setApp((prev) => ({
                ...prev,
                popupMessage: {
                    message: 'Permission Successfully updated.',
                    type: 'success',
                    show: true
                }
            }));
        });
    };

    useEffect(() => {
        const getAllRoles = () => {
            RoleService.getRolesAsync().then((res) => {
                if (res && res?.length) {
                    setRolesList(res);
                    setSelectedRole(res[0]);
                }
            });
        };
        getAllRoles();
    }, []);

    useEffect(() => {
        if (!selectedRole) {
            return;
        }
        const getRolePermissions = () => {
            PermissionService.getPermissionsAsync(selectedRole.id).then((res) => {
                setPermissionList(res);
            });
        };
        getRolePermissions();
    }, [selectedRole]);

    useEffect(() => {
        const groupedPermissions = permissionsList?.reduce((result: any, permission: any) => {
            const moduleTypeName = permission.moduleType.name;

            // Check if the moduleType.name exists in the result array
            const existingModuleType = result.find((item: any) => item.name === moduleTypeName);

            // If it exists, push the permission to the list
            if (existingModuleType) {
                existingModuleType.permissions.push(permission);
            } else {
                // If it doesn't exist, create a new entry
                result.push({ name: moduleTypeName, permissions: [permission] });
            }

            return result;
        }, []);
        setPermisssionSections(groupedPermissions);
    }, [permissionsList]);

    const ModulePermissions: React.FC<ModulePermissionsProps> = ({ name, permissions }) => {
        return (
            <Grid item lg={4}>
                <Box sx={{ borderRadius: 2, background: '#f7f7f7', p: 2 }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        {name}
                    </Typography>
                    <FormGroup>
                        {permissions.map((permission, index) => (
                            <React.Fragment key={index}>
                                <PermissionSwitch permission={permission} />
                            </React.Fragment>
                        ))}
                    </FormGroup>
                </Box>
            </Grid>
        );
    };

    const PermissionSwitch: React.FC<PermissionSwitchProps> = ({ permission }) => {
        return (
            <FormControlLabel
                control={<Switch checked={permission.status} onChange={(e) => handleChangePermission(permission)} name={permission.name} />}
                label={permission.description}
            />
        );
    };

    return (
        <React.Fragment>
            <Grid container spacing={1}>
                <Grid item lg={3}>
                    <Card sx={{ minHeight: 400 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h3">Roles</Typography>
                                <Button variant="contained" startIcon={<IconPlus />}>
                                    Add Role
                                </Button>
                            </Box>
                            <List sx={{ mt: 2 }} component="nav" aria-label="secondary mailbox folder">
                                {rolesList?.map((item: Role) => (
                                    <ListItemButton
                                        key={item.id}
                                        selected={selectedRole?.id === item.id}
                                        onClick={() => setSelectedRole(item)}
                                    >
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={9}>
                    <Card>
                        <CardHeader
                            title={
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="h4">Roles Permission</Typography>
                                    {/* <Button variant="contained">Save</Button> */}
                                </Box>
                            }
                        />
                        <CardContent>
                            <Grid container spacing={2}>
                                {permissionSections?.map((item: any) => {
                                    return (
                                        <React.Fragment key={item.id}>
                                            <ModulePermissions name={item.name} permissions={item.permissions} />
                                        </React.Fragment>
                                    );
                                })}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
