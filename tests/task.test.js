const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

require("dotenv").config();

beforeEach(async () => {
  await mongoose.connect(process.env.DB_PORT);
});

afterEach(async () => {
  await mongoose.connection.close();
});

// Get tasks ..
describe("GET /api/task/tasklist", () => {
  it("should return all tasks", async () => {
    const res = await request(app).get("/api/task/tasklist");
    expect(res.statusCode).toBe(200);
  });
});

// Create Task ..
describe("POST /api/task/create", () => {
  it("should create a task with valid input", async () => {
    const res = await request(app).post("/api/task/create").send({
      title: "Tes Validation 1",
      description: "Description of Task Test 2",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Task Created Successfully.");
  });

  // if title input invalid ..
  it("should return an error with invalid input", async () => {
    const res = await request(app).post("/api/task/create").send({
      title: 123,
      description: "Description of Task Test 2",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Title must be string");
    // if description input invalid ..
    const res2 = await request(app).post("/api/task/create").send({
      title: "Task Test 2",
      description: 123,
    });

    expect(res2.statusCode).toBe(400);
    expect(res2.body.success).toBe(false);
    expect(res2.body.message).toBe("Description must be string");

    // if title and description input invalid ..
    const res3 = await request(app).post("/api/task/create").send({
      title: 123,
      description: 123,
    });

    expect(res3.statusCode).toBe(400);
    expect(res3.body.success).toBe(false);
    expect(res3.body.message).toBe("Title must be string");
  });
});

// Delete task ..
describe("DELETE /api/task/delete/:id", () => {
  it("should delete a task and return a 200 status code", async () => {
    const createTaskResponse = await request(app)
      .post("/api/task/create")
      .send({
        title: "Task to Delete",
        description: "Description of Task to Delete",
      });

    const taskId = createTaskResponse.body.task_id;

    const deleteTaskResponse = await request(app).delete(
      `/api/task/delete/${taskId}`
    );
    expect(deleteTaskResponse.statusCode).toBe(200);
  });
});

// Update task status ..
describe("PUT /api/task/update/complete/:id", () => {
  it("should update the task's status to 'complete' and return a 200 status code", async () => {
    const createTaskResponse = await request(app)
      .post("/api/task/create")
      .send({
        title: "Task to Update Status",
        description: "Description of Task to Update Status",
      });

    const taskId = createTaskResponse.body.task_id;

    const updateStatusResponse = await request(app)
      .put(`/api/task/update/complete/${taskId}`)
      .send({ isComplete: true });

    expect(updateStatusResponse.statusCode).toBe(200);
  });
});
