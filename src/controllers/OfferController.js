const Offer = require('../models/Offer');
const Project = require('../models/Project');

module.exports = {
    async index(request, response) {
        const { user_id, project_id } = request.headers;

        const offers = await Offer.find({ project: project_id, project_creator: user_id }).populate('team', 'title').exec();

        return response.json(offers);
    },
    
    async store(request, response) {
        const { project_id, team_id } = request.headers;
        const { price, description, start_date, finish_date } = request.body;

        const project = await Project.findOneAndUpdate({ _id: project_id }, { $inc: { "offers_quantity": 1 }});

        const offer = await Offer.create({
            project: project_id,
            team: team_id,
            project_creator: project.user,
            price,
            description,
            start_date,
            finish_date,
        });

        return response.json(offer);
    },

    async delete(request, response) {
        const { offer_id } = request.params;
        const { user_id } = request.headers;

        const offer = await Offer.findOne({ _id: offer_id });

        if (offer.project_creator != user_id) {
            return response.status(401).json({ error: "Operação não autorizada" })
        }

        await Offer.deleteOne({ _id: offer_id });

        return response.status(204).send();
    }
};