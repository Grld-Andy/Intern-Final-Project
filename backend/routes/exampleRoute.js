import { Router } from "express"
import { exampleController } from "../controllers/exampleController.js"

const exampleRouter = Router()

exampleRouter.get("/", exampleController)

export default exampleRouter