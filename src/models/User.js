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
    seniority_level: Number,
    wallet_balance: Number,
    projects_finished: Number,
    three_successful_projects_streak: Number,
    five_successful_projects_streak: Number,
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
    techs: [String],
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team' 
    },
});

module.exports = mongoose.model('User', UserSchema);