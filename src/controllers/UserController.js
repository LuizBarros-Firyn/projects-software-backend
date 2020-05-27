const User = require('../models/User');

module.exports = {
    async show(request, response) {
        const { id } = request.body;

        const user = await User.findOne({ _id : id });

        return response.json(user);
    },

    async store(request, response) {
        const { name, login, password, age, email, person_identifier, company_name, city, uf, is_freelancer, techs } = request.body
        
        const user = await User.create({
            name,
            login,
            password,
            age,
            email,
            person_identifier,
            company_name,
            city,
            uf,
            is_freelancer,
            phone: '',
            photo: '',
            techs: techs? techs.split(',').map(tech => tech.trim()) : null
        });

        return response.json(user);
    }
};