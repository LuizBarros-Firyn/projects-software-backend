const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (request, response, next) => {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).send({ error: "Acesso não autorizado" });
        console.log('erro 1')
    }

    const parts = authorization.split(' ');

    if (!parts.length === 2) {
        return response.status(401).send({ error: "Erro no token" });
        console.log('erro 2')
    }
    
    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme)){
        return response.status(401).send({ error: "Token mal formatado" });
        console.log('erro 3')
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err){
            return response.status(401).send({ error: "Token invalido"});
            console.log('erro 4')
        }

        request.userJwtId = decoded.id;

        return next();
    });
};