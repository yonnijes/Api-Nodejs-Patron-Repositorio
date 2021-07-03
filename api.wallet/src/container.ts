import express = require('express');
import { asClass, createContainer } from 'awilix';
import { TestService } from './services/text.service';
import { scopePerRequest } from 'awilix-express';


export default (app: express.Application):void => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });
    container.register({
        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));
};