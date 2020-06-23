const User = require('../models/User');
const path = require('path');
const jwt = require('jsonwebtoken');
const { SHA3 } = require('sha3');
const authConfig = require('../config/auth');

module.exports = {
    async show(request, response) {
        const { user_id } = request.params;

        const user = await User.findOne({ _id : user_id });

        if (!user)
            return response.status(404).send();

        return response.json(user);
    },

    async store(request, response) {
        const { name, password, age, company_name, city, uf, is_freelancer, techs } = request.body;

        const email = request.body.email.toLowerCase();

        var user = await User.findOne({ email });

        if (user)
            return response.json({ fail_message: "E-mail indisponível" });

        const hash = new SHA3(512);
        
        user = await User.create({
            name,
            password: hash.update(password).digest('hex'),
            age,
            email,
            company_name,
            city,
            uf,
            is_freelancer,
            finished_projects: is_freelancer && 0,
            wallet_balance: 0,
            three_successful_projects_streak: is_freelancer && 0,
            five_successful_projects_streak: is_freelancer && 0,
            techs: techs? techs.split(',').map(tech => tech.trim()) : null
        });
        
        const authorization = jwt.sign({ id: user._id }, authConfig.secret, {
            expiresIn: 86400, 
        });

        return response.json({ user, authorization });
    },

    async update(request, response) {
        const fs = require('fs');

        const { user_id } = request.headers;
        const { name, description, city, uf, techs, company_name, user_is_freelancer } = request.body;
        var filename = request.file && request.file.filename;
        var user;
        
        const oldPhoto = await User.findOne({_id: user_id }, 'photo');

        if (oldPhoto.photo)
            fs.unlinkSync(path.resolve(__dirname, '..', '..', 'uploads', `${oldPhoto.photo}`));

        if (user_is_freelancer == "true") { // FormData used to send images transforms booleans into strings
            user = await User.findOneAndUpdate({ _id: user_id }, { 
                name,
                description, 
                city, 
                uf, 
                techs: techs? techs.split(',').map(tech => tech.trim()) : null,
                photo: filename && filename
            });
        } else {
            user = await User.findOneAndUpdate({ _id: user_id }, { 
                name,
                description, 
                city, 
                uf, 
                company_name,
                photo: filename && filename
            });
        }

        return response.json(user);
    }
};