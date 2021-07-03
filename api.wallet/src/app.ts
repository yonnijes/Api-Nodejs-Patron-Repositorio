import express = require('express');
import { loadControllers } from 'awilix-express';
import loadContainer from './container';
import dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

//Env files
dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});
//express
const app: express.Application = express();

//Container
loadContainer(app);

//controllers
app.use(loadControllers(
    'controllers/*ts',
    { cwd: __dirname }
));

export { app };