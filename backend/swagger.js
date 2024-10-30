import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Intern Project Showcase API",
            version: "1.0.0",
            definition: "An express API for a project management system",
        }
    },
    apis: ["./docs/*.js"]
}

const specs = swaggerJsdoc(options)

export default{
    specs,
    swaggerUi
}