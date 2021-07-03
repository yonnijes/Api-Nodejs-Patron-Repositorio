import express = require('express');
import { asClass, createContainer } from 'awilix';
import { TestService } from './services/text.service';
import { scopePerRequest } from 'awilix-express';
import { SubscriptionMySQLRepository } from './services/repositories/impl/mysql/subscription.repository';
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

