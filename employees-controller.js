Employee = require('./employees-model');

exports.new = function (req, res) {
    var newEmployee = new Employee();
    newEmployee.name = req.body.name;
    newEmployee.position = req.body.position;

    if (newEmployee.name == null || newEmployee.position == null || newEmployee.name == "" || newEmployee.position == "") {
        res.status(400).json({
            message: 'Both Employee name and position should be non-empty'
        });
        return;
    } 

    Employee.findOne({name: newEmployee.name}, function (err, existingposition) {
        if (existingposition != null) {
            res.status(400).json({
                message: 'Employee name already exist'
            });
            return;
        } else {
            newEmployee.save(function (err) {
                if (err) {
                    res.send(err);
                    return;
                }
            });

            res.json({
                message: 'New Employee created',
                data: newEmployee
            });
            return;
        }
    });
};

exports.viewByName = function (req, res) {
    Employee.findOne({name: req.params.name}, function (err, existingemployee) {
        if (err) {
            res.send(err);
            return;
        } 

        if (existingemployee == null) {
            res.status(404).json({
                message: 'Employee not found',
            });
        } else {
            res.json({
                message: 'Found Employee',
                data: existingemployee
            })
        };
    });
};

exports.viewAll = function (req, res) {
    Employee.find({ }, function (err, allemployees) {
        if (err) {
            res.send(err);
            return;
        } 

        if (allemployees == 0) {
            res.status(404).json({
                message: 'No Employee found',
            });
            return;
        }  
        
        res.json({
            message: 'Found all Employees',
            data: allemployees
        })
    });
};

exports.update = function (req, res) {
    Employee.findOneAndDelete({name: req.params.name}, function (err, existingemployee) {        
        if (err) {
            res.send(err);
            return;
        }

        if (existingemployee == null) {
            res.status(404).json({
                message: 'Employee not found',
            });
        } else {
            var newEmployee = new Employee();
            newEmployee.name = req.body.name ? req.body.name : existingemployee.name;
            newEmployee.position = req.body.position ? req.body.position : existingemployee.position;
            newEmployee.save(function (err) {
                if (err) {
                    res.json(err);
                }
                res.json({
                    message: 'Employee updated',
                    data: newEmployee
                });
            });
        }
    });
};

exports.delete = function (req, res) {
    Employee.findOneAndDelete({name: req.params.name}, function (err, existingemployee) {
        if (err) {
            res.json(err);
            return;
        }

        if (existingemployee == null) {
            res.status(404).json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'Employee deleted',
                data: existingemployee
            });
        }
    });
};
