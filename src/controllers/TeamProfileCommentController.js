const TeamProfileComment = require('../models/TeamProfileComment');

module.exports = {
    async index(request, response) {
        const { team_profile_id } = request.headers;

        const comments = await TeamProfileComment.find({ team_profile: team_profile_id }).populate({ path: 'maker', select: 'name photo' });

        return response.json(comments);
    },

    async store(request, response) {
        const { maker_id, team_profile_id } = request.headers;
        const { message } = request.body;

        const comment = await TeamProfileComment.create({
            maker: maker_id,
            team_profile: team_profile_id,
            message
        });

        const populatedComment = await TeamProfileComment.findOne({ _id: comment._id }).populate({ path: 'maker', select: 'name photo' });

        return response.json(populatedComment);
    }
};