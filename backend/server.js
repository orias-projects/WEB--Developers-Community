const express = require("express");
const morgan = require('morgan');
const app = express();
const userRoutes = require("./routes/userRoutes");
const userLinkRoutes = require("./routes/userLinkRoutes");

app.use(express.json());

app.use(morgan('dev')); 

app.use("/api/users", userRoutes);
app.use("/api/user-links", userLinkRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
