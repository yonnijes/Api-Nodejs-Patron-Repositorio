import express = require('express');
import { asClass, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express';

//repositorio
import { SubscriptionMySQLRepository } from './services/repositories/impl/mysql/subscription.repository';

//servicios
import { TestService } from './services/text.service';
import { SubscriptionService } from './services/subscription.service';


export default (app: express.Application): void => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });
    container.register({
        //repositories
        subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),

        //services
        subscriptionService: asClass(SubscriptionService).scoped(),
        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));
};

