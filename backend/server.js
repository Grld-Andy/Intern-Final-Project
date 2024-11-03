import cors from "cors";
import express from "express";
import swagger from "./swagger.js";
import bodyParser from "body-parser";
import exampleRouter from "./routes/exampleRoute.js";
import projectManagementRouter from './routes/projectManagementRoute.js';
import limiter from './middleware/rateLimiter.js';
import morgan from "morgan";
import session from 'express-session';
import passport from './auth.js';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { createClient } from 'redis';
import RedisStore from 'connect-redis';

const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());

dotenv.config();

app.use(morgan("dev"));
app.use(cors({
    origin: ["http://localhost:5173", "https://intern-final-project.onrender.com"],
    credentials: true
}))
;
app.use(bodyParser.json());
app.use(express.json());

app.set('trust proxy', 1); // Trust the first proxy

if (process.env.NODE_ENV === 'production') {
    const redisClient = createClient({
        url: process.env.PROD_REDIS_URL
    });

    redisClient.on('error', (err) => console.log('Redis Client Error', err));

    await redisClient.connect();

    app.use(session({
        store: new RedisStore({
            client: redisClient,
            prefix: "myapp:"
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: true, // Set to true if using HTTPS
            httpOnly: true,
            sameSite: 'None', // Ensure cookies are sent with cross-site requests
            maxAge: 1000 * 60 * 60 * 24 // 24 hours
        }
    }));
} else {
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // Set to true if using HTTPS
            sameSite: 'Lax' // Adjust as needed for local development
        }
    }));
}

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", limiter);
app.use("/api-docs", swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.specs, { explorer: true }));
app.use("/api/v1/example", exampleRouter);
app.use("/api/v1", projectManagementRouter);

app.get("/", (req, res) => {
    res.status(200).send(`<a href="${req.protocol + '://' + req.get('host')}/api-docs">Swagger docs</a>`);
});

app.get('/auth/microsoft', (req, res, next) => {
    try {
        passport.authenticate('microsoft', { prompt: 'select_account' })(req, res, next);
    } catch (error) {
        console.error("Error during Microsoft authentication:", error);
        res.status(500).json({ error: "An error occurred during Microsoft authentication. Please try again later." });
    }
});

app.get('/auth/microsoft/callback',
    passport.authenticate('microsoft', { failureRedirect: 'http://localhost:5173' }),
    (req, res) => {
        res.redirect('http://localhost:5173/admin'); // Redirect to frontend after successful login
    }
);

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('http://localhost:5173/');
    });
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});