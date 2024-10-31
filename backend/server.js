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

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(bodyParser.json());
app.use(express.json());

app.set('trust proxy', 1); // Trust the first proxy

if (process.env.NODE_ENV === 'production') {
    const RedisStore = require('connect-redis')(session);
    const { createClient } = require('redis');

    const redisClient = createClient({
        url: process.env.PROD_REDIS_URL
    });

    redisClient.connect().catch(console.error);

    app.use(session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true } // Set to true if using HTTPS
    }));
} else {
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false } // Set to true if using HTTPS
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

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('http://localhost:5173/admin'); // Redirect to frontend after successful login
    }
);

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});