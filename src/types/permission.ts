export interface ModuleType {
    id: number;
    name: string;
}

export interface Permission {
    id: number;
    name: string;
    description: string;
    moduleType: ModuleType;
    moduleTypeId: number;
    roleId: number;
    status: boolean;
}

export interface UpdatePermissionRequestDto {
    status: boolean;
}