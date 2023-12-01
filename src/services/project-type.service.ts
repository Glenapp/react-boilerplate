import environment from 'environment';
import { InputFieldDetails } from 'types/input-field';
import { ProjectTypeDetails } from 'types/project-type';
import axiosServices from 'utils/axios';

class ProjectTypeService {
    static async getProjectTypesAsync(): Promise<ProjectTypeDetails> {
        return (await axiosServices.get(`${environment.PROJECT_TYPE_URI}`))?.data;
    }

    static async getInputFieldsByProjectTypeAsync(projectTypeId: number): Promise<InputFieldDetails[]> {
        return (await axiosServices.get(`${environment.PROJECT_TYPE_URI}/${projectTypeId}/input-fields`))?.data;
    }
}

export default ProjectTypeService;
