require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// Index page (static HTML)
app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

app.use("/api", routes);

app.listen(port, () => console.log(`Your app is listening on port ${port}`));
