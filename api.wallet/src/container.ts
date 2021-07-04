import express = require('express');
import { asClass, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express';

//repositorio
import { SubscriptionMySQLRepository } from './services/repositories/impl/mysql/subscription.repository';
import { MovementMySQLRepository } from './services/repositories/impl/mysql/movement.repository';
import { BalanceMysqlRepository } from './services/repositories/impl/mysql/balance.repository';

//servicios
import { TestService } from './services/test.service';
import { SubscriptionService } from './services/subscription.service';
import { MovementService } from './services/movement.service';


export default (app: express.Application): void => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });
    container.register({
        //repositories
        subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),
        movementRepository: asClass(MovementMySQLRepository).scoped(),
        balanceRepository: asClass(BalanceMysqlRepository).scoped(),

        //services
        subscriptionService: asClass(SubscriptionService).scoped(),
        movementService: asClass(MovementService).scoped(),
        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));
};

