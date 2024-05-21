import {createServer} from './server';
import { initialize } from 'express-openapi';

import { setupSwagger } from './swagger';
import { Application } from 'express';

export const app: Application = createServer()

initialize({
            app,
            docsPath: "/api-definition",
            exposeApiDocs: true,
            apiDoc: "./dist/api/api-definition-base.yml",
            paths: "./dist/api/paths",
          }).then( openapi => {
            setupSwagger(app, openapi.apiDoc);
          })