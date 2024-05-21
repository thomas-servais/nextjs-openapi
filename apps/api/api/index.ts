import {createServer} from './server';
import { initialize } from 'express-openapi';

import { setupSwagger } from './swagger';
import { Application } from 'express';
import path  from 'path';
import fs  from 'fs';
export const app: Application = createServer()

const logs: any[] = []

console.log('current folder '+process.cwd())
const absolutePath = path.resolve(process.cwd(), './apps/api/api/api-definition-base.yml');
console.log('absolutePath '+absolutePath)
const exists = fs.existsSync(absolutePath)
const exists2 = fs.existsSync(path.resolve(process.cwd(), './api/api-definition-base.yml'))
const exists3 = fs.existsSync(path.resolve(process.cwd(), './api-definition-base.yml'))
logs.push('absolutePath test '+absolutePath+' exists='+exists+' exists2='+exists2+' exists3='+exists3)
try {

initialize({
            app,
            docsPath: "/api-definition",
            exposeApiDocs: true,
            apiDoc: "./apps/api/api/api-definition-base.yml",
            paths: "./apps/api/api/paths",
          }).then( openapi => {
            logs.push('openapi initialized')
            setupSwagger(app, openapi.apiDoc);
          }).catch( err => {
            logs.push('error initializing openapi '+err)
            console.log('error initializing openapi', err)
          })
        } catch(err) {
          logs.push('error reading apiDoc '+err)
          console.log('error reading apiDoc', err)
        }

        app.get('*', function(req, res){
          console.log('404 on '+req.url)
          logs.push('404 on '+req.url)
          res.status(404).json({url: req.url, logs: logs});
        });

export default app;