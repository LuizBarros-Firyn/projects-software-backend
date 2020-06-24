const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { SHA3 } = require('sha3');

const authConfig = require('../config/auth');

module.exports = {
    async create(request, response) {
        const { password } = request.body;

        const email = request.body.email.toLowerCase();

        const user = await User.findOne({ email });
        
        const hash = new SHA3(512);

        if (!user || user.password != hash.update(password).digest('hex')){
            return response.json({ fail_message: 'Email ou Senha inválida' });
        }
        
        const authorization = jwt.sign({ id: user._id }, authConfig.secret, {
            expiresIn: 86400, 
        });

        let userSession;

        if (!user.is_freelancer) {
            userSession = { user_id: user._id, user_name: user.name, user_is_freelancer: user.is_freelancer }
            
            return response.json({ userSession, authorization })
        }

        if (user.team) {
            userSession = { user_id: user._id, user_name: user.name, user_is_freelancer: user.is_freelancer, user_has_team: true, user_team_id: user.team }
        } else {
            userSession = { user_id: user._id, user_name: user.name, user_is_freelancer: user.is_freelancer, user_has_team: false }
        }

        return response.json({userSession, authorization});
    }
}