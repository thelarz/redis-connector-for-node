import { createClient } from 'redis';

export var connection: any = {};

export class RedisClient {

    async init () {

        const client = createClient();

        client.on('error', (err) => console.log('Redis Client Error', err));

        await client.connect();
    
        connection = client;

    }
    
}
