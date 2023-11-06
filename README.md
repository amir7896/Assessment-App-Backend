# Backend API Documentation

This documentation provides details on how to use the API endpoints of the backend server. The API allows you to manage tasks.

## Table of Contents

1. [Create a Task](#create-a-task)
2. [Get Tasks](#get-tasks)
3. [Get Single Task](#get-single-task)
4. [Update Task](#update-task)
5. [Update Task Status](#update-task-status)
6. [Delete Task](#delete-task)

## 1. Create a Task

- **URL**: POST /api/task/create
- **Description**: Create a new task.
- **Request Body**:
  - `title` (string): The title of the task.
  - `description` (string): The description of the task.
  - `isComplete` (boolean): (Optional) Indicates whether the task is complete.
- **Response**:
  - `success` (boolean): `true` if the task was created successfully.
  - `message` (string): A success message.
  - `task_id` (string): The ID of the created task.

## 2. Get Tasks

- **URL**: GET /api/task/tasklist
- **Description**: Retrieve a list of tasks.
- **Query Parameters**:
  - `completed` (string): (Optional) Filter tasks by completion status.
    - `completed=null`: Retrieve all tasks (default).
    - `completed=false`: Retrieve uncompleted tasks.
    - `completed=true`: Retrieve completed tasks.
- **Response**:
  - `success` (boolean): `true` if the request was successful.
  - `data` (array): An array of task objects.

## 3. Get Single Task

- **URL**: GET /api/task/:id
- **Description**: Retrieve a single task by its ID.
- **Response**:
  - `success` (boolean): `true` if the task was found.
  - `data` (object): The task object.

## 4. Update Task

- **URL**: PUT /api/task/update/:id
- **Description**: Update an existing task by its ID.
- **Request Body**:
  - `title` (string): The updated title of the task.
  - `description` (string): The updated description of the task.
  - `isComplete` (boolean): The updated completion status of the task.
- **Response**:
  - `success` (boolean): `true` if the task was updated successfully.
  - `message` (string): A success message.

## 5. Update Task Status

- **URL**: PUT /api/task/update/complete/:id
- **Description**: Update the completion status of a task.
- **Request Body**:
  - `isComplete` (boolean): The updated completion status of the task.
- **Response**:
  - `success` (boolean): `true` if the task's status was updated successfully.
  - `message` (string): A success message.

## 6. Delete Task

- **URL**: DELETE /api/task/delete/:id
- **Description**: Delete a task by its ID.
- **Response**:
  - `success` (boolean): `true` if the task was deleted successfully.
  - `message` (string): A success message.

## Running Tests

You can run the unit tests for the backend application using `npm test`. The tests are implemented using the Jest testing framework and can be found in the `__tests__` directory. Make sure you have the necessary dependencies installed and your environment is properly configured.

To run the tests, use the following command:

```bash
npm test
```
