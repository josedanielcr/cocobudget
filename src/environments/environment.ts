export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: 'dc92cf9f-6712-4b49-9696-276ddaecf710',
      authority: "https://cocobudget.b2clogin.com/cocobudget.onmicrosoft.com/B2C_1_cocobudget_signin_signup",
      knownAuthorities: ["cocobudget.onmicrosoft.com"],
      redirectUri: 'http://localhost:4200',
    },
  },
  apiConfig: {
    scopes: ['api://58e80ee9-a6a3-43bf-bcb3-de821d1b95c9/all_apis'],
    uri: 'https://graph.microsoft.com/v1.0/me',
  },
};
