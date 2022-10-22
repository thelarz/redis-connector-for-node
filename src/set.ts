

export class RedisSet {

    _connection: any;
    _setName: string = "";

    constructor () {}

    withConnection (connection: any) {
        this._connection = connection;
        return this;
    }

    withName(name: string) {
        this._setName = name;
        return this;
    }

    async save(value: any) {
        await this._connection.set(this._setName, value)
    }

}