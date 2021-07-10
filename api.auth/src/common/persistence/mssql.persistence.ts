
import { ConnectionPool } from "mssql";

let config = {  
    server: process.env.db_mssql_host as string,
    database: process.env.db_mssql_database as string,
    user: process.env.db_mssql_user as string,
    password: process.env.db_mssql_password as string,
    option: {
        enableArithAbout: true
    }
}

export default new ConnectionPool(config).connect()