import { BasePaginatedRequestDto } from './base';
import { ProjectInputFieldDetails, ProjectInputFieldRequestDto } from './input-field';

export interface ProjectDetails {
    id: number;
    name: string;
    typeId: number;
    typeName: string;
    createtAt: Date;
    createdById: string | null;
    inputFields: ProjectInputFieldDetails[];
    open?: boolean | undefined;
}

export interface GetProjectsRequestDto extends BasePaginatedRequestDto {
    name?: string;
    typeId?: number;
    createdStartDate?: Date;
    createEndDate?: Date;
    inputFields?: ProjectInputFieldRequestDto[];
    ids?: number[];
}

export interface CreateProjectRequestDto {
    name: string;
    typeId: number;
    inputFields?: ProjectInputFieldRequestDto[] | null;
}

export interface UpdateProjectRequestDto extends CreateProjectRequestDto {
    id: number;
}

export interface ProjectChart {
    dateToSeriesMap: { [key: string]: ProjectChartSeries[] };
}

export interface ProjectChartSeries {
    name: string;
    count: number;
}

export interface GetProjectChartRequestDto {
    groupType?: ProjectChartGroupTypes;
    createdStartDate?: Date;
    createdEndDate?: Date;
}

export enum ProjectChartGroupTypes {
    None = 'None',
    ProjectType = 'ProjectType'
}
