import express from 'express';
import foodRoutes from './food.router';


// tạo object router tổng
const rootRoutes = express.Router();

rootRoutes.use("/food", foodRoutes);
;

// export rootRoutes cho index.js dùng
export default rootRoutes;