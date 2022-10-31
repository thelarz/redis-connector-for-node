import { connection } from './connection';

export class RedisSet {

    private _name: string = "";

    get name(): string {
        return this._name;
    }

    withName(name: string) {
        this._name = name;
        return this;
    }

    async save(value: any) {
        await connection.set(this._name, value)
        return this;
    }

}