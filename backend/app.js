const express = require("express");
const app = express();
const cors = require("cors");
const { dbConnection } = require("./database/dbConnect");
const { readdirSync } = require("fs");
require("dotenv").config();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

// // Add auth routes
// app.use('/api/auth', require('./routes/auth'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const server = () => {
  dbConnection();
  app.listen(PORT, () => {
    console.log(`Server is listening to ${PORT}`);
  });
};

server();
