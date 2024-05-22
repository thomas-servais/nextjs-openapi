import {createServer} from './server';
import { initialize } from 'express-openapi';

import { setupSwagger } from './swagger';
import { Application } from 'express';
import path  from 'path';
import fs  from 'fs';

export const app: Application = createServer()



  const logs: any[] = []
  logs.push('[START] current folder '+process.cwd());
  try {
  const folderItems = fs.readdirSync(path.join(process.cwd(), './apps/api/api'));
  folderItems.forEach(item => {
    logs.push('Item: ' + item);
  });
} catch(err) {
  logs.push('Error reading folder '+err)
}


const absolutePath = path.join(process.cwd(), './apps/api/api/api-definition-base.yml');
console.log('absolutePath '+absolutePath)

const exists = fs.existsSync(absolutePath)
const exists2 = fs.existsSync(path.resolve(process.cwd(), './apps/api/api/paths'))
const exists3 = fs.existsSync(path.resolve(process.cwd(), './apps/api/api/paths/users.ts'))
const exists4 = fs.existsSync(path.resolve(process.cwd(), './apps/api/api/paths/users.js'))

logs.push('[TEST] absolutePath '+absolutePath+' exists='+exists+' exists2='+exists2+' exists3='+exists3+' exists4='+exists4)
try {



initialize({
            app,
            docsPath: "/api-definition",
            exposeApiDocs: true,
            apiDoc: "./apps/api/api/api-definition-base.yml",
            paths: "./apps/api/api/paths",
          }).then( openapi => {
            logs.push('openapi initialized')
            logs.push(JSON.stringify(openapi.apiDoc))
            setupSwagger(app, openapi.apiDoc);
          }).catch( err => {
            logs.push('error initializing openapi '+err)
            console.log('error initializing openapi', err)
          })
        } catch(err) {
          logs.push('error reading apiDoc '+err)
          console.log('error reading apiDoc', err)
        }

        app.get('/logs', function(req, res){
          res.status(404).json({logs: logs});
        });




export default app;