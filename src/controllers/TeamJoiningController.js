const TeamJoiningSolicitation = require('../models/TeamJoiningSolicitation');
const User = require('../models/User');

module.exports = {
    async store(request, response) {
        const { new_member_id, team_id } = request.headers;

        await TeamJoiningSolicitation.deleteMany({ user: new_member_id });

        await User.updateOne({ _id: new_member_id }, { team: team_id });

        return response.status(204).send();
    },
};