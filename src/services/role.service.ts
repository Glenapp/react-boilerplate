import environment from 'environment';
import axiosServices from 'utils/axios';
import { Roles } from 'types/roles';

class RoleService {
    static async getRolesAsync(): Promise<Roles[]> {
        return (await axiosServices.get(`${environment.ROLE_URI}`))?.data;
    }
}

export default RoleService;
