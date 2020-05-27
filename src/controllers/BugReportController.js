const BugReport = require('../models/BugReport');

module.exports = {

    async store(request, response) {
        const { description, found_error_page, bug_type, bug_intensity } = request.body;

        const bugReport = await BugReport.create({
            description,
            found_error_page,
            bug_type,
            bug_intensity
        });

        return response.json(bugReport);
    }
};