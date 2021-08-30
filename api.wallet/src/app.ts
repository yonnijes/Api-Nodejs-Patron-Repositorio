process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

//Env files
import dotenv = require('dotenv');

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});


import express = require('express');
import { loadControllers } from 'awilix-express';
import loadContainer from './container';
import jwt from 'express-jwt';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { options } from './swaggerOptions'
import { Response, Request, NextFunction, ErrorRequestHandler } from 'express';

//express
const app: express.Application = express();

// JSON Support
app.use(express.json());

//CORS
app.use(cors())

//swagger 
const specs = swaggerJsDoc(options);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));


//Container
loadContainer(app);

jwt
if (process.env.jwt_secret_key) {
    app.use(
        jwt({
            secret: process.env.jwt_secret_key as string,
            algorithms: ['HS256']
        } as any)
            .unless({ path: ['/', '/check'] }),
        (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
            console.log(err.name) 
            if (err.name === 'UnauthorizedError') {
                res.status(401).send({ msg: 'Invalid token...' });
            }
        }
    )
}


//controllers
app.use(loadControllers(
    'controllers/*.ts',
    { cwd: __dirname }
));

export { app };