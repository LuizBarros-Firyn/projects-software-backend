const Team = require('../models/Team');
const User = require('../models/User');

module.exports = {
    async show(request, response) {
        const { team_id } = request.params;

        const team = await Team.findOne({ _id: team_id });

        if (!team)
            return response.status(400).send();

        return response.json(team);
    },

    async index(request, response) {
        const teams = await Team.find({ is_hiring: true });

        return response.json(teams);
    },

    async store(request, response) {
        const { user_id } = request.headers;
        const { title, description, is_hiring } = request.body;

        const team = await Team.create({
            owner: user_id,
            title,
            description,
            is_hiring
        });
        
        await User.updateOne({ _id: user_id }, { team: team._id });

        return response.json(team);
    }
};