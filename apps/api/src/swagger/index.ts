import { Application } from 'express';
import swaggerUi from 'swagger-ui-express'

export function setupSwagger(app: Application, doc: any) {

    /**
     * Setup Swagger UI
     */
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(doc)
      );
}