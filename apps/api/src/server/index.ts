import express, { Application } from 'express';

const PORT = 3002;

export function createServer(): Application {
    const app = express();

    app.listen(PORT, () => {
      console.log('Server is running on http://localhost:3002');
  });

    return app;
}