const Project = require('../models/Project');

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

        await Project.updateOne( { _id: project_id }, { $unset: { is_sent_for_approval: "" }, $set: { is_finished: true } } );

        return response.status(204).send();
    }
};