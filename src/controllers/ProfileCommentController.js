const ProfileComment = require('../models/ProfileComment');

module.exports = {
    async index(request, response) {
        const { profile_id } = request.headers;

        const comments = await ProfileComment.find({ profile: profile_id }).populate({ path: 'maker', select: 'name photo' });

        return response.json(comments);
    },

    async store(request, response) {
        const { maker_id, profile_id } = request.headers;
        const { message } = request.body;

        const comment = await ProfileComment.create({
            maker: maker_id,
            profile: profile_id,
            message
        });

        const populatedComment = await ProfileComment.findOne({ _id: comment._id }).populate({ path: 'maker', select: 'name photo' });

        return response.json(populatedComment);
    }
};