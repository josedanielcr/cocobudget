import { EnvironmentConfiguration } from "../app/models/EnvironmentConfiguration";

const serverUrl='https://apimanagementcocobudget.azure-api.net';

// The list of file replacements can be found in `angular.json`.
export const environment: EnvironmentConfiguration = {
  env_name: 'dev',
  production: true,
  apiUrl: serverUrl,
  apiEndpoints: {
    userProfile:'user-profiles'
  },
  adb2cConfig: {
    clientId: '8a44802f-73fe-4a24-9bdf-256d93ee1ea7',
    readScopeUrl: 'https://cocobudget.onmicrosoft.com/api-management/read',
    writeScopeUrl: 'https://cocobudget.onmicrosoft.com/api-management/write',
    scopeUrls:[
      'https://cocobudget.onmicrosoft.com/api-management/read',
      'https://cocobudget.onmicrosoft.com/api-management/write'
    ],
    apiEndpointUrl: 'https://cocobudget.onmicrosoft.com/api-management'
  },
  cacheTimeInMinutes: 30
};
