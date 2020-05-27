const mongoose = require('mongoose');

const TeamJoiningSolicitationSchema = new mongoose.Schema({
    message: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team' 
    },
    team_owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }
});

module.exports = mongoose.model('Team_Joining_Solicitation', TeamJoiningSolicitationSchema);