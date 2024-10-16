import express from "express";
import {
  deleteLike,
  getFoods,
  getLike,
  getOrders,
  getRate,
  getRestaurants,
  getUsers,
  postLike,
  postOrder,
  postRate,
} from "../controller/food.controller.js";

const foodRoutes = express.Router();
// Xử lý like nhà hàng
app.get("/restaurants/:restaurantId/likes", getLike);

app.post("/restaurants/:restaurantId/likes", postLike);

app.delete("/restaurants/:restaurantId/likes", deleteLike);

// Xử lý đánh giá nhà hàng
app.get("/restaurants/:restaurantId/reviews", getRate);

app.post("/restaurants/:restaurantId/reviews", postRate);

// Đặt món
app.post("/orders", postOrder);

// Lấy danh sách
app.get("/users", getUsers);

app.get("/restaurants", getRestaurants);

app.get("/foods", getFoods);

app.get("/orders", getOrders);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

export default foodRoutes;
