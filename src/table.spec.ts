import { IHash } from './interfaces/IHash';
import { RedisHash } from './table';

const hashfn = jest.fn().mockImplementation((key, val) => {});

jest.mock('./connection', () => {
    return {
        connection: {
            hSet: jest.fn((key, val) => hashfn(key, val))
        }
    }
});

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


describe("the hash", () => {

    beforeEach(async () => {
        jest.clearAllMocks();
    });

    it("retains the set name", () => {
        var context = new RedisHash().withName("Test");
        expect(context).toBeDefined();
        expect(context.name).toEqual("Test")
    });

    it("retains the context after set", async () => {

        const testHash: IHash = { key: "testKey", val: "testValue" };
        
        var withContext = new RedisHash().withName("Test");
        var saveContext = withContext.add("testKey", "testValue");
        expect(saveContext).toBeDefined();
        expect(saveContext.name).toEqual("Test");
        expect(saveContext.list.length).toEqual(1);
    });

    it("retains the context throughout the fluent call", async () => {
        await new RedisHash().withName("Fluent").add("Key", "Value").save();
        expect(hashfn).toHaveBeenCalledTimes(1);
    });

    it("retains the context throughout the fluent call", async () => {
        var context = await new RedisHash()
        await context.withName("Fluent").add("Key", "Value").add("Key2", "Value2").save();
        expect(hashfn).toHaveBeenCalledTimes(2);
        expect(context.list.length).toEqual(0);
    });

});