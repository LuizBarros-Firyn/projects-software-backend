const mongoose = require('mongoose');
const User = require('../models/User');
const Team = require('../models/Team');

module.exports = {
    async create(request, response) {
        const { login, password } = request.body;

        const user = await User.findOne({ login });

        if (!user || user.password != password){
            return response.json({ fail_message: 'Login ou Senha inválida' });
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