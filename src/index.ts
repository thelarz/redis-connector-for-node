import { RedisClient } from './connection';
import { RedisSet } from './set';



(async () => {

const client = new RedisClient();
const connection = await client.connect();

await new RedisSet().withConnection(connection).withName("NodeRedis").save("654321");

console.log("connected");

})();