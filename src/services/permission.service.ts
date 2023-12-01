import environment from 'environment';
import { Permission, UpdatePermissionRequestDto } from 'types/permission';
import axiosServices from 'utils/axios';

class PermissionService {
    static async getPermissionsAsync(roleId: number): Promise<Permission[]> {
        return (await axiosServices.get(`${environment.PERMISSION_URI}/${roleId}`))?.data;
    }

    static async updatePermissionStatus(id: number, updatePermissionRequestDto: UpdatePermissionRequestDto): Promise<Permission[]> {
        return (await axiosServices.put(`${environment.PERMISSION_URI}/${id}`, updatePermissionRequestDto))?.data;
    }
}

export default PermissionService;
