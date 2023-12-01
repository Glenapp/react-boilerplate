function trimSlashes(value: string) {
    return value.replace(/^\/|\/$/g, '');
}

const environment = {
    IS_DEVELOPMENT: process.env.NODE_ENV !== 'production',

    API_BASE_URL: trimSlashes(process.env.REACT_APP_API_BASE_URL || ''),
    API_FULL_URL: `${trimSlashes(process.env.REACT_APP_API_BASE_URL || '')}/${trimSlashes(process.env.REACT_APP_API_URI_PREFIX || '')}`,

    PROJECT_URI: process.env.REACT_APP_PROJECT_URI || '',
    PROJECT_TYPE_URI: process.env.REACT_APP_PROJECT_TYPE_URI || '',
    INPUT_FIELD_URI: process.env.REACT_APP_INPUT_FIELD_URI || '',
    USER_URI: process.env.REACT_APP_USER_URI || '',
    ROLE_URI: process.env.REACT_APP_ROLE_URI || '',
    PERMISSION_URI: process.env.REACT_APP_PERMISSION_URI || '',

    AD_CLIENT_ID: process.env.REACT_APP_AD_CLIENT_ID || '',
    AD_TENANT_ID: process.env.REACT_APP_AD_TENANT_ID || '',
    AD_SCOPE: process.env.REACT_APP_AD_SCOPE || ''
};

export default environment;
