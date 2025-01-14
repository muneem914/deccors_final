import express from "express";
import dotenv from "dotenv";
// import 'dotenv/config'
import cors from "cors";
import cookieParser from "cookie-parser";

import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/payment.js";
import blogRoutes from "./routes/blog.js";
import wishlistRoutes from "./routes/wishlist.js";
import contactRoutes from "./routes/contact.js";

import { connectDatabase } from "./config/dbConnect.js";

import errorMiddleware from "./middlewares/errors.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

const app = express();

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: ".env" });
}

// dotenv.config();

// connecting to database
connectDatabase();


// app.use(
//   cors({
//     origin: process.env.NODE_ENV === "PRODUCTION" ? process.env.FRONTEND_URL : "http://localhost:3000",
//     credentials: true,
//   })
// );

app.use(cors({
  origin: "https://deccors-final-fie9.vercel.app", // Your frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // If cookies are involved
}));

// app.use(cors());


app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.use(cookieParser());

// import all routes
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);
app.use("/api/v1", blogRoutes);
app.use("/api/v1", wishlistRoutes);
app.use("/api/v1", contactRoutes);

// connecting front to back
if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

// error middleware
app.use(errorMiddleware);

// to handle unhandled error, app.listen should be stored in a variable
const server = app.listen(process.env.PORT, () => {
  console.log(
    `server is running at PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// handle Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting down server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
