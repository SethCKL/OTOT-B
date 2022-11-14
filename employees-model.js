var mongoose = require('mongoose');

var employeesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    }
});

var Employees = module.exports = mongoose.model('employee', employeesSchema);
module.exports.get = function (callback, limit) {
    Employees.find(callback).limit(limit);
}