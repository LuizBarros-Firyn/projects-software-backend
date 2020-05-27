const TeamMessage = require('../models/TeamMessage');

module.exports = {
    async index(request, response) {
        const { team_id } = request.params

        const messages = await TeamMessage.find({ team: team_id }).populate('sender', 'name');

        return response.json(messages);
    },

    async store(request, response) {
        const { sender_id, team_id } = request.headers;
        const { message } = request.body;

        const teamMessage = await TeamMessage.create({
            team: team_id,
            sender: sender_id,
            message
        });

        const populatedTeamMessage = await TeamMessage.findOne({ _id: teamMessage._id }).populate('sender', 'name');

        return response.json(populatedTeamMessage);
    }
};