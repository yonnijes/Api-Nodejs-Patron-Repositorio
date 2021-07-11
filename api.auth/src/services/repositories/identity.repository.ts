
import { Identity } from './domain/identity'

export interface IdentityRepository{
    find(email: string, password: string): Promise<Identity | null>;
    store(entry: Identity): Promise<void>;
}