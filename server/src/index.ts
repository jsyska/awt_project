import express, { Express, Request, Response } from "express";
import path from "path";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "..", ".." , "client", "dist")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "..", "client", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});