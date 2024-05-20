import * as express from 'express'

import { getAllUsers } from '@repo/core'

export default function () {
    let operations = {
      GET,
    };
  
    async function GET(req: express.Request, res: express.Response, next: express.NextFunction) {
        const users = await getAllUsers();
        res.status(200).json(users);
    }
  
    GET.apiDoc = {
        summary: "Returns list of users",
        operationId: "getUsers",
        responses: {
          200: {
            description: "List of users",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
          },
        },
      };
      

    return operations;
  }