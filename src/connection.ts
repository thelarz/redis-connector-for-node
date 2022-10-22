import { createClient } from 'redis';

export class RedisClient {

    async connect () {

        const client = createClient();

        client.on('error', (err) => console.log('Redis Client Error', err));

        await client.connect();
        return client;

    }
    
}
