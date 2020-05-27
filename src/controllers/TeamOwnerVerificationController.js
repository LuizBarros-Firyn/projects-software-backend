const Team = require('../models/Team');

module.exports = {
    async show(request, response) {
        const { team_id, user_id } = request.headers

        const team = await Team.findOne({ _id: team_id, owner: user_id });

        if (team)
            return response.json({ user_is_team_owner: true })
        
        return response.json({ user_is_team_owner: false })
    }
};