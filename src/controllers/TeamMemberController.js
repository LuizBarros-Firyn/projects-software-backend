const User = require('../models/User');

module.exports = {
    async index(request, response) {
        const { team_id } = request.headers;

        const members = await User.find({ team: team_id }, { name: 1, photo: 1 });

        return response.json(members);
    },
};