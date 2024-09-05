import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import routes from "./routes/routes";

const app = express();

const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Service is Live!"));

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
