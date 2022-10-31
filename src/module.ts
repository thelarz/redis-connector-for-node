import { RedisClient } from './connection';
import { RedisSet } from './set';
import { RedisHash } from './table';

// https://www.typescriptlang.org/docs/handbook/modules.html
export { RedisClient as Client }
export { RedisSet as Set }
export { RedisHash as Table }