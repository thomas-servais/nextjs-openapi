import {createServer} from './server';

import { Application } from 'express';
import path  from 'path';
import fs  from 'fs';

const app: Application = createServer()

const logs: any[] = []
logs.push('[START] current folder '+process.cwd());
const target = path.join(process.cwd(), './apps/api/api')
logs.push('[START] target folder '+target);

const folderItems = fs.readdirSync(target);
folderItems.forEach(item => {
  logs.push('[ITEM] found ' + item+' in '+target);
});

app.get('*', function(req, res){
  res.json({url: req.url, logs: logs});
});

export default app;