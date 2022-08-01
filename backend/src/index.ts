import express from "express";
import path from "path";

const app = express();
const port = 3200;

const rootPath = path.join(__dirname);

app.use(express.static(rootPath));

app.get("/api", (req, res) => {
  res.send("Backend API coming soon!");
});

app.get("*", (req, res) => {
  return res.sendFile("index.html", { root: rootPath });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
