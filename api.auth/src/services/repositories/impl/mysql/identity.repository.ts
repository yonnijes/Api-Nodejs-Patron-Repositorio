
import connector from "../../../../common/persistence/mysql.persistence";
import { Identity } from "../../domain/identity";
import { IdentityRepository } from "../../identity.repository";

export class IdentityMySQLRepository implements IdentityRepository {
    public async find(email: string, password: string): Promise<Identity | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM auth_user WHERE email = ? AND password = ?',
            [email, password]
        );

        if (rows.length) {
            return rows[0];
        }

        return null;
    }
    public async store(entry: Identity): Promise<void> {
        const now = new Date();
        await connector.execute(
            'INSERT INTO auth_user(email, password, created_at) VALUES(?, ?, ?)',
            [entry.email, entry.password, now]
        );
    }

}