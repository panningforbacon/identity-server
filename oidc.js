const { Provider } = require('oidc-provider');

const getOidcProvider = (issuer) => {
    return new Provider(issuer, {
        clients: [{
            client_id: 'app',
            client_secret: 'scorpion',
            grant_types: ['authorization_code'],
            redirect_uris: [`${issuer}/auth/login/callback`, 'https://oidcdebugger.com/debug'],
            response_types: ['code'],
        }],
        pkce: {
            required: () => false,
        },
    });
};

module.exports = {
    getOidcProvider,
};