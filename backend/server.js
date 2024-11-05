import cors from "cors";
import express from "express";
import swagger from "./swagger.js";
import bodyParser from "body-parser";
import exampleRouter from "./routes/exampleRoute.js";
import projectManagementRouter from './routes/projectManagementRoute.js';
import limiter from './middleware/rateLimiter.js';
import morgan from "morgan";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());

dotenv.config();

app.use(morgan("dev"));
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true
}))
;
app.use(bodyParser.json());
app.use(express.json());

app.set('trust proxy', 1);

app.use("/api", limiter);
app.use("/api-docs", swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.specs, { explorer: true }));
app.use("/api/v1/example", exampleRouter);
app.use("/api/v1", projectManagementRouter);

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});