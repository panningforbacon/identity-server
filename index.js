const { Provider } = require('oidc-provider');

const issuer = 'http://localhost:3000';

const oidcProvider = new Provider(issuer);

oidcProvider.listen(3000, () => {
    console.log(`Server listening on port 3000.`);
    console.log(`>> Discovery Document: ${issuer}/.well-known/openid-configuration`);
});