const mongoose = require('mongoose');
const User = require('../models/User');
const { SHA3 } = require('sha3');

const hash = new SHA3(512);

module.exports = {
    async create(request, response) {
        const { email, password } = request.body;

        const user = await User.findOne({ email });

        if (!user || user.password != hash.update(password).digest('hex')){
            return response.json({ fail_message: 'Email ou Senha inválida' });
        }

        let userSession;

        if (!user.is_freelancer) {
            userSession = { user_id: user._id, user_name: user.name, user_is_freelancer: user.is_freelancer }
            
            return response.json({ userSession })
        }

        if (user.team) {
            userSession = { user_id: user._id, user_name: user.name, user_is_freelancer: user.is_freelancer, user_has_team: true, user_team_id: user.team }
        } else {
            userSession = { user_id: user._id, user_name: user.name, user_is_freelancer: user.is_freelancer, user_has_team: false }
        }

        return response.json({ userSession });
    }
}