const mongoose = require('mongoose');

const BugReportSchema = new mongoose.Schema({
    description: String,
    found_error_page: String,
    bug_type: String,
    bug_intensity: Number
});

module.exports = mongoose.model('Bug_Report', BugReportSchema);