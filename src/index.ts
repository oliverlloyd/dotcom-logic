import express from "express";
import { onwardsRoute } from "./routes";

import { PORT } from "./config";

const app = express();

// Express configuration
app.set("port", PORT);
app.use(express.json({ limit: "50mb" }));

app.get("/healthcheck", (req, res) => res.send({ status: "okay" }));

app.get("/onwards/*", onwardsRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
