const mongoose = require('mongoose');

const ProfileCommentSchema = new mongoose.Schema({
    message: String,
    maker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    profile: { // Profile is just a reference to the user whose profile will show the comment
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Profile_Comment', ProfileCommentSchema);