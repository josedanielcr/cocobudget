export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: 'dc92cf9f-6712-4b49-9696-276ddaecf710',
      authority: "https://login.microsoftonline.com/6a513ab7-d291-4204-abdc-e2b6fc3e61a3",
    },
  },
  apiConfig: {
    scopes: ['api://58e80ee9-a6a3-43bf-bcb3-de821d1b95c9/all_apis'],
    uri: 'https://graph.microsoft.com/v1.0/me',
  },
};
