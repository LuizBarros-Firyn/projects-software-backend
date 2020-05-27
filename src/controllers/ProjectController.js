const Project = require('../models/Project');

module.exports = {
    async index(request, response) {
        const { user_id } = request.headers;

        const projects = await Project.find({ user: user_id });

        return response.json(projects);
    },

    async store(request, response) {
        const { user_id } = request.headers;
        const { title, description } = request.body;

        const project = await Project.create({
            user: user_id,
            title,
            description,
            offers_quantity: 0
        });

        return response.json(project);
    }
};