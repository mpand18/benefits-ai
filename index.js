import express from "express";
import dotenv from "dotenv";
import ranking from "./routes/ranking.js";
import bestBenefit from "./routes/bestBenefit.js";
import improveBenefit from "./routes/improveBenefit.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/ranking", ranking);
app.use("/best-benefit", bestBenefit);
app.use("/improve-benefit", improveBenefit);

app.listen(3000, () => console.log("API on http://localhost:3000"));
