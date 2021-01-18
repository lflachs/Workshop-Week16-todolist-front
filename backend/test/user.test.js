const { db, disconnect } = require('../src/db');
const { exec } = require('child_process');

const request = require('supertest');
const app = require('../src/app');
const faker = require('faker');

const createUserRecord = () => ({
	email: faker.internet.email(),
	name: faker.name.firstName(),
	password: faker.internet.password(),
});

describe('User endpoints', () => {
	beforeEach(async (done) => {
		await db
			.$queryRaw(`DROP DATABASE IF EXISTS \`${process.env.DB_NAME_TEST}\``)
			.catch((err) => console.log(err));

		exec(`npm run migrate:test`, (err) => {
			if (err) {
				throw new Error(err.message);
			}
			done();
		});
	});
	afterEach(async (done) => {
		await disconnect();
		done();
	});

	// describe('POST endpoints', () => {
	// 	it('POST /user should create a new user', async (done) => {
	// 		let response = await request(app)
	// 			.post('/api/auth/login')
	// 			.send(createUserRecord())
	// 			.expect(200)
	// 			.expect('Content-Type', /json/);
	// 		expect(response.body.id).toBe(1);

	// 		let user = await db.user.findUnique({ where: { id: response.body.id } });
	// 		expect(user).toBeDefined();
	// 		expect(user.id).toBe(1);
	// 		done();
	// 	});
	// });
	describe('PUT endpoints', () => {
		it('PUT /user/:id should update a user', async () => {
			const fakeUser = createUserRecord();
			const newUser = await request(app)
				.post('/api/auth/register')
				.send(fakeUser)
				.expect(200)
				.expect('Content-Type', /json/);
			const updatedUser = await request(app)
				.put(`/api/user/${newUser.body.id}`)
				.send({
					email: 'john@hey.com',
					name: 'Bob',
				})
				.expect(200)
				.expect('Content-Type', /json/);

			expect(updatedUser.body.email).toBe('john@hey.com');
			expect(updatedUser.body.name).toBe('Bob');
			expect(updatedUser.body.password).not.toBeDefined;
		});
	});
});

describe('DELETE endpoints', () => {
	it('DELETE /user/:id should delete a user', async () => {
		const newBook = await request(app);
		const fakeUser = createUserRecord();
		const newUser = await request(app)
			.post('/api/auth/register')
			.send(fakeUser)
			.expect(200)
			.expect('Content-Type', /json/);
		const deletedUser = await request(app)
			.delete(`/api/user/${newUser.body.id}`)
			.expect(200)
			.expect('Content-Type', /json/);
		const userInDb = await db.user.findMany({ where: { id: newUser.body.id } });
		disconnect();
		expect(userInDb.length).toBe(0);
	});
});
