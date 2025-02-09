import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import pool from "./config/mysql.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

import cartRoutes from "./routes/cartRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use("/auth", authRouter);
app.use("/api/hotels", hotelRoutes);  // 旅館 API
app.use("/api/coupons", couponRoutes); // 優惠券 API
app.use("/api", courseRoutes); // 課程 API

app.get("/", (req, res) => {
  res.json({ status: "success", data: null, message: "首頁" });
});

// app._router.stack.forEach((layer) => {
//   if (layer.route) {
//     console.log(
//       `已載入路由: ${Object.keys(layer.route.methods)
//         .join(", ")
//         .toUpperCase()} ${layer.route.path}`
//     );
//   } else if (layer.name === "router") {
//     layer.handle.stack.forEach((subLayer) => {
//       if (subLayer.route) {
//         console.log(
//           `已載入路由: ${Object.keys(subLayer.route.methods)
//             .join(", ")
//             .toUpperCase()} ${subLayer.route.path}`
//         );
//       }
//     });
//   }
// });

(async () => {
  try {
    // await pool.query();

    console.log("資料庫已連接");

    app.listen(5000, () => {
      console.log("服務啟動於 http://localhost:5000");
    });
  } catch (err) {
    console.error("無法啟動伺服器，資料庫連接失敗:", err);
  }
})();
