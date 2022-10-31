import { Client, Set, Table } from './module';


async function start() {

    const client = new Client();
    await client.init();

    console.log("connected");
    await new Set().withName("NodeRedis3").save("654321");

    await new Table().withName("Hashy").add("key1", "value1").add("key2", "value2").save();

    console.log("set saved");
}

start();

