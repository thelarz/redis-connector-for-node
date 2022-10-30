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
const connection_1 = require("./connection");
const connectfn = jest.fn().mockImplementation(() => { });
const onfn = jest.fn().mockImplementation((event, fn) => { });
jest.mock('redis', () => {
    return {
        createClient: jest.fn(() => ({
            connect: connectfn,
            on: onfn
        }))
    };
});
describe("the connection", () => {
    it("connection client should be defined", () => {
        var client = new connection_1.RedisClient();
        expect(client).toBeDefined();
    });
    it("should create a valid connection", () => __awaiter(void 0, void 0, void 0, function* () {
        var client = new connection_1.RedisClient();
        yield client.init();
        expect(onfn).toHaveBeenCalledWith("error", expect.any(Function));
        expect(connectfn).toHaveBeenCalled();
    }));
});
