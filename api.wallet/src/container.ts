import express = require('express');
import { asClass, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express';

//repositorio mysql
import { SubscriptionMySQLRepository } from './services/repositories/impl/mysql/subscription.repository';
import { MovementMySQLRepository } from './services/repositories/impl/mysql/movement.repository';
import { BalanceMySQLRepository } from './services/repositories/impl/mysql/balance.repository';

//servicios
import { TestService } from './services/test.service';
import { SubscriptionService } from './services/subscription.service';
import { MovementService } from './services/movement.service';

//repositorio mssql
import { SubscriptionMSSQLRepository } from './services/repositories/impl/mssql/subscription.repository';
import { MovementMSSQLRepository } from './services/repositories/impl/mssql/movement.repository';
import { BalanceMSSQLRepository } from './services/repositories/impl/mssql/balance.repository';


export default (app: express.Application): void => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });
    container.register({
   
        //repositories Mssql
        // subscriptionRepository: asClass(SubscriptionMSSQLRepository).scoped(),
        // movementRepository: asClass(MovementMSSQLRepository).scoped(),
        // balanceRepository: asClass(BalanceMSSQLRepository).scoped(),

        //repositories Mysql
        subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),
        movementRepository: asClass(MovementMySQLRepository).scoped(),
        balanceRepository: asClass(BalanceMySQLRepository).scoped(),

        //services
        subscriptionService: asClass(SubscriptionService).scoped(),
        movementService: asClass(MovementService).scoped(),
        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));
};

