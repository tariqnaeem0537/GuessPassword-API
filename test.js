'use strict';
const app = require('./app');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

describe('Guess Password tests', async () => {
      it('it should GET a new Hint', (done) => {
        chai.request(app)
            .get('/new-password')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.hint.should.have.length(8);
              done();
            });
      });

      it('it should not be able to verify the password', (done) => {
        chai.request(app)
            .post('/verify-password')
            .send({hint: "ZDV90SHQ",
                  answer: "QHVZ09D"})
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.correct.should.be.eql(false);
              done();
            });
      });
  

});

 


