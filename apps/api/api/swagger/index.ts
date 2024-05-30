import { Application } from 'express';
import swaggerUi from 'swagger-ui-express'

const CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css'

export function setupSwagger(app: Application, doc: any) {

    /**
     * Setup Swagger UI
     */
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(doc, { customCssUrl: CSS_URL })
      );
}