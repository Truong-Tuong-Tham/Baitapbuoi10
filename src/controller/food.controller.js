import  initModels from "../models/init-models.js";
import sequelize from "../models/connection.js";
import e from "express";

const  model= initModels(sequelize);

export const getLike = async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
  
   
      const likes = await model.like_res.findAll({
        where: {
          res_id: restaurantId
        }
      });
  
      res.json(likes);
    } catch (error) {
      console.error("Error fetching likes:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  export const postLike = async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
      const userId = req.body.userId;
  
     
      await model.like_res.create({
        user_id: userId,
        res_id: restaurantId
      });
  
      res.sendStatus(201); 
    } catch (error) {
      console.error("Error posting like:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  export const deleteLike = async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
      const userId = req.body.userId;
  
   
      await model.like_res.destroy({
        where: {
          user_id: userId,
          res_id: restaurantId
        }
      });
  
      res.sendStatus(204); 
    } catch (error) {
      console.error("Error deleting like:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  export const getRate = async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
  
      const rates = await model.rate_res.findAll({
        where: {
          res_id: restaurantId
        }
      });
  
      res.json(rates);
    } catch (error) {
      console.error("Error fetching rates:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  export const postRate = async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
      const { userId, rating, comment } = req.body;
  
      
      await model.rate_res.create({
        user_id: userId,
        res_id: restaurantId,
        amount: rating,
        comment: comment, 
        date_rate: new Date() 
      });
  
      res.sendStatus(201); 
    } catch (error) {
      console.error("Error posting rate:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  export const postOrder = async (req, res) => {
    try {
      const { userId, foodId } = req.body;
  
  
      await model.orders.create({
        user_id: userId,
        food_id: foodId
      });
  
      res.sendStatus(201); 
    } catch (error) {
      console.error("Error posting order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  export const getUsers = async (req, res) => {
    try {
      
      const users = await model.users.findAll();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  export const getRestaurants = async (req, res) => {
    try {
      
      const restaurants = await model.restaurant.findAll();
      res.json(restaurants);
    } catch (error) {
      console.error("Error fetching restaurant:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  export const getFoods = async (req, res) => {
    try {
    
      const foods = await model.food.findAll();
  
      res.json(foods);
    } catch (error) {
      console.error("Error fetching foods:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

  export const getOrders = async (req, res) => {
    try {
     
      const orders = await model.orders.findAll();
  
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  