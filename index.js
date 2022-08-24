const { Provider } = require('oidc-provider');

const issuer = 'http://localhost:3000';

const oidcProvider = new Provider(issuer, {
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

oidcProvider.listen(3000, () => {
    console.log(`Server listening on port 3000.`);
    console.log(`>> Discovery Document: ${issuer}/.well-known/openid-configuration`);
    console.log(`>> Test the OP server: https://oidcdebugger.com/`);
});