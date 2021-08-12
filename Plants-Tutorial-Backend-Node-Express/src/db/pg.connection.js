import { Pool, Client } from 'pg';
import { logger } from '../utils/logger';
import { env } from '../utils/enviroment';
import { notifyChanges } from "../modules/sockets/sockets.coordinator";

const connectionData = {
    user: env.PG_DB_USER,
    host: env.PG_DB_HOST,
    database: env.PG_DB_NAME,
    password: env.PG_DB_PASSWORD,
    port: env.PG_DB_PORT,
};

const pool = new Pool(connectionData);
const client = new Client(connectionData);

pool.connect()
    .then(response => {
        logger.info('PG-DB is connected')
    })
    .catch(err => {
        logger.error(`PGDB is not connected: ${err}`);
        client.end();
    })

client.connect()
    .then(response => {
        logger.info('PG-DB client-listener is connected');
        client.query("listen plant_verify");
        client.on('notification', async (data) => {
            if (data.channel === "plant_verify") {
                const plant = JSON.parse(data.payload);
                notifyChanges(data.channel, plant);
            }
        });
    })
    .catch(err => {
        logger.error(`PG-DB client-listener is not connected: ${err}`);
        client.end();
    });

export default pool;