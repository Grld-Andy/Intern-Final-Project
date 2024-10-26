import cors from "cors"
import express from "express"
import swagger from "./swagger.js"
import bodyParser from "body-parser"
import exampleRouter from "./routes/exampleRoute.js"
import limiter from './middleware/rateLimiter.js'

const app = express()
const port = 3000

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(bodyParser.json())
app.use(express.json())

app.use("/api", limiter)
app.use("/api-docs", swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.specs, {explorer: true}))
app.use("/api/v1/example", exampleRouter)

app.get("/", (req, res) => {
    res.status(200).send(`<a href="${req.protocol + '://' + req.get('host')}/api-docs">Swagger docs</a>`)
})

app.listen(port, () => {
    console.log(`App running or http://localhost:${port}`)
})