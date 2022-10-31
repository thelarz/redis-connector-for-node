import { RedisSet } from './set';

const setfn = jest.fn().mockImplementation((name, value) => {});

jest.mock('./connection', () => {
    return {
        connection: {
            set: jest.fn((name, value) => setfn(name, value))
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


describe("the set", () => {

    beforeEach(async () => {
        jest.clearAllMocks();
    });

    it("retains the set name", () => {
        var context = new RedisSet().withName("Test");
        expect(context).toBeDefined();
        expect(context.name).toEqual("Test")
    });

    it("retains the context after set", async () => {
        var withContext = new RedisSet().withName("Test");
        var saveContext = await withContext.save("Value");
        expect(saveContext).toBeDefined();
        expect(saveContext.name).toEqual("Test");
        expect(setfn).toHaveBeenLastCalledWith("Test", "Value");
    });

    it("retains the context throughout the fluent call", async () => {
        await new RedisSet().withName("Fluent").save("Value");
        expect(setfn).toHaveBeenLastCalledWith("Fluent", "Value");
    });

    it("retains the context throughout the fluent call", async () => {
        await (await new RedisSet().withName("Fluent").save("Value")).save("Value2");
        expect(setfn).toHaveBeenCalledTimes(2);
    });

});