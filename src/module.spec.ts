import { RedisClient, connection } from './connection';
import { Client, Set } from './module';

const initfn = jest.fn().mockImplementation(() => {});
var connectionMock:any = null;

jest.mock('./connection', () => {
    return {
        RedisClient: jest.fn(() => ({
            init: initfn
        })),
        connection: connectionMock
    }
});


describe("the module", () => {

    beforeAll(async () => {

    });

    it("should allow initialization", async () => {
        var client = new Client();
        await client.init()
        expect(initfn).toHaveBeenCalled();
        expect(connectionMock).toBeDefined();
        //new Set().withName("Test").save("new value");
        //expect (spySet.save).toHaveBeenCalledWith("new value");
    });

    it.skip("should call the set function", async () => {
        var client = new Client();
        await client.init()
        new Set().withName("Test").save("new value");
        //expect (spySet.save).toHaveBeenCalledWith("new value");
    });


});