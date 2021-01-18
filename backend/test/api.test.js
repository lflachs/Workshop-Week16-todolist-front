const request = require('supertest');
const app = require('../src/app');
const errorHandler = require('../src/middlewares/error-handling');

describe('/api', () => {
	it('GET /api should returns the api version', (done) => {
		request(app)
			.get('/api')
			.expect(200)
			.expect('Content-Type', /json/)
			.then((response) => {
				expect(response.body.version).toBe(0.1);
				done();
			});
	});
});

describe('/404', () => {
	it('GET /404 should returns page not found', (done) => {
		request(app)
			.get('/404')
			.expect(404)
			.expect('Content-Type', /json/)
			.then((response) => {
				expect(response.body.message).toBe('Page not found');
				done();
			});
	});
});

describe('error middleware', () => {
	let req, res;
	beforeEach(() => {
		jest.spyOn(console, 'error').mockImplementation(() => {});
		res = {
			data: null,
			code: null,
			status(status) {
				this.code = status;
				return this;
			},
			json(message) {
				this.json = message;
				return message;
			},
		};
		req = {
			params: {},
			body: {},
		};
	});

	it('If an error happen it should returns a 500 status and a json message', (done) => {
		errorHandler(new Error(), req, res);
		expect(res.code).toBe(500);
		expect(res.json.message).toBe('Internal server Error');
		done();
	});
});
