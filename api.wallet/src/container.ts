import {asClass, createContainer} from 'awilix';
import { TestService } from './services/text.service';

const container = createContainer();


container.register({
    testService:asClass(TestService).scoped()
});

export {
    container
};