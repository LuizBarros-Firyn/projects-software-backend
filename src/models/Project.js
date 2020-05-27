const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    start_date: String,
    expected_finish_date: String,
    finish_date: String,
    offers_quantity: Number,
    is_finished: Boolean,
    is_sent_for_approval: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }
});

module.exports = mongoose.model('Project', ProjectSchema);