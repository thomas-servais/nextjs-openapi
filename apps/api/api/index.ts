import {createServer} from './server';
import { initialize } from 'express-openapi';

import { setupSwagger } from './swagger';
import { Application } from 'express';

import usersList from './paths/users'
import usersOne from './paths/users/{id}'

console.log('usersList', usersList)
console.log('usersOne', usersOne)

export const app: Application = createServer()
console.log(process.cwd())

const openapiPath = process.cwd().indexOf('apps/api') == -1 ? './apps/api/api/' : './dist/api/'

initialize({
            app,
            docsPath: "/api-definition",
            exposeApiDocs: true,
            apiDoc: `${openapiPath}api-definition-base.yml`,
            paths: `${openapiPath}paths`
          }).then( openapi => {
            setupSwagger(app, openapi.apiDoc);
          }).catch( err => {
            console.log('error initializing openapi', err)
          })

export default app;