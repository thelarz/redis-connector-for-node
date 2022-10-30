import { connection } from './connection';

export class RedisSet {

    _setName: string = "";

    withName(name: string) {
        this._setName = name;
        return this;
    }

    async save(value: any) {
        await connection.set(this._setName, value)
    }

}