const Team = require('../models/Team');

module.exports = {
    async show(request, response) {
        const { team_id } = request.params;
        const { user_id } = request.headers;

        const team = await Team.findOne({ _id: team_id, owner: user_id });

        if (!team)
            return response.status(400).send();

        return response.json(team);
    },

    async put(request, response) {
        const { team_id } = request.params;
        const { user_id } = request.headers;
        const { title, description, is_hiring } = request.body;

        const team = await Team.findOneAndUpdate({ _id: team_id, owner: user_id }, { title, description, is_hiring }, { new: true });

        if (!team)
            return response.status(400).send();

        return response.json(team);
    }
};