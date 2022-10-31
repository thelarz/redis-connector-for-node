import { connection } from './connection';
import { IHash } from './interfaces/IHash';

export class RedisHash {

    private _name: string = "";
    private _list: IHash[] = new Array();

    get name(): string {
        return this._name;
    }

    get list(): IHash[] {
        return this._list;
    }

    withName(name: string): RedisHash {
        this._name = name;
        return this;
    }

    add(_key: string, _value: any): RedisHash {

        var hash: IHash = {
            key: _key,
            val: _value
        }

        this._list.push(hash);

        return this;
    }

    async save() {
        this._list.forEach(async (el: IHash) => {
            await connection.hSet(this._name, el.key, el.val)    
        });
        // clear the array
        this._list.splice(0, this._list.length);
    }

}