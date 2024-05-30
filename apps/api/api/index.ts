import {createServer} from './server';
import { initialize } from 'express-openapi';

import { setupSwagger } from './swagger';
import { Application } from 'express';

import usersList from './paths/users'
import usersOne from './paths/users/{id}'

console.log('usersList', usersList)
console.log('usersOne', usersOne)

export const app: Application = createServer()

initialize({
            app,
            docsPath: "/api-definition",
            exposeApiDocs: true,
            apiDoc: "./apps/api/api/api-definition-base.yml",
            paths: "./apps/api/api/paths",
          }).then( openapi => {
            setupSwagger(app, openapi.apiDoc);
          }).catch( err => {
            console.log('error initializing openapi', err)
          })

export default app;