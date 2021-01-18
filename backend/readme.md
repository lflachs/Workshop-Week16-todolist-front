# Todolist API 📓

## ✍ Description

This project is a todolist REST API.

This project is build using Node.js, Express and Prisma and contains integration testing with Jest and Supertest.

## 🍱 Package used

- [Express.js](http://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/visionmedia/supertest)
- [Http-errors](https://www.npmjs.com/package/http-errors)

## 🧰 How to install this project

To install this project, you should have node.js and npm installed.

- Clone this repository and use `npm install` to install all the dependencies.
- Create a copy of .env-template and change the variables with your db credentials.
- To setup the database with the last migration, use `npm run migrate:up`.

---

# 🌌 API endpoints

### Global endpoints

| Method | Endpoint | Description                        | Path Parameter | Request Query Parameter | Request Body | Response Body               | Response Status |
| ------ | -------- | ---------------------------------- | -------------- | ----------------------- | ------------ | --------------------------- | --------------- |
| GET    | /api     | Returns informations about our API | none           | none                    | none         | api Version and description | 200             |

### Todolist endpoints

| Method | Endpoint                           | Description                                                | Path Parameter      | Request Query Parameter | Request Body                   | Response Body                          | Response Status |
| ------ | ---------------------------------- | ---------------------------------------------------------- | ------------------- | ----------------------- | ------------------------------ | -------------------------------------- | --------------- |
| GET    | /todolist                          | Returns the list of available todolist                     | none                | none                    | none                           | list of todolist                       | 200             |
| POST   | /todolist                          | Create a new todolist                                      | none                | none                    | title of the todoolist         | id and title of the created tdolist    | 200             |
| PUT    | /todolist/:todolistId              | update a todolist                                          | todolistId          | none                    | Updated title of the todoolist | id and title of the updated tdolist    | 200             |
| DELETE | /todolist/:todolistId              | delete a todolist                                          | todolistId          | none                    | none                           | id and title of the deleted tdolist    | 200             |
| GET    | /todolist/:todolistId              | Returns the title of the todolist and the associated tasks | todolistId          | none                    | none                           | title of todolist and associated tasks | 200             |
| POST   | /todolist/:todolistId/task         | Post a new task in the todolist                            | todolistId          | none                    | task title                     | infos about the crerated task          | 200             |
| PUT    | /todolist/:todolistId/task/:taskId | Modify a task item                                         | todolistId - taskId | none                    | new Task details               | infos about the modified task          | 200             |
| DELETE | /todolist/:todolistId/task/:taskId | Delete a task item                                         | todolistId - taskId | none                    | none                           | infos about the deleted task           | 200             |

# 🌌 API endpoints

### Global endpoints

| Method | Endpoint | Description                        | Path Parameter | Request Query Parameter | Request Body | Response Body               | Response Status |
| ------ | -------- | ---------------------------------- | -------------- | ----------------------- | ------------ | --------------------------- | --------------- |
| GET    | /api     | Returns informations about our API | none           | none                    | none         | api Version and description | 200             |

### Todolist endpoints

| Method | Endpoint                           | Description                                                | Path Parameter      | Request Query Parameter | Request Body                   | Response Body                          | Response Status |
| ------ | ---------------------------------- | ---------------------------------------------------------- | ------------------- | ----------------------- | ------------------------------ | -------------------------------------- | --------------- |
| GET    | /todolist                          | Returns the list of available todolist                     | none                | none                    | none                           | list of todolist                       | 200             |
| POST   | /todolist                          | Create a new todolist                                      | none                | none                    | title of the todoolist         | id and title of the created tdolist    | 200             |
| PUT    | /todolist/:todolistId              | update a todolist                                          | todolistId          | none                    | Updated title of the todoolist | id and title of the updated tdolist    | 200             |
| DELETE | /todolist/:todolistId              | delete a todolist                                          | todolistId          | none                    | none                           | id and title of the deleted tdolist    | 200             |
| GET    | /todolist/:todolistId              | Returns the title of the todolist and the associated tasks | todolistId          | none                    | none                           | title of todolist and associated tasks | 200             |
| POST   | /todolist/:todolistId/task         | Post a new task in the todolist                            | todolistId          | none                    | task title                     | infos about the crerated task          | 200             |
| PUT    | /todolist/:todolistId/task/:taskId | Modify a task item                                         | todolistId - taskId | none                    | new Task details               | infos about the modified task          | 200             |
| DELETE | /todolist/:todolistId/task/:taskId | Delete a task item                                         | todolistId - taskId | none                    | none                           | infos about the deleted task           | 200             |
