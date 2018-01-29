/*https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai*/

var chai = require('chai'),
	chaiHttp = require('chai-http'), 
	prototype = require('./prototype.js'), 
	should = chai.should(),
	fs = require('fs');

	chai.use(chaiHttp);

	describe('When a string with numbers are passed through', () => {
		it('it should display all the numbers in the string', (done) => {
			chai.request(prototype)
				.get('/api/phonenumbers/parse/text/Seneca%20Phone%20Number%3A%20416-491-5050')
				.end((error, response) => {
					response.should.have.status(200);
					response.body.should.be.a('array').that.include('416-491-5050')
					done();
				});
		});
	});

	describe('When a file is passed through', () => {
		it('it should display all the numbers in the file', (done) => {
			chai.request(prototype)
				.post('/api/phonenumbers/parse/file')
				.set('content-type', 'text/plain')
				.attach('file', fs.readFileSync('file.txt'), 'file.txt')
				.end((error, response) => {
					response.should.have.status(200);
					response.body.should.be.a('array').that.include('647-555-5555', '905-888-9898', '898-785-5444','789-987-9877')
					done();
				});
		});
	});