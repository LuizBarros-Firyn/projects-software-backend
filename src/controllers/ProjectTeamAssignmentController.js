const Project = require('../models/Project');
const Offer = require('../models/Offer');

module.exports = {
    async index(request, response) {
        const projects = await Project.find({ team: { $exists: false } });

        return response.json(projects);
    },

    async update(request, response) {
        const { project_id } = request.params;
        const { user_id, team_id } = request.headers;
        const { price, start_date, finish_date } = request.body

        let project = await Project.findOne({ _id: project_id });

        if (!project.user == user_id) {
            return response.status(401).json({ error: "Operação não autorizada" })
        }

        if (project.team) {
            return response.status(400).json({ error: "Bad Request" })
        }

        project = await Project.findOneAndUpdate(
            { _id: project_id },
            {
                team: team_id,
                price,
                start_date,
                expected_finish_date: finish_date, 
                $unset: { offers_quantity: "" } 
            },
            { new: true });

        await Offer.deleteMany({ project: project_id });

        return response.json(project);
    }
};