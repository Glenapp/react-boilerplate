import environment from 'environment';
import { GetInputFieldsRequestDto, InputFieldDetails } from 'types/input-field';
import axiosServices from 'utils/axios';

class InputFieldService {
    static async getInputFiledsAsync(getInputFieldsRequestDto?: GetInputFieldsRequestDto): Promise<InputFieldDetails[]> {
        return (
            await axiosServices.get(`${environment.INPUT_FIELD_URI}`, {
                params: getInputFieldsRequestDto
            })
        )?.data;
    }
}

export default InputFieldService;
