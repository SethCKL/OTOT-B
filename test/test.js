chai = require('chai');
chaiHttp = require('chai-http');
app = require('../index');

chai.use(chaiHttp);
chai.should();

describe('Employee API', function () {

  describe('POST /api/employees', function () {
    it('should post with valid name and position', function (done) {
        chai.request(app).post('/api/employees').send({"name" : "Seth", "position" : "rubbishman"}).end(
            function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            }
        )
    });
  });

  describe('GET /api/employees', function () {
    it('should get all employee entries', function (done) {
        chai.request(app).get('/api/employees').end(
            function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            }
        )
    });
  });

  describe('PUT /api/employees/:name', function () {
    it('should update name of existing employees', function (done) {
        chai.request(app).put('/api/employees/Seth')
            .send({"name" : "Kok"}).end(
            function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            }
        )
    });
  });

  describe('DELETE /api/employees/:name', function () {
    it('should delete existing employee', function (done) {
        chai.request(app).delete('/api/employees/Kok').end(
            function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            }
        )
    });
  });
});