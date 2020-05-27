const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
    price: Number,
    description: String,
    start_date: String,
    finish_date: String,
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    project_creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }
});

module.exports = mongoose.model('Offer', OfferSchema);