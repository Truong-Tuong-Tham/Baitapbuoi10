const express = require("express");
const mysql = require("mysql2/promise");

const port = 3000;
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "node44",
  password: "123456",
  port: 3307,
});

const app = express();
app.use(express.json());

// Xử lý like nhà hàng
app.get("/restaurants/:restaurantId/likes", async (req, res) => {
  const restaurantId = req.params.restaurantId;
  const [rows] = await connection.execute(
    "SELECT * FROM like_res WHERE res_id = ?",
    [restaurantId]
  );
  res.json(rows);
});

app.post("/restaurants/:restaurantId/likes", async (req, res) => {
  const restaurantId = req.params.restaurantId;
  const userId = req.body.userId;
  await connection.execute(
    "INSERT INTO like_res (user_id, res_id) VALUES (?, ?)",
    [userId, restaurantId]
  );
  res.sendStatus(201);
});

app.delete("/restaurants/:restaurantId/likes", async (req, res) => {
  const restaurantId = req.params.restaurantId;
  const userId = req.body.userId; // Assuming you have authentication to get the user ID
  await connection.execute(
    "DELETE FROM like_res WHERE user_id = ? AND res_id = ?",
    [userId, restaurantId]
  );
  res.sendStatus(204);
});

// Xử lý đánh giá nhà hàng
app.get("/restaurants/:restaurantId/reviews", async (req, res) => {
  const restaurantId = req.params.restaurantId;
  const [rows] = await connection.execute(
    "SELECT * FROM rate_res WHERE res_id = ?",
    [restaurantId]
  );
  res.json(rows);
});

app.post("/restaurants/:restaurantId/reviews", async (req, res) => {
  const restaurantId = req.params.restaurantId;
  const userId = req.body.userId;
  const rating = req.body.rating;
  const comment = req.body.comment;
  await connection.execute(
    "INSERT INTO rate_res (user_id, res_id, amount, date_rate) VALUES (?, ?, ?, NOW())",
    [userId, restaurantId, rating, comment]
  );
  res.sendStatus(201);
});

// Đặt món
app.post("/orders", async (req, res) => {
  const userId = req.body.userId;
  const foodId = req.body.foodId;

  await connection.execute(
    "INSERT INTO orders (user_id, food_id) VALUES (?, ?)",
    [userId, foodId]
  );
  res.sendStatus(201);
});

// Lấy danh sách
app.get("/users", async (req, res) => {
  const [rows] = await connection.execute("SELECT * FROM users");
  res.json(rows);
});

app.get("/restaurants", async (req, res) => {
  const [rows] = await connection.execute("SELECT * FROM restaurant");
  res.json(rows);
});

app.get("/foods", async (req, res) => {
  const [rows] = await connection.execute("SELECT * FROM food");
  res.json(rows);
});

app.get("/orders", async (req, res) => {
  const [rows] = await connection.execute("SELECT * FROM orders");
  res.json(rows);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
