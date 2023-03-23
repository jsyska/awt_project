import express, { Express, Request, Response } from "express";
import path from "path";

const app: Express = express();
const port = process.env.PORT || 3000;

// Serve static files from the "client/dist" directory
app.use(express.static(path.join(__dirname, "..", ".." , "client", "dist")));
console.log(__dirname)
// Serve the index.html file from the "client/dist" directory
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "..", "client", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});