const mongoose = require('mongoose');

const ProjectMessageSchema = new mongoose.Schema({
    message: String,
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Project_Message', ProjectMessageSchema);