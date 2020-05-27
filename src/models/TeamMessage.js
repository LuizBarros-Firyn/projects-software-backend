const mongoose = require('mongoose');

const TeamMessageSchema = new mongoose.Schema({
    message: String,
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Team_Message', TeamMessageSchema);