const Project = require('../models/Project');
const User = require('../models/User');

module.exports = {
    async show(request, response) {
        const { project_id } = request.params;
        const { request_owner } = request.headers;

        const project = await Project.findOne({ _id: project_id, $or: [{ user: request_owner }, { team: request_owner }] }).
        populate('user', 'name').
        populate('team', 'title').
        exec();

        return response.json(project);
    },

    async index(request, response) {
        const { user_id, team_id } = request.headers;

        let projects;

        if (user_id) // response depends on the user requesting. If the request is from a customer, their 'user_id' will come. If it's from a freelancer, their 'team_id' will come.
            projects = await Project.find({ user: user_id, team: { $exists: true }, is_finished: { $ne: true } }).populate('team', 'title').exec();
        else
            projects = await Project.find({ team: team_id, is_finished: { $ne: true } }).populate('user', 'name').exec();

        return response.json(projects);
    },

    async update(request, response) {
        const { project_id } = request.params;

        const project = await Project.findOneAndUpdate( { _id: project_id }, { $unset: { is_sent_for_approval: "" }, $set: { is_finished: true } } );

        const assignedTeamMembers = await User.find({ team: project.team });

        const teamLength = assignedTeamMembers.length;
        
        if (new Date() < project.expected_finish_date) {
            assignedTeamMembers.map(async teamMember => {
                await User.updateOne( { _id: teamMember._id }, { $inc: { 
                    "projects_finished": 1, "wallet_balance": (project.price * 0.8) / teamLength, "three_successful_projects_streak": 1, "five_successful_projects_streak": 1 }
                });
            });
        } else {
            assignedTeamMembers.map(async teamMember => {
                await User.updateOne( { _id: teamMember._id }, { $set: { three_successful_projects_streak: 0, five_successful_projects_streak: 0 } });
            });
        }
            
        return response.status(204).send();
    }
};