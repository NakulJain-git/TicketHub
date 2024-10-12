const express = require("express");
const cors = require("cors");
const apiRoutes = require("./src/routes/index.js");
const connectDB = require("./src/db/index.js");
const app = express();
connectDB();
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://flashify-ai-frontend.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Routes : Version 1
const port=process.env.PORT||3000;
app.listen(port , () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use("/api",apiRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Server health is OK",
    status: "UP",
  });
});

// Not found handler
app.use((req, res, next) => {
  res.status(404).json({
    message: "Resource not found",
    success: false,
    status: 404,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message,
    success: false,
  });
});

