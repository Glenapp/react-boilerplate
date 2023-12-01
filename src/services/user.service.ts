import environment from 'environment';
import { BasePaginatedItems } from 'types/base';
import { CreateUserRequestDto, GetUserRequestDto, UserDetails } from 'types/users';
import axiosServices from 'utils/axios';

class UserService {
    static async getUsersAsync(getUserRequestDto?: GetUserRequestDto): Promise<UserDetails[] | BasePaginatedItems<UserDetails>> {
        return (
            await axiosServices.get(`${environment.USER_URI}`, {
                params: getUserRequestDto
            })
        )?.data;
    }

    static async createUserAsync(createUserRequestDto: CreateUserRequestDto): Promise<UserDetails> {
        return (await axiosServices.post(`${environment.USER_URI}`, createUserRequestDto))?.data;
    }
}

export default UserService;
