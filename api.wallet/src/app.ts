
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

//Env files
import dotenv = require('dotenv');

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});

console.log(process.env.APP_FOO);

import express = require('express');
import { container } from './container';
import { TestService } from './services/text.service';

const app: express.Application = express();

app.get('/', (req, res) => {
    res.send('runing...');
});



const testService = container.resolve<TestService>('testService');

console.log(testService.get());

export { app };