import * as express from 'express'

import { getAllUsers } from '@repo/core'

export default function () {
    let operations = {
      GET
    };
  
    async function GET(req: express.Request, res: express.Response, next: express.NextFunction) {

      const users = await getAllUsers();

      const userId = req.params.id
      if (userId) {
        const user = users.find((user) => user.id === parseInt(userId));
        if (user) {
          res.status(200).json(user);
          return;
        }
      }

        res.status(404).send();
    }

  
    GET.apiDoc = {
        summary: "Returns a single user",
        operationId: "getOneUser",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User data",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      };
    
  
    return operations;
  }