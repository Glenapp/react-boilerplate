import { BasePaginatedRequestDto } from './base';

export interface UserDetails {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    roleId: number;
    parentId: number;
    createdAt: Date;
}

export interface GetUserRequestDto extends BasePaginatedRequestDto {
    name?: string;
    roleId?: number;
}

export interface CreateUserRequestDto {
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
    parentId: number;
}
