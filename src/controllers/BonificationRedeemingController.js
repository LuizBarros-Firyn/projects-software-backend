const User = require('../models/User');

module.exports = {
    async update(request, response) {
        const { user_id, bonification } = request.headers;

        const user = await User.findOne({ _id: user_id });

        switch (bonification) {
            case '3': 
                if (user.three_successful_projects_streak >= 3) {
                    await User.updateOne( { _id: user_id }, { $inc: { "wallet_balance": 5 }, $set: { three_successful_projects_streak: 0 } } );
                    return response.status(201).send();
                } else {
                    return response.status(400).send();
                }
            case '5':
                if (user.five_successful_projects_streak >= 5) {
                    await User.updateOne( { _id: user_id }, { $inc: { "wallet_balance": 10 }, $set: { five_successful_projects_streak: 0 } } );
                    return response.status(201).send();
                } else {
                    return response.status(400).send();
                }
            default: 
                return response.status(404).send();
        }
    }
}