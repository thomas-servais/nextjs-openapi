import {createServer} from './server';
import { initialize } from 'express-openapi';

import { setupSwagger } from './swagger';
import { Application } from 'express';


const app: Application = createServer()

initialize({
            app,
            docsPath: "/api-definition",
            exposeApiDocs: true,
            apiDoc: "./dist/api-definition-base.yml",
            paths: "./dist/paths",
          }).then( openapi => {
            setupSwagger(app, openapi.apiDoc);
          })
    
          

module.exports = app;