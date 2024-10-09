export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: 'dc92cf9f-6712-4b49-9696-276ddaecf710',
      authority: "https://login.microsoftonline.com/6a513ab7-d291-4204-abdc-e2b6fc3e61a3",
    },
  },
  apiConfig: {
    scopes: ['user.read'],
    uri: 'https://graph.microsoft.com/v1.0/me',
  },
};
