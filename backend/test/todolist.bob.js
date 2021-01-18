const { db, disconnect } = require('../src/db');
const { exec } = require('child_process');

const request = require('supertest');
const app = require('../src/app');
const faker = require('faker');

const createFakeTodo = () => ({
	title: faker.lorem.words(3),
});
const createFakeTask = () => ({
	title: faker.lorem.words(3),
});

describe('Todolists endpoints', () => {
	afterEach(async () => {
		await db.$disconnect();
	});
	afterEach(async () => {
		db.todolist.deleteMany();
		db.todolistItem.deleteMany();
	});

	describe('Todolist endpoints', () => {
		describe('POST endpoints', () => {
			it('POST /todolist should create a new todolist', async () => {
				const newTodo = createFakeTodo();

				let response = await request(app)
					.post('/api/todolist')
					.send(newTodo)
					.expect(200)
					.expect('Content-Type', /json/);
				expect(response.body.id).toBeDefined();
				expect(response.body.title).toBe(newTodo.title);

				let todo = await db.todolist.findUnique({
					where: { id: response.body.id },
				});

				expect(todo).toBeDefined();
			});
		});
		describe('PUT endpoints', () => {
			it('PUT /todolist/:id should update a todolist', async () => {
				const fakeTodo = createFakeTodo();
				const newTodo = await db.todolist.create({ data: { ...fakeTodo } });

				const updatedTodo = await request(app)
					.put(`/api/todolist/${newTodo.id}`)
					.send({
						title: 'new Title',
					})
					.expect(200)
					.expect('Content-Type', /json/);

				expect(updatedTodo.body.id).toBeDefined();
				expect(updatedTodo.body.title).toBe('new Title');
			});
		});
		describe('DELETE endpoints', () => {
			it('DELETE /todolist/:id should delete a todolist', async () => {
				const newTodolist = await request(app);
				const fakeTodolist = createFakeTodo();
				const newTodo = await db.todolist.create({ data: { ...fakeTodolist } });
				const deletedTodo = await request(app)
					.delete(`/api/todolist/${newTodo.id}`)
					.expect(200)
					.expect('Content-Type', /json/);
				const todoInDb = await db.todolist.findMany({
					where: { id: newTodo.id },
				});
				expect(todoInDb.length).toBe(0);
			});
		});
	});
	describe('Task endpoints', () => {
		describe('POST endpoints', () => {
			it('POST /todolist/:id/task/ should create a new task', async () => {
				const newTask = createFakeTask();
				const fakeTodolist = createFakeTodo();
				const todolist = await db.todolist.create({
					data: { ...fakeTodolist },
				});

				let response = await request(app)
					.post(`/api/todolist/${todolist.id}/task`)
					.send(newTask)
					.expect(200)
					.expect('Content-Type', /json/);
				expect(response.body.id).toBeDefined();
				expect(response.body.title).toBe(newTask.title);

				let todo = await db.todolist.findUnique({
					where: { id: response.body.id },
				});

				expect(todo).toBeDefined();
				expect(todo.id).toBeDefined();
			});
		});
		describe('PUT endpoints', () => {
			it('PUT /todolist/:todoid/task/:taskid should updata a task', async () => {
				const newTask = createFakeTask();
				const fakeTodolist = createFakeTodo();
				const todolist = await db.todolist.create({
					data: { ...fakeTodolist },
				});
				const todoItem = await db.todolistItem.create({
					data: { ...newTask, Todolist: { connect: { id: todolist.id } } },
				});
				console.log(
					'newTodo',
					`/api/todolist/${todolist.id}/task/${todoItem.id}`
				);
				// await disconnect();
				console.log(`/api/todolist/${todolist.id}/task/${todoItem.id}`);
				// const todolist = await db.todolist.create({data:{createFakeTodo()}})
				let response = await request(app)
					.put(`/api/todolist/${todolist.id}/task/${todoItem.id}`)
					.send({ title: 'lol', done: true })
					.expect(200)
					.expect('Content-Type', /json/);
				expect(response.body.title).toBe('lol');
				expect(response.body.done).toBe(true);
			});
		});

		describe('GET endpoints', () => {
			it('GET /todolist/:todoid/task should return all task for the todolist', async () => {
				const newTask = createFakeTask();
				const fakeTodolist = createFakeTodo();
				const todolist = await db.todolist.create({
					data: { ...fakeTodolist },
				});
				const todoItem = await db.todolistItem.create({
					data: { ...newTask, Todolist: { connect: { id: todolist.id } } },
				});
				// await disconnect();

				let response = await request(app)
					.get(`/api/todolist/${todolist.id}/task`)
					.expect(200)
					.expect('Content-Type', /json/);
				expect(response.body.length).toBe(1);
			});
		});
		describe('GET endpoints', () => {
			it('GET /todolist/:todoid/task should return all task for the todolist', async () => {
				const newTask = createFakeTask();
				const fakeTodolist = createFakeTodo();
				const todolist = await db.todolist.create({
					data: { ...fakeTodolist },
				});
				const todoItem = await db.todolistItem.create({
					data: { ...newTask, Todolist: { connect: { id: todolist.id } } },
				});
				// await disconnect();

				let response = await request(app)
					.get(`/api/todolist/${todolist.id}/task`)
					.expect(200)
					.expect('Content-Type', /json/);
				expect(response.body.length).toBeDefined();
			});
		});
		describe('GET endpoints', () => {
			it('GET /todolist/:todoid/task should return all task for the todolist', async () => {
				const newTask = createFakeTask();
				const fakeTodolist = createFakeTodo();
				const todolist = await db.todolist.create({
					data: { ...fakeTodolist },
				});
				const todoItem = await db.todolistItem.create({
					data: { ...newTask, Todolist: { connect: { id: todolist.id } } },
				});
				// await disconnect();

				let response = await request(app)
					.get(`/api/todolist/${todolist.id}/task`)
					.expect(200)
					.expect('Content-Type', /json/);
				expect(response.body.length).toBeDefined();
			});
		});
		describe('GET endpoints', () => {
			it('GET /todolist/:todoid/task should return all task for the todolist', async () => {
				const newTask = createFakeTask();
				const fakeTodolist = createFakeTodo();
				const todolist = await db.todolist.create({
					data: { ...fakeTodolist },
				});
				const todoItem = await db.todolistItem.create({
					data: { ...newTask, Todolist: { connect: { id: todolist.id } } },
				});
				// await disconnect();

				let response = await request(app)
					.get(`/api/todolist/${todolist.id}/task`)
					.expect(200)
					.expect('Content-Type', /json/);
				expect(response.body.length).toBeDefined();
			});
		});
		describe('DELETE endpoints', () => {
			it('DELETE /todolist/:todoid/task/:taskId should delete a specific task', async () => {
				const newTask = createFakeTask();
				const fakeTodolist = createFakeTodo();
				const todolist = await db.todolist.create({
					data: { ...fakeTodolist },
				});
				const task = await db.todolistItem.create({
					data: { ...newTask, Todolist: { connect: { id: todolist.id } } },
				});
				// await disconnect();

				let response = await request(app)
					.delete(`/api/todolist/${todolist.id}/task/${task.id}`)
					.expect(200)
					.expect('Content-Type', /json/);
				expect(response.body.id).toBe(task.id);
			});
		});
	});
});
