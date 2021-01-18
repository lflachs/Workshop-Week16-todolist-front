const { db, disconnect } = require('../src/db');
const { exec } = require('child_process');

const request = require('supertest');
const app = require('../src/app');
const faker = require('faker');
const sinon = require('sinon');
const {
	createdTodoList,
	expectedCreatedTodolist,
} = require('./fixtures/todolist/fixtures');

const createFakeTodo = () => ({
	title: faker.lorem.words(3),
});
const createFakeTask = () => ({
	title: faker.lorem.words(3),
});
let TodolistModelMock;
describe('Todolists endpoints', () => {
	beforeEach(function () {
		TodolistModelMock = sinon.mock(db.todolist);
	});
	afterEach(function () {
		TodolistModelMock.restore();

		return db.$disconnect();
	});

	describe('Todolist service', () => {
		let newTodo, expectednewTodo, expectedError;
		it('should successfully create new customer', function () {
			newTodo = createdTodoList;
			expectedCreatedCustomer = expectednewTodo;
			TodolistModelMock.expects('create')
				.withArgs(newTodo)
				.resolves(expectedCreatedCustomer);
			return db.todolist.create(newTodo);
			// Should be a separate service file (just to test here)
		});
	});
});
