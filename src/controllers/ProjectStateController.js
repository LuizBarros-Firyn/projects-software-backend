const Project = require('../models/Project');

module.exports = {
    async update(request, response) {
        const { project_id } = request.params;

        const project = await Project.findOneAndUpdate( { _id: project_id }, { is_sent_for_approval: true }, { new: true } ).
        populate('user', 'name').
        populate('team', 'title').
        exec();

        return response.json(project);
    },

    async delete(request, response) { // delete here means refusal
        const { project_id } = request.params;

        const project = await Project.findOneAndUpdate( { _id: project_id }, { is_sent_for_approval: false } ).
        populate('user', 'name').
        populate('team', 'title').
        exec();

        return response.json(project);
    }
};