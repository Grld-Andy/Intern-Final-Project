import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options = {
    definition: {
        openai: "3.0.0",
        info: {
            title: "Intern Final Project",
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