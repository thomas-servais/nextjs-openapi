import {createServer} from './server';
import { initialize } from 'express-openapi';

import { setupSwagger } from './swagger';
import { Application } from 'express';
import path  from 'path';
import fs  from 'fs';
export const app: Application = createServer()

console.log('current folder '+process.cwd())
const absolutePath = path.resolve(process.cwd(), './apps/api/api/api-definition-base.yml');
console.log('absolutePath '+absolutePath)
try {
const apiDocContent = fs.readFileSync(absolutePath, 'utf8');
console.log(apiDocContent)
initialize({
            app,
            docsPath: "/api-definition",
            exposeApiDocs: true,
            apiDoc: "/var/task/apps/api/api/api-definition-base.yml",
            paths: "/var/task/apps/api/api/paths",
          }).then( openapi => {
            setupSwagger(app, openapi.apiDoc);
          }).catch( err => {
            console.error('error initializing openapi', err)
          })
        } catch(err) {
          console.error('error reading apiDoc', err)
        }
export default app;