const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    photo: String,
    company_name: String,
    city: String,
    uf: String,
    is_freelancer: Boolean, // user type
    description: String, //user's bio
    projects_finished: Number,
    techs: [String],
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team' 
    },
});

module.exports = mongoose.model('User', UserSchema);