const { Provider } = require('oidc-provider');

module.exports = new Provider(process.env.ISSUER, {
    clients: [{
        client_id: 'app',
        client_secret: 'scorpion',
        grant_types: ['authorization_code'],
        redirect_uris: [`${process.env.ISSUER}/auth/login/callback`, 'https://oidcdebugger.com/debug'],
        response_types: ['code'],
    }],
    pkce: {
        required: () => false,
    },
});