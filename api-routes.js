let router = require('express').Router();
var employeesController = require('./employees-controller');

router.get('/', function (req, res) {
    res.json({
        message: 'It is working'
    });
});

router.route('/employees')
    .post(employeesController.new)
    .get(employeesController.viewAll);

router.route('/employees/:name')
    .get(employeesController.viewByName)
    .put(employeesController.update)
    .delete(employeesController.delete);

module.exports = router;