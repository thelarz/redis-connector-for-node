"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./module");
const initfn = jest.fn().mockImplementation(() => { });
var connectionMock = null;
jest.mock('./connection', () => {
    return {
        RedisClient: jest.fn(() => ({
            init: initfn
        })),
        connection: connectionMock
    };
});
describe("the module", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it("should allow initialization", () => __awaiter(void 0, void 0, void 0, function* () {
        var client = new module_1.Client();
        yield client.init();
        expect(initfn).toHaveBeenCalled();
        expect(connectionMock).toBeDefined();
        //new Set().withName("Test").save("new value");
        //expect (spySet.save).toHaveBeenCalledWith("new value");
    }));
    it.skip("should call the set function", () => __awaiter(void 0, void 0, void 0, function* () {
        var client = new module_1.Client();
        yield client.init();
        new module_1.Set().withName("Test").save("new value");
        //expect (spySet.save).toHaveBeenCalledWith("new value");
    }));
});
