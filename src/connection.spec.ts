import { RedisClient } from './connection';

const connectfn = jest.fn().mockImplementation();
const onfn = jest.fn().mockImplementation((event, fn) => {});

jest.mock('redis', () => {
    return {
        createClient: jest.fn(() => ({
            connect: connectfn,
            on: onfn
        }))
    }
});

describe("the connection", () => {

    it("connection client should be defined", () => {
        var client = new RedisClient();
        expect(client).toBeDefined();
    });

    it("should create a valid connection", async () => {
        var client = new RedisClient();
        await client.init();
        expect(onfn).toHaveBeenCalledWith("error", expect.any(Function));
        expect(connectfn).toHaveBeenCalled();
    });

});