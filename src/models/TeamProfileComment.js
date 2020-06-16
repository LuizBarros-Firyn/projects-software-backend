const mongoose = require('mongoose');

const TeamProfileCommentSchema = new mongoose.Schema({
    message: String,
    maker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    team_profile: { // Profile is just a reference to the user whose profile will show the comment
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
});

module.exports = mongoose.model('Team_Profile_Comment', TeamProfileCommentSchema);