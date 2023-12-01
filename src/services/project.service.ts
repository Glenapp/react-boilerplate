import environment from 'environment';
import { BasePaginatedItems } from 'types/base';
import { GetProjectsRequestDto, CreateProjectRequestDto, ProjectDetails, UpdateProjectRequestDto, ProjectChart } from 'types/project';
import axiosServices from 'utils/axios';

class ProjectService {
    static async getProjectsAsync(
        getProjectsRequestDto?: GetProjectsRequestDto
    ): Promise<ProjectDetails[] | BasePaginatedItems<ProjectDetails>> {
        return (
            await axiosServices.get(`${environment.PROJECT_URI}`, {
                params: getProjectsRequestDto
            })
        )?.data;
    }

    static async getProjectsChartAsync(getProjectsRequestDto?: GetProjectsRequestDto): Promise<ProjectChart> {
        return (
            await axiosServices.get(`${environment.PROJECT_URI}/chart`, {
                params: getProjectsRequestDto
            })
        )?.data;
    }

    static async getProjectAsync(projectId: number): Promise<ProjectDetails> {
        return (await axiosServices.get(`${environment.PROJECT_URI}/${projectId}`))?.data;
    }

    static async createProjectAsync(createProjectRequestDto: CreateProjectRequestDto): Promise<ProjectDetails> {
        return (await axiosServices.post(`${environment.PROJECT_URI}`, createProjectRequestDto))?.data;
    }

    static async updateProjectAsync(updateProjectRequestDto: UpdateProjectRequestDto): Promise<ProjectDetails> {
        return (await axiosServices.put(`${environment.PROJECT_URI}/${updateProjectRequestDto.id}`, updateProjectRequestDto))?.data;
    }

    static async deleteProjectAsync(projectId: number): Promise<void> {
        await axiosServices.delete(`${environment.PROJECT_URI}/${projectId}`);
    }
}

export default ProjectService;
