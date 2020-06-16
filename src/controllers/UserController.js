const User = require('../models/User');
const path = require('path');
const { SHA3 } = require('sha3');

module.exports = {
    async show(request, response) {
        const { user_id } = request.params;

        const user = await User.findOne({ _id : user_id });

        if (!user)
            response.status(404).send();

        return response.json(user);
    },

    async store(request, response) {
        const { name, password, age, email, company_name, city, uf, is_freelancer, techs } = request.body;

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
            techs: techs? techs.split(',').map(tech => tech.trim()) : null
        });

        return response.json(user);
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


        if (user_is_freelancer == true) { // if not explicit, 'if' command will check if the variable exists, not it's value
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