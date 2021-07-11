import { Application } from 'express';
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';

import { IdentityService } from './services/identity.service';
import { IdentityMySQLRepository } from './services/repositories/impl/mysql/identity.repository';


export default (app: Application) => {
    const container = createContainer({
        injectionMode: "CLASSIC"
    });

    container.register({
         //repositories Mysql
        IdentityRepository: asClass(IdentityMySQLRepository).scoped(),

         //services
        identityService: asClass(IdentityService).scoped()
    });

    app.use(scopePerRequest(container));
};