const ProjectMessage = require('../models/ProjectMessage');

module.exports = {
    async index(request, response) {
        const { project_id } = request.params

        const messages = await ProjectMessage.find({ project: project_id });

        return response.json(messages);
    },

    async store(request, response) {
        const { sender_id, project_id } = request.headers; // sender may be the customer or the development team.
        const { message } = request.body;

        const projectMessage = await ProjectMessage.create({
            sender: sender_id,
            project: project_id,
            message
        });

        return response.json(projectMessage);
    }
};