export interface InputFieldDetails {
    id: number;
    name: string;
    description?: string;
    projectTypeId: number;
    category?: string;
    type: InputFieldTypes;
    defaultValue?: InputFieldValueType;
    metadata?: InputFieldMetadata;
    isRequired?: boolean;
    isSearchable?: boolean;
}

export interface GetInputFieldsRequestDto {
    name?: string;
    category?: string;
    projectTypeId?: number;
    type?: InputFieldTypes;
    isRequired?: boolean;
    isSearchable?: boolean;
    ids?: number[];
}

export type InputFieldValueType = string | number | null | any;

export interface DropdownInputFieldMetadata {
    options: string[];
}

export type InputFieldMetadata = DropdownInputFieldMetadata;

export enum InputFieldTypes {
    Text = 'Text',
    Number = 'Number',
    Dropdown = 'Dropdown',
    Date = 'Date',
    Attachment = 'Attachment'
}

export interface ProjectInputFieldRequestDto {
    id: number;
    value?: InputFieldValueType;
}

export interface ProjectInputFieldDetails {
    id: number;
    value?: InputFieldValueType;
}
