const User = require('../models/User');

module.exports = {
    async show(request, response) {
        const { user_id } = request.headers;

        const user = await User.findOne({ _id : user_id });

        if (!user)
            return response.status(400).send();

        const userGamificationStatus = {
            onboardingSteps: user.photo && user.description ? true : false,
            team: user.team ? true : false,
            fiveTechs: user.techs.length >= 5 ? true : false,
            finishedProjects: user.projects_finished,
            three_successful_projects_streak: user.three_successful_projects_streak >= 3 ? true : false,
            five_successful_projects_streak: user.five_successful_projects_streak >= 5 ? true : false 
        }

        return response.json(userGamificationStatus);
    },
};