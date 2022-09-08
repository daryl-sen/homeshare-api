import express from "express";
import path from "path";
import { initialize } from "express-openapi";
import v1WorldsService from "./services/worldsService";
import v1ApiDoc from "./api-doc";
import swaggerUi from "swagger-ui-express";

const app = express();
const port = 3200;

const rootPath = path.join(__dirname);

app.use(express.static(rootPath));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: "http://localhost:3200/api-docs",
    },
  })
);

initialize({
  app,
  apiDoc: v1ApiDoc,
  dependencies: {
    worldsService: v1WorldsService,
  },
  paths: path.join(__dirname, "./paths"),
});

app.get("/api", (req, res) => {
  res.send("Backend API coming soon!");
});

app.get("*", (req, res) => {
  return res.sendFile("index.html", { root: rootPath });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.listen(3000);
